import { Field, Form, Formik } from 'formik'
import './Security.css'

const Security = (props: any) => {
    const {openSecuritySection} = props

  return (
    <div className={openSecuritySection === 'true' ? "security-settings-container settings-show" : openSecuritySection === 'false' ? "security-settings-container settings-hide" : 'inactive-section'}>
        <div className="password-change">
            <h4>Password</h4>
            <Formik
                initialValues={{currentPassword: "", newPassword: "", confirmNewPassword: ""}}
                onSubmit={ (values) => {
                 console.log(values)}}
              >
                {({ handleSubmit, handleBlur, handleChange, values }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <div className="change-pass-field current-pass">
                            <h5>Current Password</h5>
                            <div className="input-container">
                                <Field
                                    id="currentPassword"
                                    type="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.currentPassword}
                                    name="currentPassword" 
                                />
                            </div>
                        </div>

                        <div className="change-pass-field">
                            <h5>New Password</h5>
                            <div className="input-container">
                                <Field
                                    id="newPassword"
                                    type={'password'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.newPassword}
                                    name="newPassword" 
                                />
                               
                            </div>
                        </div>

                        <div className="change-pass-field">
                            <h5>Confirm New Password</h5>
                            <div className="input-container">
                                <Field
                                    id="confirmNewPassword"
                                    type={"password"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.newPassword}
                                    name="confirmNewPassword" 
                                />
                         
                            </div>
                        </div>
                        <button className="btn-transparent btn-transition change-password-btn" type="submit"
                        >
                        Change password
                        </button>
                    </Form>
                )}
            </Formik>
        </div>

        <div className="email-details">
            <h4>Email</h4>
            <div className="current-email">
                <h5>
                    Current email
                </h5>
                <p>kekek@d.com</p>
            </div>
            <div className="status">
                <h5>
                    Status
                </h5>
                <p>Confirmed</p>
            </div>

            <div className="change-email">
                <h4>Change email</h4>
                <Formik
                initialValues={{newEmail: " ", password: " "}}
                onSubmit={ (values) => {
                 console.log(values)}}
              >
                {({ handleSubmit, handleBlur, handleChange, values }) => (
                    <Form onSubmit={handleSubmit} autoComplete ='off'>
                        <div className="change-email-field ">
                            <h5>New email</h5>
                            <div className="input-container">
                                <Field
                                    id="newEmail"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.newEmail}
                                    name="newEmail" 
                                />
                            </div>
                        </div>

                        <div className="change-email-field">
                            <h5>Password</h5>
                            <div className="input-container">
                                <Field
                                    id="password"
                                    type={"password"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    name="password" 
                                />
                            </div>
                        </div>
                        <button className="btn-transparent btn-transition change-password-btn" type="submit"
                        >
                        Change email
                        </button>
                    </Form>
                )}
            </Formik>
            </div>
        </div>

    </div>
  )
}

export default Security