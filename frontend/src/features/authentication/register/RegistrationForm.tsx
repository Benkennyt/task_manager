import { Form, Formik } from "formik";
import { InputTemp } from "../../../custom/form/Custom";
import RegsitrationSVG from '../../../assets/svg/undraw_to_do_list_re_9nt7.svg'
import './RegistrationForm.css';
import { useEffect, useState } from "react";
import { FacebookIcon, GoogleIcon } from "../../../assets/svg/SVG";
import { signUpSchema } from "../schemas";
import { RegisterForm1 } from "../../../app/models/user";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/stores/stores";
import { register } from "../../../app/api/userSlice";

const RegistrationForm = () => {
  const [inputField, setInputField] = useState(new RegisterForm1());
  const [showPassword, setShowPassword] = useState(false);
  const {isRegisterLoading, registerData} = useSelector((state:any) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  console.log(registerData)
  useEffect(() => {
    if (registerData?.status === 201) {
      navigate('/sign-in')
    }
  }, [registerData])

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

  const registerUser = (value: any) => {
    console.log(value)
    dispatch(register(value))
  }

  return (
    <div className="register-fm">
        <div className="form-1">
            <h1 className="logo">TaskBender</h1>
            <h3>Sign Up</h3>
            <Formik
                initialValues={inputField}
                enableReinitialize
                onSubmit={(value) => {registerUser(value)} }
                validationSchema={signUpSchema}
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
                            id="firstname"
                            name="firstname" 
                            inputType="text" 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstname}
                            placeholder="First Name"
                            errors={errors}
                            touched={touched}
                        />
                        <InputTemp 
                            id="email"
                            name="email" 
                            inputType="email" 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            placeholder="Email"
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
                        <InputTemp 
                          id="confirmPassword"
                          name="confirmPassword" 
                          inputType={showPassword ? 'text': "password" }
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.confirmPassword}
                          placeholder="Confirm Password"
                          errors={errors}
                          touched={touched}
                          handlePasswordShowHide={handlePasswordShowHide}
                          showPassword={showPassword}
                        />
                        {isRegisterLoading ? <button className="sign-up-btn" type="submit">
                          <i className="fa fa-spinner fa-spin"></i>Loading...
                        </button> : <button className="sign-up-btn" type="submit">
                          Sign Up
                        </button>}
                    </Form>
                )}
            </Formik>
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
        <div className="reg-right">
            <img src={RegsitrationSVG} alt="" />
        </div>
    </div>
  )
}

export default RegistrationForm