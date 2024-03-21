import '../App.css'
import logo from '../images/startling_cameos.png'
import Card from './Card'
import { useNavigate } from 'react-router-dom'

function LandingPage() {

const loginStatus = sessionStorage.getItem('login')
    const navigate = useNavigate()
    return (
        <div className='page'>
            <nav>
                <img src={logo} alt='logo' id='logo' />
                <input type="text" id='search' />
            {loginStatus?(
                <button id='add-btn' onClick={()=>{navigate('/form')}}>Add entity</button>
            ):(
            <div className='log-btn'>
            <button className='cred' onClick={()=>{navigate('/signup')}}>Signup</button>
            <button className='cred' onClick={()=>{navigate('/login')}}>Login</button>
            </div>
            )
            
            }
                

                
               
                
            </nav>

            <Card />


        </div>
    )
}

export default LandingPage;