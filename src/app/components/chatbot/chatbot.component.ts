import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-chatbot',
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  v_sender = '';
  v_message = '';
  error = '';
  showChat = false;
  mensajes: { text: string; from: 'user' | 'bot' }[] = [];
  isTyping = false;

  mostrarChat() {
    this.showChat = !this.showChat;
  }

  async ChatBot() {
    if (this.v_message.trim() === '') return;

    this.mensajes.push({ text: this.v_message, from: 'user' });
    this.isTyping = true;

    try {
      const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: this.v_sender, message: this.v_message }),
      });

      if (response.ok) {
        const data = await response.json();
        this.isTyping = false;

        if (data.length > 0 && data[0].text) {
          this.mensajes.push({ text: data[0].text, from: 'bot' });
        }
      } else {
        this.isTyping = false;
        console.error('Error al obtener respuesta del chatbot.');
      }
    } catch (e: any) {
      this.isTyping = false;
      this.error = e.message;
      console.error('Error en la solicitud: ' + this.error);
      Swal.fire({
        title: 'Error',
        text: 'Lo sentimos, ahora mismo no está activa la función de ChatBot (Solo está de manera Local)',
        icon: 'error',
        background: 'white',
        customClass: { title: 'custom-title' },
        willOpen: () => {
          const title = document.querySelector('.swal2-title') as HTMLElement;
          if (title) title.style.color = 'black';
        }
      });
    }

    this.v_message = '';
  }
}