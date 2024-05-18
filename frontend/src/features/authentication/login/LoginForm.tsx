import { Formik } from "formik"
import { InputTemp } from "../../../custom/form/Custom"
import { Form, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { FacebookIcon, GoogleIcon } from "../../../assets/svg/SVG";
import { signInSchema } from "../schemas";
import './LoginForm.css';
import LoginSVG from '../../../assets/svg/undraw_login_re_4vu2.svg'
import { LoginForm1 } from "../../../app/models/user";
import { useAppDispatch } from "../../../app/stores/stores";
import { login } from "../../../app/api/userSlice";
import { useSelector } from "react-redux";
import { ACCESS_TOKEN } from "../../../constants";


const LoginForm = () => {
  const [inputField, setInputField] = useState(new LoginForm1());
  const [showPassword, setShowPassword] = useState(false);

  const {isLoginLoading, loginData, loginErrorData} = useSelector((state:any) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
      navigate('home')
    }
  }, [loginData])
   
  const dispatch = useAppDispatch()

    const handlePasswordShowHide = () => {
    if (showPassword) {
      setShowPassword(false)
    } else{
      setShowPassword(true)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({...inputField, [e.target.name]: e.target.value}) 
  }

  const loginUser = (value: any) => {
    dispatch(login(value))
  }

  return (
    <div className="sign-in-fm">
      <div className="form-1">
            <h1 className="logo">TaskBender</h1>
            <h3>Sign In</h3>
            <Formik
                initialValues={inputField}
                enableReinitialize
                onSubmit={(value) => 
                  {loginUser(value)
                 }
                  }
                validationSchema={signInSchema}
            >
                {({ handleSubmit,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <InputTemp 
                            id="username"
                            name="username" 
                            inputType="text" 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            placeholder="Username"
                            errors={errors}
                            touched={touched}
                        />
                        <InputTemp 
                            id="password" 
                            name="password" 
                            inputType={showPassword ? 'text': "password" } 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            placeholder="Password"
                            errors={errors}
                            touched={touched}
                            handlePasswordShowHide={handlePasswordShowHide}
                            showPassword={showPassword}
                        />
                        { loginErrorData && <p className="login-err">{loginErrorData}</p>}
                        {isLoginLoading ? <button className="sign-up-btn" type="submit">
                          <i className="fa fa-spinner fa-spin"></i>Loading...
                        </button> : <button className="sign-up-btn" type="submit">
                          Sign In
                        </button>}
                    </Form>
                )}
            </Formik>
            <p className="dont-hv-acc">Don't have an account? <span onClick={() => navigate('/sign-up')}>Sign Up</span></p>
            <div className="other-signin-option">
              <button
                
                className="btn btn-transition google-btn"
              >
                <GoogleIcon />
                Google
              </button>
              <button className="btn btn-transition facebook-btn">
                <FacebookIcon />
                Facebook
              </button>
            </div>
      </div>
      <div className="sign-in-right">
        <h1>Welcome Back :)</h1>
        <p>To keep connected with us please login with your personal information by email address and password</p>
        <img src={LoginSVG} alt="login svg" />
      </div>
    </div>
  )
}

export default LoginForm