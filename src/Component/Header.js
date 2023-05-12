


import React, { useState } from 'react'

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Backdrop } from '@mui/material';
import SignMessage from '../Singin';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../Image/thumbnail_Asset 2.png"
import { NavLink } from 'react-router-dom';
import "./Header.css"
const Header = () => {
  
    let [open,setOpen]=useState(false);
    const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
    
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (  
     <div className='None h-1/6'>
       <div className=' md:flex items-center justify-between shadow-sm h-20 w-full z-[1] shadow-md fixed top-0 left-0 bg-red-100'>
       <div className=' w-full flex items-center justify-around p-5 gap-2'>
       <div className="flex w-full items-center justify-start logo">
        
        <img src={logo} width="45px" height="45px" alt="logo"/>

    
       </div>
       <nav  className="w-full flex items-center justify-end ">
        <div className="menu-icon" onClick={handleShowNavbar}>
        <MenuOpenIcon />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li onClick={handleToggle}>
              <NavLink to="/contact">Wallet connect</NavLink>
            </li>
          </ul>
        </div>

    </nav>
       </div>
  <div>
  <div>
    
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open} >
    <div className="   relative rounded-md h-3/6 sm:w-2/6 w-3/6 sm:h-2/6 p-4 bg-slate-100 shadow-xl shadow-zinc-600 bg "  >
    <div className='absolute top-0 right-0 p-1 text-stone-800 cursor-pointer' onClick={handleClose}>
      <CloseIcon/>
      </div>
      <div className='flex  flex-col items-center justify-around '>

     
    <div className=' flex items-center justify-around relative text-neutral-800 text-2xl font-body mb-4'>Connect to a wallet</div>

    <div className='p-2 w-5/6 rounded-lg bg-yellow-400 mb-4 flex  items-start'>
    <SignMessage returnCallback={()=>setOpen(false)}  />
      </div>
      
   
    
    
    <div  className="font-body flex items-center text-center text-zinc-800 ">
    By connecting your wallet, you agree to our
Terms of Service and Privacy Policy
    </div>
 </div>
     
    </div>
   
      </Backdrop>
    </div>
  </div>

       </div>
      </div>
    
  )
  
  
}

export default Header







// import React, { useState } from 'react'
// import { useAccount, useConnect, useDisconnect } from 'wagmi'
// import { InjectedConnector } from 'wagmi/connectors/injected'
 
// import MenuOpenIcon from '@mui/icons-material/MenuOpen';
// import { Backdrop } from '@mui/material';
// import SignMessage from '../Singin';
// import CloseIcon from '@mui/icons-material/Close';
// import logo from "../Image/thumbnail_Asset 2.png"
// import { NavLink } from 'react-router-dom';
// import "./Header.css"
// const Header = () => {
  
//     let [open,setOpen]=useState(false);
//     const [showNavbar, setShowNavbar] = useState(false)

