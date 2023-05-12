import React,{useState} from 'react'
import Img1 from "../../Image/logo.png"
import { SignMessage } from '../SignMessage';
import "./SignInmessage.css"
export const SignInMessage = () =>{

    //    dark and light theame
         const [theme, setTheme] = useState('light');
    
         const toggleTheme = () => {
           setTheme(theme === 'light' ? 'dark' : 'light');
         };
    
         const styles = {
           light: {
             backgroundColor: 'white',
             color: 'black',
           },
           dark: {
             backgroundColor: 'black',
             color: 'white',
           },
         };
    

  return (
    <div className='sign-container'  style={styles[theme]}>
        <div className='signin-page'>
      <div className='logo-sign'>
       <img src={Img1} width="150px" height="150px" alt='inocyx' />
        </div>
        <div className='center'>
         <div className='center-1'>
          <span className="btn-1">Hey</span>
          <div className='btn-2'>
          Looks like you've changed primary address in your wallet. You should sign new authentication message
            </div>
            <div className='btn'>
              <button  className='sign-btn'><SignMessage/> </button>    
              <div className='disconnect-btn'> <button>Disconnect</button>
              </div>
              </div>
          </div>
          <div className='line'>
          </div>
        </div>
        <div className='bottom'>
         <div className='bottom-item'>
        <div className='inc'>
            @Inocyx,inc
          </div>
          <div className='community'>
          <div className='community-1'>
          Community guidelines
            </div>
            <div className='community-2'>
            Terms
            </div>
            <div className='community-3'>
            Privacy policy
            </div>
            </div>
            <div className='darkmood'>
            <div style={styles[theme]}>
     
            <button onClick={toggleTheme}>Toggle Theme</button>
          </div>
              </div>
              </div>
        </div>
        </div>
        </div>
  )
}
