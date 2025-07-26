import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})
export class Chatbot {
  v_sender: string = '';
  v_message: string = '';
  error: string = '';
  showChat: boolean = false;
  isTyping: boolean = false;

  mensajes: { text: string; from: 'user' | 'bot' }[] = [];

  mostrarChat(): void {
    this.showChat = !this.showChat;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.ChatBot();
    }
  }


  async ChatBot(): Promise<void> {
    if (this.v_message.trim() === '') return;

    this.mensajes.push({ text: this.v_message, from: 'user' });
    this.isTyping = true;

    try {
      const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: this.v_sender,
          message: this.v_message
        })
      });

      const data = await response.json();
      this.isTyping = false;

      if (response.ok && data.length > 0 && data[0].text) {
        this.mensajes.push({ text: data[0].text, from: 'bot' });
      } else {
        console.log('Respuesta inesperada del servidor');
      }
    } catch (e: any) {
      this.isTyping = false;
      this.error = e.message;
      console.log('Error en la solicitud: ' + this.error);

      Swal.fire({
        title: 'Error',
        text: 'Lo sentimos, ahora mismo no está activa la función de ChatBot (Solo está de manera Local)',
        icon: 'error',
        customClass: { title: 'custom-title' },
        background: 'white',
        willOpen: () => {
          const title = document.querySelector('.swal2-title') as HTMLElement;
          if (title) title.style.color = 'black';
        }
      });
    }

    this.v_message = '';
  }
}