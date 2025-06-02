import { Component } from '@angular/core';

@Component({
  selector: 'app-contactenos-component',
  imports: [],
  templateUrl: './contactenos-component.component.html',
  styleUrl: './contactenos-component.component.css'
})
export class ContactenosComponentComponent {
  nombre = '';
  correo = '';
  mensaje = '';
  enviado = false;
  fecha = new Date();

  enviarFormulario(event: Event) {
    event.preventDefault(); // prevenir el envío real
    this.enviado = true;
  }
}