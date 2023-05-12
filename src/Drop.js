// import React,{useState} from 'react'
// import { useDisconnect} from 'wagmi';
// import { watchAccount } from '@wagmi/core'
// function Backdrop() {
//     const [open,setOpen]=useState(false)
//      //const { disconnectAync } = useDisconnect()

//     const unwatch = watchAccount((account) => {
//         const accountFromLocal = localStorage.getItem("account")
//         console.log("account",account?.address,"---",accountFromLocal)
//         if(accountFromLocal && (accountFromLocal === account?.address)){
//          setOpen(false);
//         }else {
//           setOpen(true)

//         }

//         // return localStorage.clear()
//       });
//   return (
//     <Backdrop
//     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//     open={open}
//     >
//     {/* <h1 onClick={()=>setOpen(false)}>Hell00o</h1> */}
//     {/* <button onClick={() => dis()}>Disconnect</button> */}
//    {/* <p>Hello</p> */}
//   </Backdrop>
//   )
// }

// export default Backdrop
