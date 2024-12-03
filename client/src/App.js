import './App.css';
import Dashboard from './modules/dashboard';
import Form from './modules/form';
import { Routes, Route, Navigate } from 'react-router-dom';

const Protective = ({ children, auth = false }) => {
  const isLogged = localStorage.getItem('user:token') != null || false;
  if (!isLogged && auth) {
    return <Navigate to={'User/sign_in'} />
  }
  else if (isLogged && ['/user/sign_in', '/user/sign_up'].includes(window.Location.pathname)) {
    console.log('object :>>');
    return <Navigate to={'/'} />
  }
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Protective auth={true}>
          <Dashboard />
        </Protective>
      } />
      <Route path="/user/sign_in" element={<Protective><Form isSignin={true} /></Protective>} />
      <Route path="/user/sign_up" element={<Protective><Form isSignin={false} /></Protective>} />
    </Routes>
  );
}

export default App;
