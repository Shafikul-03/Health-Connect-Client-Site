import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";
import img from "../../assets/images/login.jpg";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data) => {
   // console.log(data);
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
       console.log(user);
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
       // console.log(error.message);
        setLoginError(error.message);
      });
  };

  return (
    <div className="hero w-full my-20">
      <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className="w-full h-full" src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-12">
          <h1 className="text-5xl text-center font-bold">Login</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full max-w-xs mx-auto ">
              <label className="label">
                {" "}
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                {...register("email", {
                  required: "Email Address is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs mx-auto ">
              <label className="label">
                {" "}
                <span className="label-text">Password</span>
              </label>
              <input autocomplete="off"
                type="password" 
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters or longer",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                {" "}
                <span className="label-text">Forget Password?</span>
              </label>
              {errors.password && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
              <input className="btn btn-primary " value="Login" type="submit" />
            </div>

            <div>
              {loginError && <p className="text-green-900">{loginError}</p>}
            </div>
          </form>
          <p className="mx-auto">
            New to Health Connect?{" "}
            <Link className="font-bold text-black " to="/signup">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>

   
  );
};

export default Login;
