import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-inicio-sesion',
  imports: [RouterLink, NavbarComponent,
    FooterComponent, HeaderComponent,
    ChatbotComponent],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {

}
