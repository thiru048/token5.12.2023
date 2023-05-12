import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import CopyrightIcon from '@mui/icons-material/Copyright';
function Footer() {
  return (
   
      <div className='w-full flex items-center justify-center bg-red-100 bottom-0 shadow-md h-1/6 mt-5 p-5' >
      <div className='text-2xl flex text-center justify-center gap-20 w-full'>
        <div className='hover:text-gray-400 duration-100'><FacebookIcon/></div>
        <div className='hover:text-gray-400 duration-100'><TwitterIcon/></div>           
        <div className='hover:text-gray-400 duration-100'><TelegramIcon/></div>
        <div className='hover:text-gray-400 duration-100'><InstagramIcon/></div> 
      </div> 
   
      </div>

  )
}

export default Footer