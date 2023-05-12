import  { useEffect,useState } from "react";
import { watchAccount } from "@wagmi/core";
import { watchNetwork } from '@wagmi/core'
import { Backdrop } from '@mui/material';
import {useDisconnect } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import SignMessage from "./Singin";

const ModelPopup = () => {
    const [open,setOpen]=useState(false)
   
    const { disconnect } = useDisconnect()
    const unwatch = watchAccount((account) => {
        const accountFromLocal = localStorage.getItem("account")
        console.log("account",account?.address,"---",accountFromLocal)
        if(accountFromLocal && (accountFromLocal !== account?.address)){
          console.log("inside false")

          setOpen(true);
        }else {
         setOpen(false)
        }
      });
    const dis = async() =>{
        // if(setOpen(true)){
        console.log('dis...')
        // disconnect() ****

       //await disconnectAync()
  //  localStorage.clear() ***
//     console.log("disconnected")
                                // }
    //    setOpen(true)
    setOpen(false)

    console.log('dis')
      }

//Disconnect message pop-up

//-------------------- for testing its is muted
// const showToast = () => {
//   toast("MetaMask Wallet Disconnected")
// };
    return (
    <div style={{display:"flex",flexDirection:1}}>
       <ToastContainer/>
        <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
    >
    {/* <h1 onClick={()=>setOpen(true)}>acc not changed</h1> */}
 {/* <Link to="/sign"> <button onClick={() => setOpen(true)}>Disconnect</button> </Link> */}

 <button onClick={() => dis()} className="h-16 w-1/4 border text-xl bg-slate-50 text-black font-body drop-shadow-xl rounded-md">
 {/* <button onClick={showToast}> Disconnected MetaMask Wallet</button> */}
 </button>

  </Backdrop>
  </div>)


}
export default ModelPopup;

