import { Component } from '@angular/core';
import { NavbarUsuario } from '../../components/navbar-usuario/navbar-usuario';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-reportes',
  imports: [NavbarUsuario, Footer],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class Reportes {

}
