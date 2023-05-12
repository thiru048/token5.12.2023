import React, { useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Animation from "./Animation";
import { Button } from "@mui/material";

import { ethers, providers } from "ethers";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

// Import Contract's JSON
import ETHToken from "../abis/ETHToken.json";
import ETHBridge from "../abis/ETHBridge.json";
import BSCToken from "../abis/BSCToken.json"; //iyx
import BSCBridge from "../abis/BSCBridge.json";
import SwitchNetwork from "../SwitchNetwork";
import { Pause } from "@mui/icons-material";

// const networks = {
//   polygon: {
//     chainId: `0x${Number(137).toString(16)}`,
//     chainName: "Polygon Mainnet",
//     nativeCurrency: {
//       name: "MATIC",
//       symbol: "MATIC",
//       decimals: 18
//     },
//     rpcUrls: ["https://polygon-rpc.com/"],
//     blockExplorerUrls: ["https://polygonscan.com/"]
//   },
//   bsc: {
//     chainId: `0x${Number(56).toString(16)}`,
//     chainName: "Binance Smart Chain Mainnet",
//     nativeCurrency: {
//       name: "Binance Chain Native Token",
//       symbol: "BNB",
//       decimals: 18
//     },
//     rpcUrls: [
//       "https://bsc-dataseed1.binance.org",
//       "https://bsc-dataseed2.binance.org",
//       "https://bsc-dataseed3.binance.org",
//       "https://bsc-dataseed4.binance.org",
//       "https://bsc-dataseed1.defibit.io",
//       "https://bsc-dataseed2.defibit.io",
//       "https://bsc-dataseed3.defibit.io",
//       "https://bsc-dataseed4.defibit.io",
//       "https://bsc-dataseed1.ninicoin.io",
//       "https://bsc-dataseed2.ninicoin.io",
//       "https://bsc-dataseed3.ninicoin.io",
//       "https://bsc-dataseed4.ninicoin.io",
//       "wss://bsc-ws-node.nariox.org"
//     ],
//     blockExplorerUrls: ["https://bscscan.com"]
//   }
// };

// const changeNetwork = async ({ networkName, setError }) => {
//   try {
//     if (!window.ethereum) throw new Error("No crypto wallet found");
//     await window.ethereum.request({
//       method: "wallet_addEthereumChain",
//       params: [
//         {
//           ...networks[networkName]
//         }
//       ]
//     });
//   } catch (err) {
//     setError(err.message);
//   }
// };

export default function Body() {
  const Web3 = require("web3");

  // const web3 = new Web3('http://localhost:8545');

  const { switchNetwork } = useSwitchNetwork({});

  const [mintReached, setMintReached] = useState(false);
  const [networkId, setNetworkId] = useState(null);
  const [otherNetwork, setOtherNetwork] = useState("");

  const [ethProvider, setETHProvider] = useState(null);
  const [bscProvider, setBSCProvider] = useState(null);

  const [to, setTO] = useState(null);
  const [from, setFrom] = useState(null);
  const [nonce, setNonce] = useState(null);
  const [signature, setSignature] = useState(null);

  const [ethBridge, setETHBridge] = useState(null);
  const [bscBridge, setBSCBridge] = useState(null);

  const [ethToken, setETHToken] = useState(null);
  const [bscToken, setBSCToken] = useState(null);

  const [account, setAccount] = useState(null);
  const [ethSigner, setETHSigner] = useState(null);
  const [bscSigner, setBSCSigner] = useState(null);

  const [amount, setAmount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [message, setMessage] = useState(null);

  const [showToast, setShowToast] = useState(false);

  const { address: walletAddressWagmi } = useAccount();
  const { chain, chains } = useNetwork();

  const OffClick = () => {
    setShowToast(true);
    toast.success("Button was clicked", {
      position: "top-right",
      autoClose: 2000,
      toastId: "uniqueToastId",
    });
  };
  // const [inr, setINR] = useState(0);
  // const [targetCurrency, setTargetCurrency] = useState('btc');
  // const [exchangeRate, setExchangeRate] = useState(1);
  // const [convertedAmount, setConvertedAmount] = useState(0);

  const [inr, setINR] = useState(0);
  const [targetCurrency, setTargetCurrency] = useState("ethereum");
  const [exchangeRate, setExchangeRate] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState(0);

  // const handleNetworkSwitch = async (networkName) => {
  //   setError();
  //   await changeNetwork({ networkName, setError });
  // };

  // const networkChanged = (chainId) => {
  //   console.log({ chainId });
  // };

  // useEffect(() => {
  //   window.ethereum.on("chainChanged", networkChanged);

  //   return () => {
  //     window.ethereum.removeListener("chainChanged", networkChanged);
  //   };
  // }, []);

  //setbalance for swap

  const [balance, setBalance] = useState();

  useEffect(() => {
    async function getBalance() {
      if (typeof window.ethereum !== "undefined") {
        const provider = new providers.Web3Provider(window.ethereum);
        const address = await provider.listAccounts();

        const balance = await provider.getBalance(address[0]);
        setBalance(balance);
      } else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    }
    getBalance();
  }, []);

  // console.log(setTargetCurrency)

  useEffect(() => {
    async function getExchangeRate() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${targetCurrency}&vs_currencies=inr`
        );
        const data = await response.json();
        setExchangeRate(data[targetCurrency].inr);
        setPrice(data[targetCurrency].inr);
      } catch (err) {
        setError(err);
      }
    }

    getExchangeRate();
  }, [targetCurrency]);

  useEffect(() => {
    setConvertedAmount(inr * exchangeRate);
  }, [inr, exchangeRate]);

  // useEffect(() => {
  //   async function getExchangeRate() {
  //     const response = await fetch(`https://api.coingecko.com/api/v3/${targetCurrency}`);
  //     const data = await response.json();
  //     setExchangeRate(data.rates.INR);
  //   }
  //   getExchangeRate();
  // }, [targetCurrency]);

  // useEffect(() => {
  //   setConvertedAmount(inr * exchangeRate);
  // }, [inr, exchangeRate]);

  const [active, setActive] = useState(false);

  const colorClick = () => {
    setActive((prevActive) => !prevActive);
  };

  const [array, setArray] = useState([
    {
      id: 1,
      name: (
        <button
        // onClick={() => handleNetworkSwitch("polygon")}

        // Switch to goerlii
        >
          To goerli
        </button>
      ),
    },
    {
      id: 2,
      name: (
        <button
        // onClick={() => handleNetworkSwitch("bsc")}
        >
          Switch to BSC
        </button>
      ),
    },
  ]);

  function swap(array, i, j) {
    const temp = array[i];
    array.splice(i, 1, array[j]);
    array.splice(j, 1, temp);
  }

  function handleClick() {
    swap(array, 0, 1);
    setArray([...array]);
    ///if(chain == 97)
  }

  useEffect(() => {
    async function checkNetwork() {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let network = await provider.getNetwork();
      let networkName = await network.name;

      toast(`You are currently on the ${networkName} network.`, {
        position: "top-right",
        autoClose: 2000,

        toastId: "uniqueToastId",
      });
    }

    checkNetwork();
  }, []);

  useEffect(() => {
    if (walletAddressWagmi && !account) {
      setAccount(walletAddressWagmi);
    }

    const chainID = chain?.id;

    if (
      chainID &&
      !networkId &&
      (chainID.toString() == "80001" || chainID.toString() == "97")
    ) {
      setNetworkId(chainID.toString());
    }

    loadWeb3();
  }, [walletAddressWagmi, chain, account, networkId]);

  // useEffect(() => {

  //   const { address : account } = useAccount()
  //   console.log("address",account)

  // }, [account, networkId]);

  //trying for handleclick
  // const ChangeNet = async =>{
  //   if (networkId == 97  ){
  //     const { chains,switchNetwork } = useSwitchNetwork();
  //   }
  // }

  const loadWeb3 = async () => {
    // 1. if network is polygon the two providers will be given in the code one id borowser connet anf the other is jsonRpcURl
    // 2.

    console.log("inside load web3");

    console.log("called loadWeb3--", window?.ethereum?.networkVersion);

    if (window.ethereum.networkVersion === "80001") {
      // Set provider for Rinkeby (MetaMask)
      console.log("entered if of '5' in, loadWeb3"); // added by thiru
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      setETHProvider(ethProvider);
      console.log(`ethProvider in loadWeb3${ethProvider}`); //
      // Set provider for BSC Testnet
      const bscProvider = new ethers.providers.JsonRpcProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545"
      );
      setBSCProvider(bscProvider);
      console.log(`bscProvider in loadWeb3${bscProvider}`); //

      // Set signer
      const ethSigner = ethProvider.getSigner();
      setETHSigner(ethSigner);

      setOtherNetwork("Binance");

      await loadContracts();
      // await bridgeHandler02()
      console.log("console of loadContracts, load Web3 in '5'");
    }

    if (window.ethereum.networkVersion === "97") {
      // Set provider for BSC Testnet (MetaMask)
      const bscProvider = new ethers.providers.Web3Provider(window.ethereum);
      setBSCProvider(bscProvider);

      // Set provider for Rinkeby
      const ethProvider = new ethers.providers.JsonRpcProvider(
        `https://polygon-mumbai.g.alchemy.com/v2/sxrVjPQKWGGwOaDBo1ElxFZTaw_JH13r`
      );
      setETHProvider(ethProvider);

      // Set signer
      const bscSigner = bscProvider.getSigner();
      setBSCSigner(bscSigner);

      setOtherNetwork("mumbai");

      await loadContracts();
      // await bridgeHandler02()
    }

    // window.ethereum.on('chainChanged', (chainId) => {
    //   window.location.reload();
    // })

    window.ethereum.on("accountsChanged", function (accounts) {
      setAccount(accounts[0]);
    });
  };

  const loadContracts = async () => {
    console.log("inside load contracts");
    if (!ethProvider && !bscProvider) {
      console.log("no providers");
      return null;
    }

    if (networkId !== "5777") {
      //1.created contract object
      //2.the address is hardcoded here make it a variable
      // 3.make two if conditions one for miniting in bsc and othe polygon

      setMessage("intialized Loading Contracts...");
      // craeting contract object
      const ethBridge = new ethers.Contract(
        "0xA72D942ccC97A2522B6F8D0fAd974e83A4451AF7",
        ETHBridge.abi,
        ethProvider
      );
      setETHBridge(ethBridge); //          Provider            ,, abi       ,, signer

      const bscBridge = new ethers.Contract(
        "0x30DC3629Af077B2c2a26B2b598261006b940D975",
        BSCBridge.abi,
        bscProvider
      );
      setBSCBridge(bscBridge);

      const ethTokenAddress = await ethBridge.token();
      console.log("goerli bridge address", ethTokenAddress);

      const ethToken = new ethers.Contract(
        ethTokenAddress,
        ETHToken.abi,
        ethProvider
      );
      setETHToken(ethToken);

      const bscTokenAddress = await bscBridge.token();

      console.log("binance bridge address", bscTokenAddress);
      const bscToken = new ethers.Contract(
        bscTokenAddress,
        BSCToken.abi,
        bscProvider
      );
      setBSCToken(bscToken); // passing value from outside

      console.log("bridge is fine , load contracts ");
      // Depending on the network, we listen for when tokens are burned from the bridge to mint
      // tokens on the other network... This is only for demonstration, for security it's more ideal to
      // have this specific logic on a server somewhere else, with a more secure implementation in place
      // incase of potential downtime (or if a user refreshes the page)!

      // If networkId === 4 (Rinkeby), listen to transfer events from the ETHBridge, then make a call to BSCBridge

      if (typeof networkId !== "undefined" && networkId == "80001") {
        console.log("entered net 5, load contracts");
        ethBridge.on(
          "Transfer",
          async (from, to, amount, date, nonce, signature, step) => {
            console.log(
              "in bridge 1",
              "from",
              from,
              "to",
              to,
              "amount",
              amount,
              "nonce",
              nonce,
              "signature",
              signature
            );

            setFrom(from);
            setTO(to);
            setAmount(amount);
            setNonce(nonce);
            setSignature(signature);
            localStorage.setItem("from", from);
            localStorage.setItem("to", to);
            localStorage.setItem("amount", amount);
            localStorage.setItem("nonce", nonce);
            localStorage.setItem("signature", signature);
            // const bridge = await ethBridge.connect(bscSigner)
            // await bridge.mint(from, to, amount, nonce, signature)
            console.log("mint is wroking for load contracts", from, to, amount);

            setHasProcessed(true);
            setIsLoading(false);
            setMessage("minted in the network");
          }
        );
      }
      // not working properly added by thiru~~
      // If networkId === 97 (BSC Testnet), listen to transfer events from the BSCBridge, then make a call to ETHBridge
      if (networkId === "97" && !mintReached) {
        console.log("inside bsc");
        bscBridge.on(
          "Transfer",
          async (from, to, amount, date, nonce, signature, step) => {
            console.log(
              "in bridge 2",
              "from",
              from,
              "to",
              to,
              "amount",
              amount,
              "nonce",
              nonce,
              "signature",
              signature
            );
            // const ethWallet = new ethers.Wallet("69ed47425a4008c795a3b5c87a79e228b8031b13f42564e2bfdce61c8e0ad828")
            // const ethSigner = ethWallet.connect(ethProvider)
            // const bridge = ethBridge.connect(ethSigner)
            console.log("p key of  ");
            setMintReached(true);

            localStorage.setItem("from", from);
            localStorage.setItem("to", to);
            localStorage.setItem("amount", amount);
            localStorage.setItem("nonce", nonce);
            localStorage.setItem("signature", signature);

            setFrom(from);
            setTO(to);
            setAmount(amount);
            setNonce(nonce);
            setSignature(signature);

            // Call mint function from here...
            // await bridge.mint(from, to, amount, nonce, signature)
            console.log("mint is wroking to 5", "from", from, "to", to, amount);
            setHasProcessed(true);
            setIsLoading(false);
          }
        );
      }
    } else {
      return;
    }
    setIsLoading(false);
  };

  // MetaMask Login/Connect
  const web3Handler = async () => {
    console.log("error shows here Web3Handler");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
    setNetworkId(window.ethereum.networkVersion);
    // GetAcc()
  };

  const bridgeHandler = async () => {
    const amountInWei = ethers.utils.parseUnits(amount.toString(), "ether");
    console.log("bridgehandler", networkId);

    if (networkId === "80001") {
      // Rinkeby
      // Connect account with contract...
      console.log("ethSignerinn burn", ethSigner);
      const bridge = await ethBridge.connect(ethSigner);
      console.log("account111", account);
      const id = await bridge.transferCount(account);

      console.log("in bet bridge handler)");
      // Create hash message, and have user sign it...
      const hashedMessage = ethers.utils.solidityKeccak256(
        ["address", "uint256", "uint256"],
        [account, amountInWei, Number(id) + 1]
      );
      //solidityKeccack256 is a hashing function which data types should match the respective params
      const other = ethers.utils.arrayify(hashedMessage);
      const signature = await ethSigner.signMessage(other);

      setMessage("Bridging over...Do NOT refresh the page!");
      setIsLoading(true);

      // Burn tokens...
      await bridge.burn(account, "1000000000000000000", signature);
      console.log("account", account, amountInWei, signature);

      console.log("eth burn completed ");
      setMessage("eth burn completed");
    }

    if (networkId === "97") {
      // Binance Testnet
      // Connect account with contract...
      const bridge = await bscBridge.connect(bscSigner);
      const id = await bridge.transferCount(account);
      console.log("in 97 of bridge handler ");
      // Create hash message, and have user sign it...
      const hashedMessage = ethers.utils.solidityKeccak256(
        ["address", "uint256", "uint256"],
        [account, amountInWei, Number(id) + 1]
      );
      const other = ethers.utils.arrayify(hashedMessage);
      const signature = await bscSigner.signMessage(other);

      setMessage(
        "Bridging over... Do NOT refresh the page!(burn completed ready to mint in other network)"
      );
      setIsLoading(true);

      // Burn tokens...
      await bridge.burn(account, "1000000000000000000", signature);
      console.log(
        "binance burn is completed ",
        account,
        amountInWei,
        signature
      );
      setMessage("eth burn completed");
    }
  };
  //
  const bridgeHandler02 = async () => {
    if (!ethProvider && !bscProvider) {
      console.log("no providers");
      return null;
    }

    setMessage("intialized Loading Contracts...");
    // craeting contract object
    const ethBridge = new ethers.Contract(
      "0xA72D942ccC97A2522B6F8D0fAd974e83A4451AF7",
      ETHBridge.abi,
      ethProvider
    );
    setETHBridge(ethBridge); //          Provider            ,, abi       ,, signer

    const bscBridge = new ethers.Contract(
      "0x30DC3629Af077B2c2a26B2b598261006b940D975",
      BSCBridge.abi,
      bscProvider
    );
    setBSCBridge(bscBridge);

    const ethTokenAddress = await ethBridge.token();
    console.log("goerli bridge address", ethTokenAddress);

    const ethToken = new ethers.Contract(
      ethTokenAddress,
      ETHToken.abi,
      ethProvider
    );
    setETHToken(ethToken);

    const bscTokenAddress = await bscBridge.token();

    console.log("binance bridge address", bscTokenAddress);
    const bscToken = new ethers.Contract(
      bscTokenAddress,
      BSCToken.abi,
      bscProvider
    );
    setBSCToken(bscToken); // passing value from outside

    console.log("bridge is fine , load contracts ");

    console.log(
      "from",
      from,
      "to",
      to,
      "nonce",
      nonce,
      "signature",
      signature,
      "amount",
      amount
    );

    console.log("bridgehandler02 Activate int function", networkId);
    let from01 = localStorage.getItem("from");
    let to01 = localStorage.getItem("to");
    let amount01 = localStorage.getItem("amount");
    let nonce01 = localStorage.getItem("nonce");
    let signature01 = localStorage.getItem("signature");
    console.log("localstorage", from01, to01, amount01, nonce01, signature01);

    const bridge = bscBridge.connect(bscSigner);
    await bridge.mint(from01, to01, amount01, nonce01, signature01);
    console.log("mint is executed");

    //system polices

    // not working properly added by thiru~~
    // If networkId === 97 (BSC Testnet), listen to transfer events from the BSCBridge, then make a call to ETHBridge

    //   if (typeof networkId !== 'undefined' && networkId == '80001') {

    //     console.log("entered net 80001, load contracts")
    //     ethBridge.on('Transfer', async (from, to, amount, date, nonce, signature, step) => {
    //       console.log("initiate minting in network 80001",from, to, amount, date, nonce, signature, step)

    //      setFrom(from)
    //      setTO(to)
    //      setAmount(amount)
    //      setNonce(nonce)
    //      setSignature(signature)
    //       const bridge =  ethBridge.connect(ethSigner)
    //       // await bridge.mint(from, to, amount, nonce, signature)

    //       console.log("minted in polygon network ",from,to,amount)

    //       setHasProcessed(true)
    //       setIsLoading(false)
    //       setMessage("minted in the network")
    //     });
    //   }

    // // ethBridge.on("Transfer", async(from, to, amount, event) => {

    //   if (typeof networkId !== 'undefined' && networkId == '97') {
    //     console.log("entered net 97, load contracts")
    //     bscBridge.on('Transfer', async (from, to, amount, date, nonce, signature, step) => {
    //       console.log("initiate minting in network 97",from, to, amount, date, nonce, signature, step)

    //      setFrom(from)
    //      setTO(to)
    //      setAmount(amount)
    //      setNonce(nonce)
    //      setSignature(signature)
    //       const bridge =  bscBridge.connect(bscSigner)
    //       // await bridge.mint(from, to, amount, nonce, signature)

    //       console.log("minted in binanace ",from,to,amount,"siganture after mintted",signature)

    //       setHasProcessed(true)
    //       setIsLoading(false)
    //       setMessage("minted in the network")
    //     });
    //   }
  };

  const ToPolygon = () => {
    window.ethereum.request({
      id: 1,
      jsonrpc: "2.0",
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${Number(80001).toString(16)}`,
          rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
          chainName: "Polygon Testnet Mumbai",
          nativeCurrency: {
            name: "Matic Mumbai",
            symbol: "tMATIC", // 2-6 characters long
            decimals: 18,
          },
          blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
        },
      ],
    });
  };

  const Tobinance = () => {
    window.ethereum.request({
      id: 1,
      jsonrpc: "2.0",
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${Number(97).toString(16)}`,
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
          chainName: "binance",
          nativeCurrency: {
            name: "tBNB",
            symbol: "tBNB", // 2-6 characters long
            decimals: 18,
          },
          blockExplorerUrls: ["https://bscscan.com/"],
        },
      ],
    });
  };

  console.log("isLoading", isLoading);
  console.log("hasProcessed", hasProcessed);
  console.log("message", message);
  console.log("account", account);
  console.log("chain", chain?.id);

  const renderChainOptions = () => {
    console.log("chains", chains);
  };

  useEffect(() => {
    toast.info(message);
  }, [message]);
  return (
    <div className="flex items-center justify-center mt-4 h-4/6">
      <div style={{ zIndex: 1 }}>
        <ToastContainer />
      </div>
      <div className="sm:w-3/5 w-full  rounded-lg h-screen-65  flex flex-col p-1  inset-0 bg-red-50 opacity-75 blend-overlay">
        <div className="flex flex-row items-center justify-between w-full h-screen-8  p-2 ">
          <div className=" text-xl font-body">Bridge</div>

          <div>
            <SettingsIcon />{" "}
          </div>
        </div>
        <div className="w-full  h-screen-10 mt-4 ">
          <Animation />
        </div>
        <div className=" w-full h-screen-8  flex items-center justify-around">
          <div className="border border-gray-300 bg-white  rounded w-56 flex items-center justify-center h-10 font-body">
            {array[0].name}
          </div>
          <button onClick={handleClick}>
            <ChangeCircleIcon />
          </button>
          <div className="border border-gray-300  bg-white rounded w-56 flex items-center justify-center h-10 font-body">
            {array[1].name}
          </div>
        </div>

        <div className=" flex flex-col  items-center justify-center w-full  h-screen-40 ">
          <div className="flex flex-col w-full h-30 ">
            <div className="flex flex-col w-full h-15 p-2 gap-2 ">
              <div className="flex justify-start font-body">you sent</div>
              <div className="  w-full  flex items-center justify-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={inr}
                    onChange={(e) => setINR(e.target.value)}
                    className=" block w-full h-10 rounded border border-gray-300 shadow-sm p-1"
                    placeholder=""
                  />
                  <button
                    className="absolute right-0 top-2 text-slate-400  pr-4 font-body"
                    type="submit"
                    onClick={() => setINR(ethers.utils.formatEther(balance))}
                  >
                    MAX
                  </button>
                </div>
                {/* <div className='border border-gray-300 bg-white  rounded w-56 flex items-center justify-center h-10' onClick={()=>bridgeHandler()}>{array[0].name}</div>  */}
                <div className="border border-gray-300 bg-white  rounded w-56 flex items-center justify-center h-10">
                  switch to goerli
                </div>
              </div>
              <div className="flex justify-end">
                <p className="font-body">
                  Balance:{" "}
                  {balance ? ethers.utils.formatEther(balance) : "Loading..."}
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full h-15 p-2 gap-2 ">
              <div className="flex justify-start font-body">you sent</div>
              <div className=" w-full  flex items-center justify-center">
                <div className=" w-full  h-10  rounded border border-gray-300 bg-slate-50  shadow-sm">
                  <div className="p-1">{convertedAmount}</div>
                </div>
                <div className="border border-gray-300 bg-white rounded w-56 flex items-center justify-center h-10 font-body">
                  {array[1].name}
                </div>
              </div>
            </div>
          </div>

          <div className="font-body font-bold ">
            <div
              className="border border-gray-300 bg-white  rounded w-56 flex items-center justify-center h-10"
              onClick={() => bridgeHandler()}
            >
              {" "}
              bridgeHandler(burn){" "}
            </div>

            <div
              className="border border-gray-300 bg-white  rounded w-56 flex items-center justify-center h-10"
              onClick={() => ToPolygon()}
            >
              {" "}
              ToPolygon{" "}
            </div>
            <div
              className="border border-gray-300 bg-white  rounded w-56 flex items-center justify-center h-10"
              onClick={() => Tobinance()}
            >
              {" "}
              Tobinance{" "}
            </div>

            <div
              className="border border-gray-300 bg-white  rounded w-56 flex items-center justify-center h-10"
              onClick={() => bridgeHandler02()}
            >
              {" "}
              bridgeHandler02(mint){" "}
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
