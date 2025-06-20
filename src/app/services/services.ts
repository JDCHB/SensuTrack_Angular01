import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    private usuarios = [
        { id: 1, email: 'juan@gmail.com', nombre: 'Juan', apellido: 'Charris', documento: '123456789', telefono: '3101234567', estado: true },
        { id: 2, email: 'Henry@gmail.com', nombre: 'Henry', apellido: 'Romero', documento: '987654321', telefono: '3117654321', estado: false },
        { id: 3, email: 'Jesus@gmail.com', nombre: 'Jesus', apellido: 'Coronado', documento: '456123789', telefono: '3123456789', estado: true },
        { id: 4, email: 'Habib@gmail.com', nombre: 'Habib', apellido: 'Morales', documento: '321654987', telefono: '3134567890', estado: true },
        { id: 5, email: 'pedro@gmail.com', nombre: 'Pedro', apellido: 'Gómez', documento: '789456123', telefono: '3145678901', estado: false },
        { id: 6, email: 'maria@gmail.com', nombre: 'María', apellido: 'Hernández', documento: '147258369', telefono: '3156789012', estado: true },
        { id: 7, email: 'andres@gmail.com', nombre: 'Andrés', apellido: 'Castro', documento: '963852741', telefono: '3167890123', estado: false },
        { id: 8, email: 'sofia@gmail.com', nombre: 'Sofía', apellido: 'Moreno', documento: '852369741', telefono: '3178901234', estado: true },
        { id: 9, email: 'diego@gmail.com', nombre: 'Diego', apellido: 'Ruiz', documento: '369741258', telefono: '3189012345', estado: true },
        { id: 10, email: 'camila@gmail.com', nombre: 'Camila', apellido: 'Silva', documento: '753159486', telefono: '3190123456', estado: false },
        { id: 11, email: 'julian@gmail.com', nombre: 'Julián', apellido: 'Rojas', documento: '159753486', telefono: '3201234567', estado: true },
        { id: 12, email: 'valentina@gmail.com', nombre: 'Valentina', apellido: 'Jiménez', documento: '456789123', telefono: '3212345678', estado: true },
        { id: 13, email: 'sebastian@gmail.com', nombre: 'Sebastián', apellido: 'Ortiz', documento: '654987321', telefono: '3223456789', estado: false },
        { id: 14, email: 'diana@gmail.com', nombre: 'Diana', apellido: 'Vargas', documento: '741852963', telefono: '3234567890', estado: true },
        { id: 15, email: 'mateo@gmail.com', nombre: 'Mateo', apellido: 'Torres', documento: '987321654', telefono: '3245678901', estado: true }
    ];


    constructor() { }

    getUsuarios(): Observable<any[]> {
        return of(this.usuarios); // Simula una llamada HTTP (TENGO QUE INVESTIGARLO MEJOR)
    }
}
