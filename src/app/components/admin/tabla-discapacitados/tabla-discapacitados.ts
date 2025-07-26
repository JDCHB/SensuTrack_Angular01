import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

//SERVICIO
import { DiscapacitadoService } from '../../../services/discapacitado.service';

//FORMULARIO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//SWEET ALERT
import Swal from 'sweetalert2'

//ENVIAR CORREOS
import emailjs from 'emailjs-com';

import $ from 'jquery';
import 'datatables.net'

@Component({
  selector: 'app-tabla-discapacitados',
  imports: [CommonModule, ReactiveFormsModule],
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
  @ViewChild('MostrarDiscapacitado') mostrarUsuario!: ElementRef;

  constructor(private discapacitadoService: DiscapacitadoService, private fb: FormBuilder) {
    // emailjs.init(this.apikey);
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      documento: ['', Validators.required],
      genero: ['', Validators.required],
      tipo_ceguera: ['', Validators.required],
      cuidador: ['', Validators.required],
      estado: ['1']
    });


    this.discapacitadoService.getAllDiscapacitadosCompletos().subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response); // 👈 Añade esto
        this.todos = response.resultado;
        setTimeout(() => {
          ($('#myTable') as any).DataTable();
        }, 1);

      },
      error: (err) => this.error = err.message,
      complete: () => this.loading = false
    });
  }

  ocultar(): void {
    this.navListado.nativeElement.setAttribute('class', 'fade');
    this.mostrarUsuario.nativeElement.removeAttribute('class');
    location.reload(); // ⚠️ Evalúa si esto es necesario
  }

  editar(id: number, nombre: string): void {
    console.log("Editando a", nombre);
    this.usuarioSeleccionadoId = id;
    this.navListado.nativeElement.setAttribute('class', 'fade');
    this.mostrarUsuario.nativeElement.removeAttribute('class');

    this.discapacitadoService.getDiscapacitadoCompleto(id).subscribe({
      next: (data) => {
        this.formulario.patchValue({
          nombre: data.nombre,
          documento: data.documento,
          genero: data.documento,
          tipo_ceguera: data.tipo_ceguera,
          cuidador: data.cuidador,
          estado: data.estado ? '1' : '0'
        });
      },
      error: (err) => this.error = err.message,
      complete: () => this.loading = false
    });
  }

  //SWEET ALERT
  mostrarAlerta(icon: 'success' | 'error' | 'warning', mensaje: string, colorFondo: string): void {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      icon,
      iconColor: icon === 'success' ? '#000000' : '#ffffff',
      background: colorFondo,
      color: icon === 'success' ? 'black' : 'white',
      title: mensaje,
    });
  }


  actualizar(): void {
    if (this.usuarioSeleccionadoId === null) return;

    if (this.formulario.invalid) {
      this.mostrarAlerta('warning', 'Por favor completa todos los campos correctamente.', '#ffe066');
      return;
    }

    const valores = this.formulario.value;

    const datosActualizados = {
      nombre: valores.nombre,
      apellido: valores.apellido,
      documento: valores.documento,
      telefono: valores.telefono,
      email: valores.email,
      estado: valores.estado === '1' // Convertir a boolean
    };

    this.loading = true;

    this.discapacitadoService.getDiscapacitadoCompleto(this.usuarioSeleccionadoId).subscribe({
      next: () => {
        this.mostrarAlerta('success', 'Usuario actualizado con éxito', '#00bdff');

        setTimeout(() => {
          this.ocultar();
        }, 3000);
      },
      error: (e) => {
        console.error('Error al actualizar usuario:', e);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.message || 'Error al actualizar el usuario'
        });
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }

  // serviceID = 'service_r884bhj';
  // templateID = 'template_0fzmiop';
  // apikey = '_i5SKyKzZVH6mFnaE';

  activarUsuario(id: number, nombre: string, email: string): void {
    const nuevoEstado = { estado: true };

    this.discapacitadoService.updateEstadoDiscapacitado(id, nuevoEstado).subscribe({
      next: (response) => {
        if (response.mensaje === "Estado del Discapacitado actualizado exitosamente") {
          // emailjs.send(this.serviceID, this.templateID, {
          //   nombre_usuario: nombre,
          //   email: email,
          //   estado: 'activada',
          // });

          this.mostrarAlerta('success', 'El discapacitado se ha activado de manera exitosa', '#76fa78');

          setTimeout(() => location.reload(), 3500);
        } else {
          this.mostrarAlerta('error', 'LO SENTIMOS, HA OCURRIDO UN ERROR', '#fa7676');
        }
      },
      error: (error) => {
        this.mostrarAlerta('error', error.message || 'Error desconocido al activar', '#ff5b5b');
      },
    });
  }

  desactivarUsuario(id: number, nombre: string, email: string): void {
    const nuevoEstado = { estado: false };

    this.discapacitadoService.updateEstadoDiscapacitado(id, nuevoEstado).subscribe({
      next: (response) => {
        if (response.mensaje === "Estado del Discapacitado actualizado exitosamente") {
          // emailjs.send(this.serviceID, this.templateID, {
          //   nombre_usuario: nombre,
          //   email: email,
          //   estado: 'desactivada',
          // });

          this.mostrarAlerta('success', 'El discapacitado ha sido desactivado exitosamente', '#ff4e4e');

          setTimeout(() => location.reload(), 3500);
        } else {
          this.mostrarAlerta('error', 'LO SENTIMOS, HA OCURRIDO UN ERROR', '#fa7676');
        }
      },
      error: (error) => {
        this.mostrarAlerta('error', error.message || 'Error desconocido al desactivar', '#ff5b5b');
      },
    });
  }
}
