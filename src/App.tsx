import { useAuthContext } from './hooks/useAuthContext'
import { Routes, Route, Navigate} from 'react-router-dom'

import './App.scss'
import { Signup } from './pages/signup/Signup'
import { TablesPage } from './pages/TablesPage/TablesPage'
import { Login } from './pages/Login/Login'
import { Settings } from './pages/Settings/Settings'
import { AddTable } from './pages/AddTable/AddTable'


function App() {

  const {user, authIsReady} = useAuthContext() 

  return (
    <div className="App">
      {authIsReady && (
        <Routes>
          <Route path='/' element={!user ? <Signup/> : <Navigate to= "/tables"/>}/>
          <Route path='/signin' element={!user ? <Login/> : <Navigate to= "/tables"/>}/>
          <Route path='/tables' element={user ? <TablesPage/> : <Navigate to= "/signin"/>}/>
          <Route path='/settings' element={user ? <Settings/> : <Navigate to= "/signin"/>}/>
          <Route path='/add-table' element={user ? <AddTable/> : <Navigate to= "/signin"/>}/>
        </Routes> 
      )}
    </div>
  );
}

export default App;
