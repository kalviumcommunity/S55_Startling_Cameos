import '../App.css'
import logo from '../images/startling_cameos.png'
import Card from './Card'


function LandingPage() {
    return (
        <div className='page'>
            <nav>
                <img src={logo} alt='logo' id='logo' />
                <input type="text" id='search' />
            </nav>
            
            <Card/>

        </div>
    )
}

export default LandingPage;