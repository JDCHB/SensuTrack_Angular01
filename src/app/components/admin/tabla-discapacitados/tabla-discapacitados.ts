import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

//SERVICIO
import { DiscapacitadoService } from '../../../services/discapacitado.service';

//FORMULARIO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

//SWEET ALERT
import Swal from 'sweetalert2'

//ENVIAR CORREOS
import emailjs from 'emailjs-com';

import $ from 'jquery';
import 'datatables.net-bs5';

@Component({
  selector: 'app-tabla-discapacitados',
  imports: [],
  templateUrl: './tabla-discapacitados.html',
  styleUrl: './tabla-discapacitados.css'
})
export class TablaDiscapacitados {
  todos: any[] = [];
  formulario!: FormGroup;
  loading: boolean = true;
  error: string | null = null;
  usuarioSeleccionadoId: number | null = null;

  @ViewChild('navListado') navListado!: ElementRef;
  @ViewChild('mostrarDiscapacitado') mostrarUsuario!: ElementRef;

  constructor(private discapacitadoService: DiscapacitadoService, private fb: FormBuilder) { }



}
