import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Roles, Actualizar_Estado_Rol } from "../models/roles.model"

@Injectable({
    providedIn: 'root'
})
export class RolesService {
    private apiUrl = 'https://proyectomascotas.onrender.com';

    constructor(private http: HttpClient) { }

    // ---------- ROLES ----------

    createRol(rol: Roles): Observable<any> {
        return this.http.post(`${this.apiUrl}/create_rol`, rol);
    }

    getRol(rol_id: number): Observable<Roles> {
        return this.http.get<Roles>(`${this.apiUrl}/get_rol/${rol_id}`);
    }

    updateRol(rol_id: number, rol: Roles): Observable<any> {
        return this.http.put(`${this.apiUrl}/update_rol/${rol_id}`, rol);
    }

    getRoles(): Observable<{ resultado: Roles[] }> {
        return this.http.get<{ resultado: Roles[] }>(`${this.apiUrl}/get_roles/`);
    }


    deleteRol(rol_id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete_rol/${rol_id}`);
    }

    updateEstadoRol(rol_id: number, data: Actualizar_Estado_Rol): Observable<any> {
        return this.http.put(`${this.apiUrl}/update_estado_rol/${rol_id}`, data);
    }

}