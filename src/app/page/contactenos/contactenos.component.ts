import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ContactenosComponentComponent } from '../../components/contactenos-component/contactenos-component.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
@Component({
  selector: 'app-contactenos',
  imports: [NavbarComponent, ContactenosComponentComponent,
    FooterComponent, HeaderComponent, ChatbotComponent
  ],
  templateUrl: './contactenos.component.html',
  styleUrl: './contactenos.component.css'
})
export class ContactenosComponent {

}
