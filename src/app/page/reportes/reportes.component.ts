import { Component } from '@angular/core';
import { Navbar2Component } from '../../components/navbar2/navbar2.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
@Component({
  selector: 'app-reportes',
  imports: [Navbar2Component, FooterComponent,
    HeaderComponent, ChatbotComponent
  ],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {

}
