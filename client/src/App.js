//import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Toaster position='bottom-right' toastOptions={{ duration: 3000 }}></Toaster>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
