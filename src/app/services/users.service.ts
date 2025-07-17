import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, UpdateUser, Login, Token, UserEstado, ValidarCorreo, GoogleUser, LoginGoogle, CompletarInformacion } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://proyectomascotas.onrender.com';

    constructor(private http: HttpClient) { }

    // 🔐 Login con generación de token
    loginGenerateToken(user: Login): Observable<any> {
        return this.http.post(`${this.apiUrl}/login_generate_token`, user);
    }

    // 🔐 Verificar token
    verifyToken(token: Token): Observable<any> {
        return this.http.post(`${this.apiUrl}/verify_token`, token);
    }

    // 🔐 Login normal
    login(user: Login): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, user);
    }

    // 👤 Crear usuario
    createUser(user: User): Observable<any> {
        return this.http.post(`${this.apiUrl}/create_user`, user);
    }

    // 📤 Cargue masivo (multipart/form-data)
    createUsuarioMasivo(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.apiUrl}/create_usuario_masivo`, formData);
    }

    // 👁‍🗨 Obtener un usuario
    getUser(user_id: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/get_user/${user_id}`);
    }

    // 📋 Obtener todos los usuarios
    getUsers(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/get_users`);
    }

    // 🛠 Actualizar usuario (normal)
    updateUser(user_id: number, user: User): Observable<any> {
        return this.http.put(`${this.apiUrl}/update_user/${user_id}`, user);
    }

    // 🛠 Actualizar usuario (admin)
    updateUserAdmin(user_id: number, user: UpdateUser): Observable<any> {
        return this.http.put(`${this.apiUrl}/update_user_admin/${user_id}`, user);
    }

    // ✅ Cambiar estado
    updateEstadoUser(user_id: number, user: UserEstado): Observable<any> {
        return this.http.put(`${this.apiUrl}/update_estado_user/${user_id}`, user);
    }

    // ❌ Eliminar usuario
    deleteUser(user_id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete_user/${user_id}`);
    }

    // ✅ Validar correo
    validarCorreo(user: ValidarCorreo): Observable<any> {
        return this.http.post(`${this.apiUrl}/Validar_Correo`, user);
    }

    // 🔐 Actualizar contraseña
    updatePassword(user: Login): Observable<any> {
        return this.http.put(`${this.apiUrl}/update_contraseña`, user);
    }

    // 🔐 Verificar Google User
    verificarGoogleUser(user: GoogleUser): Observable<any> {
        return this.http.post(`${this.apiUrl}/Verificar_Google_User`, user);
    }

    // 🧾 Completar información
    completarInformacion(user_id: number, user: CompletarInformacion): Observable<any> {
        return this.http.put(`${this.apiUrl}/Completar_Informacion/${user_id}`, user);
    }
}