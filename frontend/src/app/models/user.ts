export interface ILoginForm1 {
    username: string,
    password: string,
}

export class LoginForm1 implements ILoginForm1 {
    username: string = "";
    password: string = "";
}

export interface IRegisterForm {
    username: string,
    firstname: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export class RegisterForm1 implements IRegisterForm {
    username: string ="";
    firstname: string ="";
    email: string ="";
    password: string ="";
    confirmPassword: string ="";
}

export interface UserDetails {
    email: string,
    username: string,
    first_name: string,
    is_Active: boolean,
    is_Staff: boolean,
}

// export interface IinitialState {
//     isLoggedin: boolean,
//     isLoginLoading:boolean,
//     isRegisterLoading:boolean,
//     loginData: UserDetails,
//     registerData:UserDetails,
//     isErrorLogin:boolean,
//     loginErrorData: string,
//     isErrorRegister:boolean,
// }
