


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

export interface Checked{
    todo_column?: boolean, 
    overdue_column?: boolean,
    inprogress_column?: boolean
}

export interface IBoardForm {
    name: string,
    checked: Checked[]
    nip:string

}

export class BoardForm implements IBoardForm {
    name: string= '';
    checked: [] = [];
    nip: string = '';
}

export interface Subtask {
    subtask: string;
  }

export interface InitialValues {
    name: string;
    status: string;
    description: string;
    subtaskList: { subtask: string }[];
    boardID: string;
    status2: string;
}


export class InitialValues1 implements InitialValues {
    name: string = '';
    status: string = '';
    description: string = '';
    subtaskList: { subtask: string }[] = [];
    boardID: string = '';
    status2: string = '';
}

export interface InitialValues2 {
    name: string;
}

