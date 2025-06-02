import { Component } from '@angular/core';
import { Navbar2Component } from '../../components/navbar2/navbar2.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ServiciosComponent } from '../../components/servicios/servicios.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';

@Component({
  selector: 'app-usuario',
  imports: [Navbar2Component, FooterComponent,
    ServiciosComponent, HeaderComponent,
    ChatbotComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

}
