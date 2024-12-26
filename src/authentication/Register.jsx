import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const navigate=useNavigate()

 const {registerUser,updateUserProfile}=useContext(AuthContext)
 const [error,setError]=useState('')
 
 const validatePassword = (password) => {
  const UpperCase = /[A-Z]/.test(password);
  const LowerCase = /[a-z]/.test(password);
  const MinLength = password.length >= 6;

  if (!UpperCase) return "Password must contain at least one uppercase letter.";
  if (!LowerCase) return "Password must contain at least one lowercase letter.";
  if (!MinLength) return "Password must be at least 6 characters long.";
  return "";
};
  const handleSubmit=(e)=>{
    e.preventDefault()


    const form=e.target

    const name=form.name.value
    const email=form.email.value
    const photo=form.photo.value
    const password=form.password.value
    console.log(name,email,password,photo)
    const passwordValidation = validatePassword(password);
    if (passwordValidation) {
      setError(passwordValidation);
      return;
    }
    setError("");

    registerUser(email,password)
    .then(result=>{
      if(result)
      
      updateUserProfile({
        displayName:name,
        photoURL:photo
      })
      .then(() => {
        toast.success('successfull register')
          navigate('/login')
      }).catch((error) => {
        toast.error(error.message)
      });
      

    })
    .catch(error=>{
      console.log(error.message)
    })

  }



  const [showpassword, setShowpassword] = useState(false)
  return (
    <div className="hero bg-base-200 min-h-screen">

      <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
        <h1 className="text-3xl font-bold text-center">Register now!</h1>

        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" placeholder="name" name="name" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input type="text" placeholder="Photo Url" name="photo" className="input input-bordered" required />
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
            <button className="btn btn-accent">Register</button>
          </div>
        </form>
       {error?<p className="text-red-500">{error}</p> :''} 
       <hr />


        <h2 className="text-center">already have an account? <Link to={'/login'} className="text-blue-500 hover:underline">login</Link></h2>
      </div>

    </div>
  );
};

export default Register;