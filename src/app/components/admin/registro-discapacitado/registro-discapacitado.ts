import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

//SERVICIO DE DISCAPACITADO
import { DiscapacitadoService } from '../../../services/discapacitado.service';
import { GPSservice } from '../../../services/gps.service';
import { SafePipe } from '../../../services/safe-url-registroGPS.pipe';

//FORMULARIO
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//SWEET ALERT
import Swal from 'sweetalert2'

//ENVIAR CORREOS
import emailjs from 'emailjs-com';

import $ from 'jquery';
import 'datatables.net-bs5';


@Component({
  selector: 'app-registro-discapacitado',
  imports: [CommonModule, ReactiveFormsModule, SafePipe],
  templateUrl: './registro-discapacitado.html',
  styleUrl: './registro-discapacitado.css'
})
export class RegistroDiscapacitado {

  todos: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private discapacitadoService: DiscapacitadoService, private gpsSerice: GPSservice, private fb: FormBuilder) {
    emailjs.init(this.apikey);
    emailjs.init(this.apikey2);
  }

  ngOnInit(): void {
    this.discapacitadoService.getDiscapacitadosSinVerificar().subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response); // 👈 Añade esto
        this.todos = response.resultado;
        setTimeout(() => {
          ($('#myTable') as any).DataTable();
        }, 0);

      },
      error: (err) => this.error = err.message,
      complete: () => this.loading = false
    });
  }

  serviceID = 'service_r884bhj';
  templateID = 'template_w6dr1lr';
  apikey = '_i5SKyKzZVH6mFnaE';

  rechazarSolicitud(
    id: number,
    nombreDiscapacitado: string,
    Usuario_Cuidador: string,
    Nombre_Cuidador: string,
    documento: string
  ) {
    Swal.fire({
      title: `¿Rechazar solicitud de ${Nombre_Cuidador}?`,
      text: 'Esta acción eliminará al discapacitado no verificado y notificará al cuidador.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
    }).then((confirmar) => {
      if (!confirmar.isConfirmed) return;

      Swal.fire({
        title: 'Procesando...',
        text: 'Rechazando solicitud y enviando notificación',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      this.discapacitadoService.deleteDiscapacitado(id).subscribe({
        next: () => {
          emailjs.send(
            this.serviceID,
            this.templateID,
            {
              usuario_cuidador: Nombre_Cuidador,
              nombre_discapacitado: nombreDiscapacitado,
              email: Usuario_Cuidador,
              documento_discapacitado: documento,
            },
            this.apikey
          ).then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Solicitud rechazada',
              text: `Se notificó al cuidador ${Nombre_Cuidador}.`,
              confirmButtonColor: '#198754',
              confirmButtonText: 'Aceptar',
            }).then(() => {
              location.reload(); // o mejor: recargar solo la tabla
            });
          }).catch((error) => {
            console.error('Error al enviar correo:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error al enviar correo',
              text: error.text || 'Error inesperado al enviar la notificación.',
              confirmButtonColor: '#d33',
            });
          });
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error al rechazar',
            text: err.message || 'No se pudo eliminar al discapacitado.',
            confirmButtonColor: '#d33',
          });
        }
      });
    });
  }

  serviceID2 = "service_sn9rsbj";
  templateID2 = "template_wj891mo"; // REGISTRO ACEPTADO
  apikey2 = "0HqykyND9qAnGl1Va";

  aceptarSolicitud(
    id: number,
    nombreDiscapacitado: string,
    Usuario_Cuidador: string,
    Nombre_Cuidador: string,
    documento: string
  ) {
    Swal.fire({
      title: `¿Aceptar solicitud de ${Nombre_Cuidador}?`,
      text: 'Se registrará el discapacitado y se enviará un correo con sus credenciales.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar',
    }).then((confirmar) => {
      if (!confirmar.isConfirmed) return;

      Swal.fire({
        title: 'Procesando...',
        text: 'Registrando y enviando credenciales al cuidador',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const usuarioDiscapacitado = nombreDiscapacitado.toLowerCase().replace(/\s+/g, '_');
      const passwordDiscapacitado = documento.slice(-4);

      const GPSCREATE = {
        usuario: usuarioDiscapacitado,
        password: passwordDiscapacitado,
        id_ciego_vinculado: id,
        estado: true,
      }

      this.gpsSerice.create_gps(GPSCREATE).subscribe({
        next: () => {
          emailjs.send(
            this.serviceID2,
            this.templateID2,
            {
              email: Usuario_Cuidador,
              usuario_cuidador: Nombre_Cuidador,
              nombre_discapacitado: nombreDiscapacitado,
              documento_discapacitado: documento,
              Usuario_Discapacitado: usuarioDiscapacitado,
              Password_Discapacitado: passwordDiscapacitado,
            },
            this.apikey2
          ).then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Solicitud aceptada',
              text: `Se enviaron las credenciales al cuidador ${Nombre_Cuidador}.`,
              confirmButtonColor: '#198754',
            }).then(() => {
              window.location.reload(); // O mejor aún, recarga la lista
            });
          }).catch((error) => {
            console.error("Error al aceptar:", error);
            Swal.fire({
              icon: "error",
              title: "Error al aceptar",
              text: error.message,
              confirmButtonColor: "#d33",
            });
          });
        }
      });
    });
  }

  pdfUrl: string | null = null;

  mostrarModalPDF(url: string): void {
    this.pdfUrl = url;
  }

  cerrarModalPDF(): void {
    this.pdfUrl = null;
  }

}

