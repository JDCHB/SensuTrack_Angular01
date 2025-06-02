import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PreguntasFrecuentesComponentComponent } from '../../components/preguntas-frecuentes-component/preguntas-frecuentes-component.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
@Component({
  selector: 'app-preguntas-frecuentes',
  imports: [NavbarComponent, FooterComponent,
    PreguntasFrecuentesComponentComponent, HeaderComponent, ChatbotComponent
  ],
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrl: './preguntas-frecuentes.component.css'
})
export class PreguntasFrecuentesComponent {

}
