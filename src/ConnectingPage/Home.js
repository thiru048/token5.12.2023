import React from 'react'
import Bridge from '../Component/Bridge'
import ModelPopup from '../ModelPopup'
import SwitchNetwork from '../SwitchNetwork'
import WatchAcc from '../Watch'
import { SignInMessage } from './SignInmessage/SignInmessage'

const Home = () => {
  return (
    <div>
        <ModelPopup/>
        <Bridge/>
        <SwitchNetwork/>
        {/* <WatchAcc/> */}
    </div>
  )
}

export default Home