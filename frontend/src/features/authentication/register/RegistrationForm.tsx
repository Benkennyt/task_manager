import { Form, Formik } from "formik";
import { InputTemp } from "../../../custom/form/Custom";
import RegsitrationSVG from '../../../assets/svg/undraw_to_do_list_re_9nt7.svg'
import './RegistrationForm.css';
import { useEffect, useState } from "react";
import { signUpSchema } from "../schemas";
import { RegisterForm1 } from "../../../app/models/user";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/stores/stores";
import { register } from "../../../app/api/userSlice";
import { ACCESS_TOKEN } from "../../../constants";

const RegistrationForm = () => {
  const [inputField, setInputField] = useState(new RegisterForm1());
  const [passwordType, setPasswordType] = useState('');
  const {isRegisterLoading, registerErrorData} = useSelector((state:any) => state.user)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const bankendErrorUsername = registerErrorData && registerErrorData?.username &&  registerErrorData?.username[0]
  const bankendErrorEmail = registerErrorData &&  registerErrorData?.email && registerErrorData?.email[0]

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token){
      navigate('home')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({...inputField, [e.target.name]: e.target.value}) 
  }

  const registerUser = (value: any) => {
    dispatch(register(value)).
    then((res) => {
      if (res.payload.status === 201){
        navigate('/sign-in')
      }
    })
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
                validateOnChange
                validateOnBlur
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
                            bckenderr={bankendErrorUsername}
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
                            bckenderr={bankendErrorEmail}
                        />
                        <InputTemp 
                            id="password" 
                            name="password" 
                            inputType={passwordType === 'password' ? 'text': "password" } 
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            placeholder="Password"
                            errors={errors}
                            touched={touched}
                            setPasswordType={setPasswordType}
                            passwordType={passwordType}
                        />
                        <InputTemp 
                          id="confirmPassword"
                          name="confirmPassword" 
                          inputType={passwordType === 'confirmPassword' ? 'text': "password" }
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.confirmPassword}
                          placeholder="Confirm Password"
                          errors={errors}
                          touched={touched}
                          setPasswordType={setPasswordType}
                          passwordType={passwordType}
                        />
                        {isRegisterLoading ? <button disabled className="sign-up-btn1" type="submit">
                          <i className="fa fa-spinner fa-spin"></i>Loading...
                        </button> : <button className="sign-up-btn1" type="submit">
                          Sign Up
                        </button>}
                    </Form>
                )}
            </Formik>
            <p className="already-hv-acc">Already have an account? <span onClick={() => navigate('/sign-in')} >Sign In</span></p>
        </div>
        <div className="reg-right">
          <img src={RegsitrationSVG} alt="registration svg" />
        </div>
    </div>
  )
}

export default RegistrationForm