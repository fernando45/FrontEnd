import { User } from '../pages/usuarios/usuario.interface';

export interface LoginResult {
    status: boolean;
    message: string;
    token?: string;
    user?: User;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterResult {
    status: boolean;
    message: string;
    user?: User;
}

export interface RegisterData {
    nombre: string;
    email: string;
    password: string;
}


