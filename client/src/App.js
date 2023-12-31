import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Protected from './components/Protected';
import Register from './components/Register';
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/protected' element={<Protected />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
