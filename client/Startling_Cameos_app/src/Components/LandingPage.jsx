import '../App.css'
import mike from '../images/Mike-tyson.png'
import logo from '../images/startling_cameos.png'


function LandingPage() {
    return (
        <div className='page'>
            <nav>
                <img src={logo} alt='logo' id='logo' />
                <input type="text" id='search' />
            </nav>
            <div className='mega-container'>
            <div className='container'>
                <div className='actors'>
                    <img src={mike} alt='mike' id='mike' />
                </div>
                <div className='contents'>
                    <h2>Mike Tyson</h2>
                    <h3>Movie: The Hangover</h3>
                    <h4>Character: Mike Tyson</h4>
                    <h4>Duration: 1min 30secs</h4>
                </div>
            </div>
            </div>

        </div>
    )
}

export default LandingPage;