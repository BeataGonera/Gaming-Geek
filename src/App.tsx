import { useAuthContext } from './hooks/useAuthContext'
import { Routes, Route, Navigate} from 'react-router-dom'
import { useEffect } from 'react'
import { messaging } from './firebase/config'
import { getToken } from 'firebase/messaging'

import './App.scss'
import { Signup } from './pages/signup/Signup'
import { TablesPage } from './pages/TablesPage/TablesPage'
import { Login } from './pages/Login/Login'
import { Settings } from './pages/Settings/Settings'
import { AddTable } from './pages/AddTable/AddTable'
import { TableDetails } from './pages/TableDetailsPage/TableDetailsPage'


function App() {

  const {user, authIsReady} = useAuthContext() 

  const requestPermission = async () => {
    await Notification.requestPermission()
    .then(async (perm) => {
      if(perm === 'granted'){
          const token = await getToken(messaging, {vapidKey: 'BEZDaUHG8xz4M22ggnMIw46AMc2AO_3dCOI6yNGnycJuw5TkyaHjiKOGsiN1GiNnvV1G3ttBisaQkkyhSUzg6pw'})
          console.log(token)
        }else{
          console.log('permission denied')
        }
    })
  }

  useEffect(() => {
    requestPermission()
  },[])

  return (
    <div className="App">
      {authIsReady && (
        <Routes>
          <Route path='/' element={!user ? <Signup/> : <Navigate to= "/tables"/>}/>
          <Route path='/signin' element={!user ? <Login/> : <Navigate to= "/tables"/>}/>
          <Route path='/tables' element={user ? <TablesPage/> : <Navigate to= "/signin"/>}/>
          <Route path='/settings' element={user ? <Settings/> : <Navigate to= "/signin"/>}/>
          <Route path='/add-table' element={user ? <AddTable/> : <Navigate to= "/signin"/>}/>
          <Route path='/table-details/:tableKey' element={user ? <TableDetails/> : <Navigate to= "/signin"/>}/>
        </Routes> 
      )}
    </div>
  );
}

export default App;
