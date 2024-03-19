import '../App.css'
import logo from '../images/startling_cameos.png'
import Card from './Card'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function LandingPage() {

    const navigate = useNavigate()
    return (
        <div className='page'>
            <nav>
                <img src={logo} alt='logo' id='logo' />
                <input type="text" id='search' />

                <button id='add-btn' onClick={()=>{navigate('/form')}}>Add entity</button>
            </nav>

            <Card />


        </div>
    )
}

export default LandingPage;