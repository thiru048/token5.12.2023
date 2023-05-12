import React from 'react'
import Header from './Header'
import Body from './Body'
import Footer from "./Footer"
function Bridge() {
  return (
    <div className='flex flex-col w-full h-screen'>
    <Header/>
    <Body/>
    <Footer/>
</div>
  )
}

export default Bridge