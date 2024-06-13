import Header from '../components/Header';
import UserForm from '../components/UserForm';

function Register() {
  const token = localStorage.getItem('token');
  if (token) {
      window.location.href = '/';
  }

  return (
    <>
      <Header/>
      <UserForm type='register'/>
    </>
  )
}

export default Register
