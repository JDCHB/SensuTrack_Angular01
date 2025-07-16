import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';



declare var bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-navbar-usuario',
  imports: [RouterLink, HttpClientModule, NgIf, NgClass],
  templateUrl: './navbar-usuario.html',
  styleUrl: './navbar-usuario.css'
})

export class NavbarUsuario implements OnInit {

  usuario: any = {};
  discapacitado: any = {};
  loading = true;
  flipped = false;

  modalRef: any = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  toggleCard() {
    this.flipped = !this.flipped;
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  abrirModal(event: Event) {
    event.preventDefault(); // evita el comportamiento por defecto del <a href="#">
    const modalElement = document.getElementById('Perfil_Usuario');
    if (modalElement) {
      this.modalRef = new bootstrap.Modal(document.getElementById('Perfil_Usuario'));
      this.modalRef.show();

    } else {
      console.error('No se encontró el elemento del modal');
    }
  }

  obtenerDatos() {
    const userData = localStorage.getItem('user_data');
    if (!userData) {
      this.loading = false;
      return;
    }

    const user = JSON.parse(userData);
    const id = user?.id;
    if (!id) {
      this.loading = false;
      return;
    }

    this.http.get(`https://proyectomascotas.onrender.com/get_user/${id}`).subscribe({
      next: (res) => (this.usuario = res),
      error: () => (this.loading = false)
    });

    this.http.get(`https://proyectomascotas.onrender.com/get_discapacitadoV_Usuario/${id}`).subscribe({
      next: (res) => (this.discapacitado = res),
      error: () => (this.loading = false),
      complete: () => (this.loading = false)
    });
  }
}