import './App.scss'
import { useContext } from 'react'
import { Signup } from './pages/signup/Signup'
import { Routes, Route } from 'react-router-dom'
import { TablesPage } from './pages/TablesPage/TablesPage'
import { Login } from './pages/Login/Login'
import { Settings } from './pages/Settings/Settings'
import { AuthContext } from './context/AuthContext'

function App() {

  return (
    <div className="App">
   
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/signin' element={<Login/>}/>
          <Route path='/tables' element={<TablesPage/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes> 
   
    </div>
  );
}

export default App;
