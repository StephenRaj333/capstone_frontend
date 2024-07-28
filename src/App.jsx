import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/dashboard.css';
import Login from './components/Login';
import Signup from './components/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';

function App() {  
  return (    
    <>    
      <BrowserRouter> 
        <Routes>  
          <Route path='/' element={<Signup />} /> 
          <Route path='/signup' element={<Signup />} />  
          <Route path='/login' element={<Login />} /> 
          <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />}>  
            <Route path='home' element={<ProtectedRoute element={<Home />} />} /> 
            <Route path='about' element={<ProtectedRoute element={<About />} />} /> 
            <Route path='contact' element={<ProtectedRoute element={<Contact />} />} /> 
          </Route>      
        </Routes>       
      </BrowserRouter>      
    </>   
  );      
} 

export default App; 
