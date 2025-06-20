import { Component } from '@angular/core';
import { NavbarUsuario } from '../../components/navbar-usuario/navbar-usuario';
import { Footer } from '../../components/footer/footer';


@Component({
  selector: 'app-dashboard',
  imports: [NavbarUsuario, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
