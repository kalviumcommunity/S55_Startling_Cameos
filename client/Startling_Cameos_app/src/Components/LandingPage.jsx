import axios from 'axios'
import '../App.css'
import logo from '../images/startling_cameos.png'
import Card from './Card'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect} from 'react'

function LandingPage() {

    const [selectedUser, setSelectedUser] = useState("All");
    const [uniqueUsers, setUniqueUsers] = useState(["All"]);
    const [cameos, setCameos] = useState([]);

    const loginStatus = sessionStorage.getItem('login');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://s55-startling-cameos.onrender.com/cameo');
                setCameos(response.data);
                const users = ["All", ...new Set(response.data.map(item => item.created_by).filter(Boolean))];
                setUniqueUsers(users);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        axios.post(`https://s55-startling-cameos.onrender.com/logout`)
            .then(() => {
                sessionStorage.removeItem('login');
                window.location.reload();
            })
            .catch((err) => {
                console.log('error logging out', err);
            });
    };

    const filteredCameos = cameos.filter(el => selectedUser === "All" || el.created_by === selectedUser);

    return (
        <div className='page'>
            <nav>
                <img src={logo} alt='logo' id='logo' />
                <div className='filter-container'>
                    <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
                        {uniqueUsers.map(user => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </select>
                </div>
                {loginStatus ? (
                    <div>
                        <button id='add-btn' onClick={() => { navigate('/form') }}>Add entity</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className='log-btn'>
                        <button className='cred' onClick={() => { navigate('/signup') }}>Signup</button>
                        <button className='cred' onClick={() => { navigate('/login') }}>Login</button>
                    </div>
                )}
            </nav>

            {/* Pass filteredCameos as props to the Card component */}
            <Card filteredCameos={filteredCameos} setCameos = {setCameos}/>

        </div>
    );
}

export default LandingPage;
