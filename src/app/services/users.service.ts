import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://proyectomascotas.onrender.com';

    constructor(private http: HttpClient) { }

    // Crear un nuevo usuario
    createUser(user: User): Observable<any> {
        return this.http.post(`${this.apiUrl}/create_user`, user);
    }

    // Obtener todos los usuarios
    getUsers(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/get_users`);
    }


    // Actualizar un usuario
    updateUser(user_id: number, user: User): Observable<any> {
        return this.http.put(`${this.apiUrl}/update_user/${user_id}`, user);
    }

    //Actualiza estado de un usuario
    updateEstadoUser(user_id: number, user: User): Observable<any> {
        return this.http.put(`${this.apiUrl}/update_estado_user/${user_id}`, user);
    }



}
