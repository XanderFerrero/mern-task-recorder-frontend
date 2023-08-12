import {useState,useEffect} from "react"
import {FaUser} from "react-icons/fa"
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {register, reset} from "../reduxFiles/slices/auth"

export default function Register() {
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isLoading, isSuccess, message, isError} = useSelector(
    state => state.auth);

  const {name, email, password, password2} = formData;

  useEffect(() => {
    if(isError){
      toast.error(message);
    }

    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

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
    if(password != password2){
      toast.error("Passwords don't match",{
        position:toast.POSITION.BOTTOM_LEFT
      })
    }else{
      const userData = {
        name, email, password
      }
      
      dispatch(register(userData))
    }
  }

  if(isLoading){
    return <h1>LOADING USER</h1>
  }

  return (
    <>
      <section className="header">
        <h1>
          <FaUser/> Register User
        </h1>
      </section>
      <section className="container form-container mt-4 mb-4">
        <form className="" id="registerForm" onSubmit={submit}>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name='name'
              placeholder="Pls Enter Name"
              onChange={change}
              required
            ></input>
            <label htmlFor="name">Name</label>
          </div>

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

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name='password2'
              placeholder="Pls Enter Password"
              onChange={change}
              required
            ></input>
            <label htmlFor="password">Password Confirm
            </label>
          </div>

          <button className="btn btn-primary" onClick={validate}>Submit</button>
          
        </form>
      </section>
    </>
  )
}
