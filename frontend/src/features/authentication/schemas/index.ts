import * as yup from 'yup';


const nameRules = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.


export const signUpSchema = yup.object().shape({
    firstname: yup.string()
    .required('Please enter your first name.')
    .matches(nameRules, 'Please enter a valid name.')
    .max(20, 'Name is too long.'),

    username: yup.string()
    .required('Please enter your username name.')
    .max(20, 'Name is too long.'),

    email: yup.string()
    .required('Please enter your email address.')
    .email('Please enter a valid email.'),

    password: yup.string()
    .matches(passwordRules, { message: "Please create a stronger password." })
    .required("Please enter a password."),

    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match.')

});

export const signInSchema = yup.object().shape({
    username: yup.string()
    .required('Please enter your username name.')
    .max(20, 'Name is too long.'),

    password: yup.string()
    .required("Please enter a password."),

});




