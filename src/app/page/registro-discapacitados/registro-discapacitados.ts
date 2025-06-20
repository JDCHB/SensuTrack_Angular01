import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// COMPONENTES
import { NavbarUsuario } from '../../components/navbar-usuario/navbar-usuario';
import { Footer } from '../../components/footer/footer';


@Component({
  selector: 'app-registro-discapacitados',
  imports: [NavbarUsuario, Footer, CommonModule, FormsModule],
  templateUrl: './registro-discapacitados.html',
  styleUrl: './registro-discapacitados.css'
})
export class RegistroDiscapacitados {
  nombre = '';
  genero = '';
  tipoCeguera = '';
  enviado = false;

  registrar(event: Event) {
    event.preventDefault();
    this.enviado = true;
  }
}
