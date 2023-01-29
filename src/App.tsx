import './App.scss'
import { Signup } from './pages/signup/Signup'
import { Routes, Route } from 'react-router-dom'
import { TablesPage } from './pages/TablesPage/TablesPage';

function App() {
  return (
    <div className="App">
      
   
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/tables' element={<TablesPage/>}/>
        </Routes> 
   
    </div>
  );
}

export default App;
