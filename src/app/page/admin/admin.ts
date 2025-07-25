import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistroUsu } from '../../components/admin/registro-usu/registro-usu';


@Component({
  selector: 'app-admin',
  imports: [CommonModule, RegistroUsu],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  expandido: boolean = false;
  activeSection: string = 'X'; // sección activa por defecto
  nombreUsuario: string = 'Usuario';

  @ViewChild('registerLoader') registerLoader!: ElementRef;

  constructor(private router: Router) { }

  ngOnInit(): void {
    try {
      const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
      this.nombreUsuario = userData?.nombre || 'Usuario';
    } catch {
      this.nombreUsuario = 'Usuario';
    }
  }

  showLoader(): void {
    this.registerLoader.nativeElement.style.display = 'flex';
  }

  hideLoader(): void {
    this.registerLoader.nativeElement.style.display = 'none';
  }

  expandirSidebar(): void {
    this.expandido = true;
  }

  colapsarSidebar(): void {
    this.expandido = false;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  // Secciones
  mostrarConfirmacionRegistroUsuario(): void {
    this.activeSection = 'registro_usuario';
  }

  mostrarConfirmacionReporte(): void {
    this.activeSection = 'reportes';
  }

  mostrarConfirmacionRegistroGPS(): void {
    this.activeSection = 'registro_gps';
  }

  mostrarTablaUsuarios(): void {
    this.activeSection = 'tabla_usuarios';
  }

  mostrarTablaCiegos(): void {
    this.activeSection = 'tabla_discapacitados';
  }

  mostrarRegistroRoles(): void {
    this.activeSection = 'registro_roles';
  }

  mostrarRegistroModulos(): void {
    this.activeSection = 'registro_modulos';
  }

  mostrarRegistroModuloxRol(): void {
    this.activeSection = 'modulos_por_rol';
  }

  mostrarTableroPowerBI(): void {
    this.activeSection = 'tablero';
  }

  mostrarHistorialUbicaciones(): void {
    this.activeSection = 'historial_ubicaciones';
  }

}
