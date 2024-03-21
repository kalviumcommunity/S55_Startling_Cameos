import axios from "axios";
import "../App.css";
import { useState } from "react"; 
import { useNavigate,Link } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();

  const setCookie = (name,value,days)=>{
        const expire = new Date();
        expire.setTime(expire.getTime()+ days*24*60*60*1000)
        document.cookie = name + '=' + value +' ' + expire.toUTCString();
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault(); 
      if (!username || !password) {
        if (!username) {
          alert("Please enter your username");
        }
        if (!password) {
          alert("Please enter your password");
        }
      } else if (password.length < 6) {
        alert("Password should contain at least 6 characters");
      } else {
        
        const response = await axios.post(`https://s55-startling-cameos.onrender.com/login`, { username, password }); 
        if(response.status===200){
            setCookie('username',username,365)
            setCookie('password',password,365)
            sessionStorage.setItem('login',true)
            sessionStorage.setItem('username',username)
            alert('login succesful')
            navigate("/home");
        }
       else if(response.status ===  401){
            alert('invalid user credentials')
            console.log(Error)
          }  
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="login-container">
        <form action="" className="userForm" onSubmit={handleLogin}>
          <div>
            <label htmlFor="">Username: </label>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>

          <div>
            <label>Password: </label>
            <input
              type="password" 
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" id="btn">
            LOGIN
          </button>
          <u>
            <p>Not a user?  
            <Link to='/signup'>
            <a>Sign-up</a>
            </Link>
          </p>
          </u> 
        </form>
      </div>
    </>
  );
}

export default Login;