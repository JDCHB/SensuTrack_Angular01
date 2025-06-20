import { Component } from '@angular/core';
import { NavbarUsuario } from '../../components/navbar-usuario/navbar-usuario';
import { Carrousel } from '../../components/carrousel/carrousel';
import { Footer } from '../../components/footer/footer';
@Component({
  selector: 'app-usuario',
  imports: [NavbarUsuario, Carrousel, Footer],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})

export class Usuario {

  usuario = {
    nombre: 'Juan',
    apellido: 'Charris',
    correo: 'juan@example.com',
    documento: '123456789',
    telefono: '3001234567'
  };

  Discapacitado = {
    nombre: 'Andrés Pérez',
    genero: 'Masculino',
    tipoCeguera: 'Ceguera total'
  };
}
