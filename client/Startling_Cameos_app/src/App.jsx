import './App.css'
import LandingPage from './Components/LandingPage'
import Form from './Components/Form'
import UpdateEntity from './Components/Update'
import { Route,Routes } from 'react-router-dom'
import Signup from './Components/SignUp'
import Login from './Components/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/updateEntity/:id' element = {<UpdateEntity/>}/>
        <Route path='/signup' element = {<Signup/>} />
        <Route path='/login' element = {<Login/>} />
      </Routes>
    </>
  )
}

export default App
