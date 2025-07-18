import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DiscapacitadoV, GetDiscapacitadoVUsuario, DiscapacitadoVCompleto, UpdateDiscapacitadoV, CiegosReport, CiegosReporte, DiscapacitadoEstado, CiegosMap, CiegoZonaS, CiegoZonaSUpdate } from '../models/discapacitado.model';

@Injectable({
    providedIn: 'root'
})
export class DiscapacitadoService {
    private apiUrl = 'https://proyectomascotas.onrender.com';

    constructor(private http: HttpClient) { }

    // ---------- DISCAPACITADOS ----------

    createDiscapacitado(disc: DiscapacitadoV): Observable<any> {
        return this.http.post(`${this.apiUrl}/create_discapacitadoV`, disc);
    }

    getDiscapacitado(id: number): Observable<DiscapacitadoV> {
        return this.http.get<DiscapacitadoV>(`${this.apiUrl}/get_discapacitadoV/${id}`);
    }

    getDiscapacitadoUsuario(id: number): Observable<GetDiscapacitadoVUsuario> {
        return this.http.get<GetDiscapacitadoVUsuario>(`${this.apiUrl}/get_discapacitadoV_Usuario/${id}`);
    }

    getDiscapacitadoCompleto(id: number): Observable<DiscapacitadoVCompleto> {
        return this.http.get<DiscapacitadoVCompleto>(`${this.apiUrl}/get_discapacitadoV_Completo/${id}`);
    }

    getAllDiscapacitados(): Observable<any> {
        return this.http.get(`${this.apiUrl}/get_discapacitadosV`);
    }

    getAllDiscapacitadosCompletos(): Observable<any> {
        return this.http.get(`${this.apiUrl}/get_discapacitadosVCOMPLETOS`);
    }

    getDiscapacitadosSinVerificar(): Observable<any> {
        return this.http.get(`${this.apiUrl}/get_discapacitadosV_SIN_VERIFICAR`);
    }

    getDiscapacitadosSinGPS(): Observable<any> {
        return this.http.get(`${this.apiUrl}/get_discapacitadosV_SIN_GPS`);
    }

    getGeneroTipoCeguera(discapacitado_id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/get_Genero_TipoCeguera_discapacitados/${discapacitado_id}`);
    }

    updateDiscapacitado(id: number, data: UpdateDiscapacitadoV): Observable<any> {
        return this.http.put(`${this.apiUrl}/update_discapacitadoV/${id}`, data);
    }

    updateEstadoDiscapacitado(id: number, estado: DiscapacitadoEstado): Observable<any> {
        return this.http.put(`${this.apiUrl}/update_estado_discapacitado/${id}`, estado);
    }

    deleteDiscapacitado(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete_discapacitadoV/${id}`);
    }

    // ---------- ZONA SEGURA ----------

    createZonaSegura(zona: CiegoZonaS): Observable<any> {
        return this.http.post(`${this.apiUrl}/create_Zona_Segura`, zona);
    }

    getZonaSeguraPorDiscapacitado(id: number): Observable<CiegoZonaS[]> {
        return this.http.get<CiegoZonaS[]>(`${this.apiUrl}/get_Zona_Segura/${id}`);
    }

    updateZonaSegura(id: number, zona: CiegoZonaSUpdate): Observable<any> {
        return this.http.put(`${this.apiUrl}/update_Zona_Segura/${id}`, zona);
    }

    deleteZonaSegura(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete_Zona_Segura/${id}`);
    }

    // ---------- REPORTES / MAPA ----------

    generarReporteCiegos(data: CiegosReporte): Observable<any> {
        return this.http.post(`${this.apiUrl}/Ciegos_Report`, data);
    }

    Discapacitado_Mapa(data: CiegosMap): Observable<any> {
        return this.http.post(`${this.apiUrl}/Ciegos_Map`, data);
    }
}
