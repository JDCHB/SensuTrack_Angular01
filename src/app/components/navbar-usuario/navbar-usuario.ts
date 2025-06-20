import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-usuario',
  imports: [RouterLink],
  templateUrl: './navbar-usuario.html',
  styleUrl: './navbar-usuario.css'
})
export class NavbarUsuario {
  constructor(private router: Router) { }

  cerrarSesion() {
    localStorage.clear(); // O puedes usar removeItem('token') si usas solo uno
    this.router.navigate(['/']); // Redirige a la página de inicio
  }
}
