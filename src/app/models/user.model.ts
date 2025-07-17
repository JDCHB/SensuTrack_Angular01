export interface User {
    id?: number;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    documento: string;
    telefono: string;
    id_rol: number;
    estado: boolean;
}

export interface UpdateUser {
    id?: number;
    email: string;
    nombre: string;
    apellido: string;
    documento: string;
    telefono: string;
    estado: boolean;
}

export interface Login {
    email: string;
    password: string;
}

export interface Token {
    token: string;
}

export interface UserEstado {
    estado: boolean;
}

export interface ValidarCorreo {
    email: string;
}

export interface GoogleUser {
    id?: number;
    id_usuario?: number;
    google_id: string;
    foto: string;
    access_token: string;
    email: string;
    nombre: string;
    apellido: string;
    estado: boolean;
}

export interface LoginGoogle {
    verif_user: GoogleUser;
    user: User;
}

export interface CompletarInformacion {
    id?: number;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    documento: string;
    telefono: string;
    id_rol: number;
    estado: boolean;
}
