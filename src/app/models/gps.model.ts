export interface LoginGPS {
    id?: number;
    usuario: string;
    password: string;
}

export interface Dispositivo_GPS {
    id?: number;
    usuario: string;
    password: string;
    id_ciego_vinculado: number;
    estado: boolean;
}

export interface GPSEstado {
    id?: number;
    estado: boolean;
}

export interface ver_gps_con_Discapacitado {
    id?: number;
    numero_serie: string;
    nombre: string;
    estado: boolean;
}

export interface get_serial_bateria_GPS {
    documento: string;
}