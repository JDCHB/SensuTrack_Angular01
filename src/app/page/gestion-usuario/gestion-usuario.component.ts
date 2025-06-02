import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar2Component } from '../../components/navbar2/navbar2.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ChatbotComponent } from '../../components/chatbot/chatbot.component';
@Component({
  selector: 'app-gestion-usuario',
  imports: [CommonModule, Navbar2Component,
    FooterComponent, HeaderComponent, ChatbotComponent],
  templateUrl: './gestion-usuario.component.html',
  styleUrl: './gestion-usuario.component.css'
})
export class GestionUsuarioComponent {

  loading = false;
  error = '';

  todos = [
    {
      id: 1,
      email: 'Juan@gamil.com',
      nombre: 'Juan',
      apellido: 'Charris',
      documento: '12345678',
      telefono: '123456789',
      estado: true,
    },
    {
      id: 2,
      email: 'Jesus@gmail.com',
      nombre: 'Jesus',
      apellido: 'Coronado',
      documento: '87654321',
      telefono: '987654321',
      estado: false,
    },
    {
      id: 3,
      email: 'Habib@gmail.com',
      nombre: 'Habib',
      apellido: 'Morales',
      documento: '458795548',
      telefono: '45486815186',
      estado: false,
    },
    {
      id: 4,
      email: 'Henry@gmail.com',
      nombre: 'Henry',
      apellido: 'Morales',
      documento: '12155615',
      telefono: '02123153',
      estado: false,
    }
  ];

  editar(id: number) {
    alert(`Editando al usuario con ID ${id}`);
  }

  activar(id: number) {
    const u = this.todos.find(x => x.id === id);
    if (u) u.estado = true;
  }

  desactivar(id: number) {
    const u = this.todos.find(x => x.id === id);
    if (u) u.estado = false;
  }
}

