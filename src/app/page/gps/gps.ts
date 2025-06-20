import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { NavbarUsuario } from '../../components/navbar-usuario/navbar-usuario';
import { Footer } from '../../components/footer/footer';


@Component({
  selector: 'app-gps',
  imports: [NavbarUsuario, Footer],
  templateUrl: './gps.html',
  styleUrl: './gps.css'
})
export class GPS {
  modoAgregarZona: boolean = false;
  cargando: boolean = true;
  error: string | null = null;

  private map: L.Map | null = null;

  ngOnInit(): void {
    setTimeout(() => {
      this.initMap();
      this.cargando = false;
    }, 1000);
  }

  toggleAgregarZona(): void {
    this.modoAgregarZona = !this.modoAgregarZona;
  }

  private initMap(): void {
    if (this.map) return; // Evita crear el mapa más de una vez

    this.map = L.map('map').setView([4.6097, -74.0818], 13); // Bogotá, por ejemplo

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
}
