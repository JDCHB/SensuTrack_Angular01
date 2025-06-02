import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Navbar2Component } from '../../components/navbar2/navbar2.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';

@Component({
  selector: 'app-modulo2',
  imports: [Navbar2Component, FooterComponent, ChatbotComponent],
  templateUrl: './modulo2.component.html',
  styleUrl: './modulo2.component.css'
})
export class Modulo2Component implements OnInit {
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
