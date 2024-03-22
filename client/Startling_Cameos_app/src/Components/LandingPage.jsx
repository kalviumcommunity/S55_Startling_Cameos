import axios from 'axios'
import '../App.css'
import logo from '../images/startling_cameos.png'
import Card from './Card'
import { useNavigate } from 'react-router-dom'

function LandingPage() {

    const loginStatus = sessionStorage.getItem('login')
    const navigate = useNavigate()

    const handleLogout = () => {
     axios.post(`https://s55-startling-cameos.onrender.com/logout`)
    .then(()=>{
        sessionStorage.removeItem('login')
        window.location.reload()
    })
    .catch((err)=>{
        console.log('error logging out', err)
    })
    }
    return (
        <div className='page'>
            <nav>
                <img src={logo} alt='logo' id='logo' />
                <input type="text" id='search' />
                {loginStatus ? (
                    <div><button id='add-btn' onClick={() => { navigate('/form') }}>Add entity</button>
                        <button onClick={handleLogout}>Logout</button></div>
                ) : (
                    <div className='log-btn'>
                        <button className='cred' onClick={() => { navigate('/signup') }}>Signup</button>
                        <button className='cred' onClick={() => { navigate('/login') }}>Login</button>
                    </div>
                )

                }

            </nav>

            <Card />


        </div>
    )
}

export default LandingPage;