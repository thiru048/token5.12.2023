import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'

import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
// import {  bsc ,bscTestnet,polygonMumbai } from '@wagmi/core/chains'
// import { switchNetwork } from './switchNetwork'
// import { watchAccount } from './watchAccount'

import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// import { Route, Routes } from 'react-router-dom'
import Bridge from './Component/Bridge'
import SwitchNetwork from './SwitchNetwork'

import React, { Fragment, useState }  from 'react'
// import SignMessage from './SignMessage'

import ModelPopup from './ModelPopup'
import { watchNetwork } from '@wagmi/core'
import WatchAcc from './Watch'



const Api = '6e2da6a9e8044aa79ba75e5518e4c4eb'
const { chains, provider, webSocketProvider } = configureChains(
 [mainnet],
 [infuraProvider({ Api }),publicProvider()],)

// Set up client
const client = createClient({
    autoConnect: true,
    // autoConnect: [ "Binance", "mainnet", "goerli"],
 connectors: [
 new MetaMaskConnector({ chains }),

 new InjectedConnector({
 chains,
 options: {
 name: 'Injected',
//  shimDisconnect: true,
 },
 }),
 ],
 provider,
 webSocketProvider,
})

// Pass client to React Context Providexport er
export default function App() {

  const [otherNetworks, setOtherNetworks] = useState(false)

  watchNetwork((network) => {
    console.log("check here",network)
    if(network?.chain?.contracts?.id !== 5 || network?.chain?.contracts?.id !== 97){
      setOtherNetworks(true);
    }else{
      setOtherNetworks(false)
    }
  })

    // const [open,setOpen]=useState(false)
  // const { disconnectAync } = useDisconnect()
    
    // watchAccount((account) =>async ()=> {
    //     const accountFromLocal = await localStorage.getItem("account")
    //     console.log("account",account?.address,"---",accountFromLocal)
    //     if(accountFromLocal && (accountFromLocal === account?.address)){
    //      setOpen(false);
    //     }else {
    //       setOpen(true)
    //       // await disconnectAsync()
         
    //     }
      
    //     // return localStorage.clear()
    //   });

    console.log("otherNetworks",otherNetworks)

 return (
 <WagmiConfig client={client}>
 
 {/* <switchNetwork/> */}
 {/* <watchAccount/> */}

 {/* <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/sign" element={ <SignInMessage/>}/>
 </Routes> */}
 <ModelPopup />
 <Bridge/>
 <SwitchNetwork/>
  {otherNetworks ? <WatchAcc /> : <Fragment />}

  {/* <App03/> */}
 </WagmiConfig>
 )
}