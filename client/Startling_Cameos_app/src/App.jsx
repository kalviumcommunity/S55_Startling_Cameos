import './App.css'
import LandingPage from './Components/LandingPage'
import Form from './Components/Form'
import UpdateEntity from './Components/Update'
import { Route,Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/updateEntity/:id' element = {<UpdateEntity/>}/>

      </Routes>
    </>
  )
}

export default App
