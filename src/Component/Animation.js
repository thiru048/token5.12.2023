import React,{useEffect,useRef} from 'react'
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import { Player, Controls } from '@lottiefiles/react-lottie-player';


 
function Animation() {
 
  return (
    <div className='animation'>
      <div class=" flex items-center justify-center  w-full h-8 ">
                <div class="relative ">
                  <div class="w-12 h-12 bg-red-300 rounded-lg shadow-2xl ">
                         <div className='flex justify-center items-center p-3  text-4xl'><AccessibleForwardIcon/></div>
                    </div>
                       <div class="absolute top-3 right-3 -mr-1 -mt-1 w-8 h-8 rounded-lg bg-red-500 animate-ping"></div>  
                </div>
                <div >
                <Player
  className="relative"
  autoplay
  loop
  src="https://assets1.lottiefiles.com/packages/lf20_cluvAE9JiR.json"
  style={{ height: '200px', width: '300px'}}
>
  
</Player>
                
                </div>
                <div className="relative ">
                  <div className="w-12 h-12 bg-red-300 rounded-lg shadow-2xl ">
                         <div className='flex justify-center items-center p-3 text-4xl'><AllInboxIcon/></div>
                    </div>
                       <div class="absolute top-3 right-3 -mr-1 -mt-1 w-8 h-8 rounded-lg bg-red-500 animate-ping duration-2000"></div>  
                </div>
        </div>
    </div>
  )
}

export default Animation
