import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
    const { loginUser } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const form = e.target
  
      const email = form.email.value
      const password = form.password.value
      console.log(email, password,)
      loginUser(email, password)
        .then(result => {
          toast.success('login successfull')
          navigate(location?.state ? location.state : "/")
        })
        .catch(error => {
          toast.error(error.message)
          console.log(error.message)
          navigate('/register')
        })
    }
  
    const handleSigninwithGoogle = () => {
  
      signInWithPopup(auth, googleProvider)
        .then(result => {
          toast.success('login success')
          navigate(location?.state ? location.state : "/")
        }).catch(error => {
          toast.error(error.message)
          navigate('/register')
        })
    }
  
    const [showpassword, setShowpassword] = useState(false)
    return (
      <div className="hero bg-base-200 min-h-screen">
  
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
          <h1 className="text-3xl font-bold text-center">Login now!</h1>
  
          <form onSubmit={handleSubmit} className="card-body">
  
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" required />
            </div>
  
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type={showpassword ? 'text' : 'password'} placeholder="password" name="password" className="input input-bordered" required />
              <a><h1 onClick={() => setShowpassword(!showpassword)} className="btn btn-xs absolute right-4 top-12">{showpassword ? <FaEyeSlash /> : <FaEye />}
              </h1></a>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-accent">Login</button>
            </div>
          </form>
          <p className="text-red-500"></p>
          <h2 className="text-center">Don't have an account? <Link to={'/register'} className="text-blue-500 hover:underline">Register</Link></h2>
  
          {/* <button onClick={handleSigninwithGoogle} className="btn w-11/12 mx-auto "><FcGoogle /> Sign in with Google</button> */}
          <hr />
          <button onClick={handleSigninwithGoogle} className="btn w-11/12 mx-auto "><FcGoogle />Sign in with Google</button>
        </div>
  
      </div>
    );
  };
  
  export default Login;