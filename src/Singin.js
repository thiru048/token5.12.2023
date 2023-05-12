import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import {
  useAccount,
  useConnect,
  useSignMessage,
  useDisconnect,
  useSwitchNetwork,
  useNetwork,
  isLoading,
  
} from "wagmi";
// import "./WalletConnect/WalletButtons.css"
import { useEffect, useState } from "react";
import WatchAcc from "./Watch";
import { toast } from 'react-toastify';

const SignMessage = ({returnCallback}) => {
    const { chain } = useNetwork()
    const [walletAddress, setWalletAddress] = useState("")
    const [chainID, setChainID] = useState("")
    const [meassage,setMessage]=useState("Connecting to metamask")
     const [accountChange,setAccountChanged]=useState(false)
    const { chains, error, isLoading:isLoading1, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { connectAsync, connectors, pendingConnector } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected, account,isLoading , } = useAccount(false)
  

  const { data, isError, isSuccess, signMessage } = useSignMessage({
    message:
      "I want to login on INOCYX at  https://static.inocyx.com/terms.pdf and I am at least 13 years old.",
  });

  // useEffect(()=>{
  //   if(chain !== 5 && chain !==97){
  //       console.log("inside useE")
  //       switchNetwork?.(97)
  //   }
  // },[])

  // useEffect(()=>{
  //   if(chain == 97){
  //       console.log("inside useE")
  //       switchNetwork?.(97)
  //   }
  // },[])


//   useEffect(()=>{
//     if(chain?.id !== 1){
//         console.log("inside useE")
//         switchNetwork?.(1)
//     }

//     console.log("account1111",account,isConnected)
//         if(isConnected){
//             console.log("inside useE2222")
//             signMessage()
//         }
    
//   },[switchNetwork,chain,signMessage,account,isConnected])


// Toast message here
// useEffect (()=>{
//   if(isConnected == true){
//     toast.success('SignIn Successfully');
//     toast.success('MetaMask Wallet Connected Successfully');
//     console.log("MetaMask Wallet Connected Successfully")
//   }else{
//     console.log('Please SignIn MetaMask Wallet')
//     toast.error('Please SignIn MetaMask Wallet');
//     toast.error(' Please MetaMask Wallet Connect');
//   }
// },[isConnected])

// useEffect(() => {
//   if (isConnected === true) {
//     toast.success('MetaMask Wallet Connect Successfully');
//   } else {
//     toast.error('Please Connect MetaMask Wallet');
//   }
// }, [isConnected]);
  const connectWeb3Wallet = async() => {
    console.log("connect web333")
    if (isConnected) {
        // await disconnectAsync();
    }
  
      const { account, chain } = await connectAsync(({ connector: new MetaMaskConnector({options: {
        shimChainChangedDisconnect: false,
      }},[chains?.id ===80001]),}) );

      console.log("account & chain", account, chain)
      let signature;
      if(account){
        signature = await signMessage()
      }

      console.log("signature",signature)

      localStorage.setItem("account",account)
      localStorage.setItem("chain",chain?.id)
      if(signature){
        console.log("insideeee signature")
        returnCallback(true)
      }

  }

  const getLocalDetails = () => {
    const walletAddressLocal = localStorage.getItem("account")
    const chainIDLocal = localStorage.getItem("chain")
    setWalletAddress(walletAddressLocal)
    setChainID(chainIDLocal)
  }

  useEffect(()=>{
    if(data){
      returnCallback(true);
    }
  },[data])
  

  console.log("sig data",data)
  



  return (
    <div>
        
      <button disabled={isLoading} onClick={() => connectWeb3Wallet()} >
      
        <img src="https://www.idkfoundation.org/images/wallet-logo/logo-metamask.png" width="200px" height="150px" alt=""/>
     
      </button>
  
    {/* <WatchAcc/> */}

 {/* <Drop/> */}
      {/* <button onClick={() => getLocalDetails()} className="disconnect-bt">
        get details
      </button>
      {walletAddress ? <div>{walletAddress}</div>:<Fragment/>}
      {chainID ? <div>{chainID}</div>:<Fragment/>} */}
      {/* {isSuccess && <div>Signature: {data}</div>} */}
      {/* {isError && <div>you are not connected to a wallet </div>} */}
    </div>
  );
};

export default SignMessage;