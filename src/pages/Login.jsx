import {useState, useEffect} from "react"
import {FaSignInAlt} from "react-icons/fa"
import {toast} from 'react-toastify'
import { useSelector , useDispatch } from "react-redux";
import {login, reset} from "../reduxFiles/slices/auth" 
import {useNavigate} from "react-router-dom"

export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    email:'',
    password:'',
  });

  const {email, password} = formData;

  const {user, isSuccess, isLoading, isError, message} = useSelector(state => state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message);
    }

    if(isSuccess || user){
      dispatch(reset())
      navigate("/")
    }


  }, [user, isSuccess, isError, message])

  const change = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  const validate = (e) => {
    document.getElementById("registerForm").classList.add("was-validated");
  }

  const submit = (e) => {
    e.preventDefault();

    dispatch(login({email,password}))
  }

  if(isLoading){
    return <h1>Loading......</h1>
  }

  return (
    <>
      <section className="header">
        <h1>
          <FaSignInAlt/> Login User
        </h1>
        <p>Login to your account to note tasks</p>
        <p>Or register a new account</p>
      </section>
      <section className="container form-container mt-4 mb-4">
        <form className="" id="registerForm" onSubmit={submit}>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              name='email'
              placeholder="Pls Enter Email"
              onChange={change}
              required
            ></input>
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name='password'
              placeholder="Pls Enter Password"
              onChange={change}
              required
            ></input>
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-primary" onClick={validate}>Submit</button>
          
        </form>
      </section>
    </>
  )
}
