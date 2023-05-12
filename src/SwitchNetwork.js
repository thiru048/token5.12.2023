import { disconnect } from '@wagmi/core'
import { id } from 'ethers/lib/utils.js'
import {  useNetwork, useSwitchNetwork } from 'wagmi'

export function SwitchNetwork() {
 const { chain } = useNetwork()
 
 const { chains, error, isLoading, pendingChainId, switchNetwork , network } =
 useSwitchNetwork(
    {chainId: 80001},{chainId: 97})
  
   const SwitchNN = async() => {
    if(chain?.id !== 80001 && chain?.id !== 97)
    //  await disconnect()  *****
    console.log ("disconnected due to wrong network,kindly connect to 5 or 97")
   }


   
 return (
 <>
 {/* {chain && <div>Connected to {chain.name}</div>}
 <div>{error && error.message}</div> */}
 <div>{SwitchNN}</div>
 </>
 )
}

export default SwitchNetwork;