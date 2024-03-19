import './App.css'
import LandingPage from './Components/LandingPage'
import Form from './Components/Form'
import { Route,Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/form' element={<Form/>}/>

      </Routes>
    </>
  )
}

export default App
