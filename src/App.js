import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home';
import { SignIn } from './Contexts/SignIn';
import Post from './components/Pages/Post';



function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

  return (
      <SignIn.Provider value={{setIsAuth, isAuth}}>
      <div>
        <Router>
          <Routes>
            <Route path='/feed' element={<Home />} />
            <Route path='/' element={<Login />} />
            <Route path='/post/:id' element={<Post />} />
          </Routes> 
        </Router>
      </div>
      </SignIn.Provider>
  );
}

export default App;
