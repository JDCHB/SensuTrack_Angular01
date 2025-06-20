import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Carrousel } from '../../components/carrousel/carrousel';
import { Promociones } from '../../components/promociones/promociones';
import { Servicios } from '../../components/servicios/servicios';
import { Banner } from '../../components/banner/banner';
import { Footer } from '../../components/footer/footer';
@Component({
  selector: 'app-inicio',
  imports: [Navbar, Carrousel, Promociones, Servicios,
    Banner, Footer],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {

}
