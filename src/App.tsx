import './App.scss'
import { Signup } from './pages/signup/Signup'
import { Routes, Route } from 'react-router-dom'
import { TablesPage } from './pages/TablesPage/TablesPage'
import { Login } from './pages/Login/Login'

function App() {

  return (
    <div className="App">
   
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/signin' element={<Login/>}/>
          <Route path='/tables' element={<TablesPage/>}/>
        </Routes> 
   
    </div>
  );
}

export default App;
