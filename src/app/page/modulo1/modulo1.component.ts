import { Component } from '@angular/core';
import { Navbar2Component } from '../../components/navbar2/navbar2.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
@Component({
  selector: 'app-modulo1',
  imports: [Navbar2Component, FooterComponent,
    CommonModule, FormsModule, HeaderComponent, ChatbotComponent
  ],
  templateUrl: './modulo1.component.html',
  styleUrl: './modulo1.component.css'
})
export class Modulo1Component {
  nombre = '';
  genero = '';
  tipoCeguera = '';
  enviado = false;

  registrar(event: Event) {
    event.preventDefault(); // Previene recarga del formulario
    this.enviado = true;
  }
}
