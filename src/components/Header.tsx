import Logo from '../assets/logo.png';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Header() {
  const token = localStorage.getItem('token');

  const logout = () => {
    withReactContent(Swal).fire({
      title: 'Do you want to log out?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    });
  }

  return (
    <header className="header flex justify-between items-center p-10 !bg-red-900">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-20 mr-3"/>
        <h1 className="text-2xl text-white">Inventory Control</h1>
      </div>
      { !token && (
        <div>
          <a href="/login" className="px-4 py-2 mr-3 text-white bg-red-500 hover:bg-red-700 rounded">
            Login
          </a>
          <a href="/register" className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded">
            Register
          </a>
        </div> 
      )}
      { token && (
          <button onClick={logout} className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded">
            Logout
          </button>
      )}
    </header>
  );
}
export default Header;