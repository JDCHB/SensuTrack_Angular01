import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CarrouselComponent } from '../../components/carrousel/carrousel.component';
import { PromocionesComponent } from '../../components/promociones/promociones.component';
import { ServiciosComponent } from '../../components/servicios/servicios.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';

@Component({
  selector: 'app-inicio',
  imports: [NavbarComponent, HeaderComponent,
    CarrouselComponent, PromocionesComponent,
    ServiciosComponent, BannerComponent,
    FooterComponent, ChatbotComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