//   const handleShowNavbar = () => {
//     setShowNavbar(!showNavbar)
//   }
    
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleToggle = () => {
//     setOpen(!open);
//   };
//   const { address, isConnected } = useAccount()
//   const { connect } = useConnect({
//     connector: new InjectedConnector(),
//   })
//   const { disconnect } = useDisconnect()
//   if (isConnected)
//     return (
    
      
        
//         <div className='None h-1/6'>
//        <div className=' md:flex items-center justify-between shadow-sm h-20 w-full z-[1] shadow-md fixed top-0 left-0 bg-red-100'>
//        <div className=' w-full flex items-center justify-around p-5 gap-2'>
//        <div className="flex w-full items-center justify-start logo">
        
//         <img src={logo} width="45px" height="45px" alt="logo"/>

    
//        </div>
//        <nav  className="w-full flex items-center justify-end ">
//         <div className="menu-icon" onClick={handleShowNavbar}>
//         <MenuOpenIcon />
//         </div>
//         <div className={`nav-elements  ${showNavbar && 'active'}`}>
//           <ul>
//             <li>
//               <NavLink to="/">Home</NavLink>
//             </li>
//             <li>
//               <NavLink to="/blog">Blog</NavLink>
//             </li>
//             <li>
//               <NavLink to="/projects">Projects</NavLink>
//             </li>
//             <li>
//               <NavLink to="/about">About</NavLink>
//             </li>
//             <li onClick={handleToggle}>
//               <NavLink to="/contact"><button onClick={() => disconnect()}>Disconnect</button></NavLink>
//             </li>
//           </ul>
//         </div>

//     </nav>
//        </div>
//   <div>
//   <div>
    
//       <Backdrop
//         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={open} >
//     <div className="   relative rounded-md h-3/6 sm:w-2/6 w-3/6 sm:h-2/6 p-4 bg-slate-100 shadow-xl shadow-zinc-600 bg "  >
//     <div className='absolute top-0 right-0 p-1 text-stone-800 cursor-pointer' onClick={handleClose}>
//       <CloseIcon/>
//       </div>
//       <div className='flex  flex-col items-center justify-around '>

     
//     <div className=' flex items-center justify-around relative text-neutral-800 text-2xl font-body mb-4'>Connect to a wallet</div>

//     <div className='p-2 w-5/6 rounded-lg bg-yellow-400 mb-4 flex  items-start'>
//     <SignMessage returnCallback={()=>setOpen(false)}  />
//       </div>
      
   
    
    
//     <div  className="font-body flex items-center text-center text-zinc-800 ">
//     By connecting your wallet, you agree to our
// Terms of Service and Privacy Policy
//     </div>
//  </div>
     
//     </div>
   
//       </Backdrop>
//     </div>
//   </div>

//        </div>
//       </div>
    

      
//     )
//   return (  
//      <div className='None h-1/6'>
//        <div className=' md:flex items-center justify-between shadow-sm h-20 w-full z-[1] shadow-md fixed top-0 left-0 bg-red-100'>
//        <div className=' w-full flex items-center justify-around p-5 gap-2'>
//        <div className="flex w-full items-center justify-start logo">
        
//         <img src={logo} width="45px" height="45px" alt="logo"/>

    
//        </div>
//        <nav  className="w-full flex items-center justify-end ">
//         <div className="menu-icon" onClick={handleShowNavbar}>
//         <MenuOpenIcon />
//         </div>
//         <div className={`nav-elements  ${showNavbar && 'active'}`}>
//           <ul>
//             <li>
//               <NavLink to="/">Home</NavLink>
//             </li>
//             <li>
//               <NavLink to="/blog">Blog</NavLink>
//             </li>
//             <li>
//               <NavLink to="/projects">Projects</NavLink>
//             </li>
//             <li>
//               <NavLink to="/about">About</NavLink>
//             </li>
//             <li onClick={handleToggle}>
//               <NavLink to="/contact"><button onClick={() => connect()}>Connect Wallet</button></NavLink>
//             </li>
//           </ul>
//         </div>

//     </nav>
//        </div>
//   <div>
//   <div>
    
//       <Backdrop
//         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={open} >
//     <div className="   relative rounded-md h-3/6 sm:w-2/6 w-3/6 sm:h-2/6 p-4 bg-slate-100 shadow-xl shadow-zinc-600 bg "  >
//     <div className='absolute top-0 right-0 p-1 text-stone-800 cursor-pointer' onClick={handleClose}>
//       <CloseIcon/>
//       </div>
//       <div className='flex  flex-col items-center justify-around '>

     
//     <div className=' flex items-center justify-around relative text-neutral-800 text-2xl font-body mb-4'>Connect to a wallet</div>

//     <div className='p-2 w-5/6 rounded-lg bg-yellow-400 mb-4 flex  items-start'>
//     <SignMessage returnCallback={()=>setOpen(false)}  />
//       </div>
      
   
    
    
//     <div  className="font-body flex items-center text-center text-zinc-800 ">
//     By connecting your wallet, you agree to our
// Terms of Service and Privacy Policy
//     </div>
//  </div>
     
//     </div>
   
//       </Backdrop>
//     </div>
//   </div>

//        </div>
//       </div>
    
//   )
  
  
// }

// export default Header