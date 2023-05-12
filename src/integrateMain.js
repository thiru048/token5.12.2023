
import React,{useState,useEffect} from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Animation from './Animation'
import { Button } from '@mui/material';
import {ethers,providers} from 'ethers';

import { Bridgehandler } from './integrate/bridgeHandler';
// import { Web3Handler } from './integrate/Web3Handler';
// import { LoadWeb3 } from './integrate/LoadWeb3';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


const [showToast, setShowToast] = useState(false);
	const [amount, setAmount] = useState(0)


const OffClick = () => {
  setShowToast(true);
  toast.success("Button was clicked", {
      position: "top-right",
      autoClose: 2000,
      toastId: "uniqueToastId"
  });
}
  const [inr, setINR] = useState(0);
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  
  const [error, setError] = useState();

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

  const [balance, setBalance] = useState();

  useEffect(() => {
      async function getBalance() {
          if (typeof window.ethereum !== 'undefined') {
              const provider = new providers.Web3Provider(window.ethereum);
              const address = await provider.listAccounts();
              const balance = await provider.getBalance(address[0]);
              setBalance(balance);
          }
          else {
              console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
          }
      }
      getBalance();
  }, []);


console.log(setTargetCurrency)


  useEffect(() => {
    async function getExchangeRate() {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${targetCurrency}`);
      const data = await response.json();
      setExchangeRate(data.rates.INR);
    }
    getExchangeRate();
  }, [targetCurrency]);

  useEffect(() => {
    setConvertedAmount(inr * exchangeRate);
  }, [inr, exchangeRate]);

  const [active, setActive] = useState(false);

  const colorClick = () => {
    setActive(prevActive => !prevActive);
  }


  const [array, setArray] = useState([
    { id: 1, name:  <button
      // onClick={() => handleNetworkSwitch("polygon")}
      
      
    >
      Switch to goerli
    </button>}, 
    { id: 2, name: <button 
      // onClick={() => handleNetworkSwitch("bsc")}
     
    >
      Switch to bscTestnet
    </button>},]);

  function swap(array, i, j) {
    const temp = array[i];
    array.splice(i, 1, array[j]);
    array.splice(j, 1, temp);
  }

  function handleClick() {
    swap(array, 0, 1);
    setArray([...array]);
  }


  useEffect(() => {
    async function checkNetwork() {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let network = await provider.getNetwork();
      let networkName = await network.name;
    
      toast(`You are currently on the ${networkName} network.`, {
        position: "top-right",
        autoClose: 2000,
       
        toastId: "uniqueToastId"
    });
  }

  
    checkNetwork();

}, []);
  return (
    <div className="flex items-center justify-center mt-4" >
         <div style={{ zIndex: 1 }}>
      <ToastContainer/>
    </div>
     <div className="sm:w-3/5 w-full  rounded-lg h-screen-65  flex flex-col p-1  inset-0 bg-red-50 opacity-75 blend-overlay">
      <div className="flex flex-row items-center justify-between w-full h-screen-8  p-2 ">
      <div className=" text-xl font-body">Bridge</div>
   
      <div><SettingsIcon/> </div>
    </div>
    <div className='w-full  h-screen-10 mt-4 '>
   <Animation/>
   </div>
    <div  className=' w-full h-screen-8  flex items-center justify-around'>
      <div className='border border-gray-300 bg-white  rounded w-56 flex items-center justify-center h-10 font-body'>{array[0].name}</div>
      <button onClick={handleClick}><ChangeCircleIcon/></button>
      <div className='border border-gray-300  bg-white rounded w-56 flex items-center justify-center h-10 font-body'>{array[1].name}</div>
    </div>
   
    <div className=' flex flex-col  items-center justify-center w-full  h-screen-40 '>
    <div className='flex flex-col w-full h-30 '> 
    <div className="flex flex-col w-full h-15 p-2 gap-2 ">
      <div className="flex justify-start font-body">
       you sent
      </div>
      <div className='  w-full  flex items-center justify-center'>
      <div className='relative w-full'>
      <input type="text" value={inr} onChange={e => setINR(e.target.value)}  className=" block w-full h-10 rounded border border-gray-300 shadow-sm p-1" placeholder="" />
 <button className="absolute right-0 top-2 text-slate-400  pr-4 font-body" type="submit" onClick={()=>setINR(ethers.utils.formatEther(balance))}>
 MAX
  </button>
</div>
  <div>
							<input type="number" onChange={(e) => { setAmount(e.target.value) }} placeholder='Amount' />
							<button onClick={Bridgehandler.bridgeHandler} className='button btn-sm mx-3'>{`Bridge to ${Bridgehandler.otherNetwork}`}</button>
						</div>
</div>
 <div className='border border-gray-300 bg-white  rounded w-56 flex items-center justify-center h-10'>{array[0].name}</div> 
      </div>
      <div  className="flex justify-end">
      <p  className='font-body'>Balance: {balance ? ethers.utils.formatEther(balance) : 'Loading...'}</p>
      </div>
    </div>
    <div className="flex flex-col w-full h-15 p-2 gap-2 ">
      <div className="flex justify-start font-body">
       you sent
      </div>
      <div className=' w-full  flex items-center justify-center'>
       <div className="  w-full  h-10  rounded border border-gray-300 bg-slate-50  shadow-sm"> 
       <div className='p-1'>
       {convertedAmount}
       </div>
       </div>
      <div className='border border-gray-300 bg-white rounded w-56 flex items-center justify-center h-10 font-body'>{array[1].name}</div>
         
               </div>
           </div>  
        </div>
        <div className='flex items-center justify-center border rounded w-52 bg-white h-10 gap-5 font-body'>
         <div className='font-body font-bold '>
          Approve
         </div>
        </div>
      </div>
   </div>
</div>
  )
}
