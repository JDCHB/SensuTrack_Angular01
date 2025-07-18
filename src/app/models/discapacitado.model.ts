export interface DiscapacitadoV {
    id?: number;
    nombre: string;
    documento: string;
    id_genero_discapacitado: number;
    id_tipo_ceguera: number;
    id_cuidador: number;
    documento_verificacion?: string;
    estado: boolean;
}

export interface GetDiscapacitadoVUsuario {
    id?: number;
    nombre: string;
    documento: string;
    documento_verificacion_ciegos: string;
    tipo_ceguera: string;
    genero: string;
}

export interface DiscapacitadoVCompleto {
    id: number;
    nombre: string;
    documento: string;
    genero: string;
    tipo_ceguera: string;
    cuidador: string;
    estado: boolean;
}

export interface UpdateDiscapacitadoV {
    id?: number;
    nombre: string;
    documento: string;
    id_genero_discapacitado: number;
    id_tipo_ceguera: number;
    estado: boolean;
}

export interface CiegosReport {
    id?: number;
    nombre: string;
    genero: string;
    tipo_ceguera: string;
    nombre_cuidador: string;
    fecha: string;
    estado: boolean;
}

export interface CiegosReporte {
    fecha1: string;
    fecha2: string;
}

export interface DiscapacitadoEstado {
    estado: boolean;
}


// ESTO ESTABA EN CIEGOS MAP MODEL

export interface CiegosMap {
    user_id: number;
}

export interface CiegoZonaS {
    id?: number; // Opcional porque en FastAPI es None por defecto
    nombre_zona: string;
    latitud: string;
    longitud: string;
    radio: number;
    id_discapacitado: number;
    estado: boolean;
}

export interface CiegoZonaSUpdate {
    id?: number;
    nombre_zona: string;
    latitud: string;
    longitud: string;
    radio: number;
}
