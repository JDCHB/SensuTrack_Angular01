import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginGPS, Dispositivo_GPS, GPSEstado, ver_gps_con_Discapacitado, get_serial_bateria_GPS } from "../models/gps.model"

@Injectable({
    providedIn: 'root'
})
export class GPSservice {
    private apiUrl = 'https://proyectomascotas.onrender.com';

    constructor(private http: HttpClient) { }

    // ---------- GPS ----------

    login_GPS(data: LoginGPS): Observable<any> {
        return this.http.post(`${this.apiUrl}/login_GPS`, data);
    }

    create_gps(data: Dispositivo_GPS): Observable<any> {
        return this.http.post(`${this.apiUrl}/create_gps`, data);
    }

    get_gps(id: number): Observable<Dispositivo_GPS> {
        return this.http.get<Dispositivo_GPS>(`${this.apiUrl}/get_gps/${id}`);
    }

    get_Unidadesgps(): Observable<any> {
        return this.http.get(`${this.apiUrl}/get_Unidadesgps/`);
    }

    update_gps(id: number, data: Dispositivo_GPS): Observable<any> {
        return this.http.put(`${this.apiUrl}/update_gps/${id}`, data);
    }

    update_estado_GPS(id: number, estado: GPSEstado): Observable<any> {
        return this.http.put(`${this.apiUrl}/update_estado_GPS/${id}`, estado);
    }

    delete_gps(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete_gps/${id}`);
    }

    get_GPS_Discapacitados(): Observable<any> {
        return this.http.get(`${this.apiUrl}/get_GPS_Discapacitados/`);
    }

    get_GPS_Discapacitado(id: number): Observable<ver_gps_con_Discapacitado> {
        return this.http.get<ver_gps_con_Discapacitado>(`${this.apiUrl}/get_GPS_Discapacitado/${id}`);
    }

    get_Serial_GPS(data: get_serial_bateria_GPS): Observable<any> {
        return this.http.post(`${this.apiUrl}/get_Serial_GPS`, data);
    }
}