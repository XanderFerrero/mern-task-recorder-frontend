import {FaSignInAlt,FaSignOutAlt,FaUser} from "react-icons/fa"
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {logout, reset} from "../reduxFiles/slices/auth"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand bg-dark navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">Task Recorder</Link>
          <ul className="navbar-nav">
            {
              user ? (
                <>
                  <li>
                    <button className="btn btn-secondary"
                    onClick={onLogout}>
                      <FaSignOutAlt/> Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link active">
                      <FaUser/> Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/login' className="nav-link active">
                      <FaSignInAlt/> Login
                    </Link>
                  </li>    
                </>
              )
            }
            
          </ul>
        </div>
    </nav>
  )
}
