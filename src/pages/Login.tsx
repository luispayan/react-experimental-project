import Header from '../components/Header';
import UserForm from '../components/UserForm';

function Login() {
  const token = localStorage.getItem('token');
  if (token) {
      window.location.href = '/';
  }

  return (
    <>
      <Header/>
      <UserForm type='login'/>
    </>
  )
}

export default Login
