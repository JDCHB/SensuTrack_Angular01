import { Component, OnInit } from '@angular/core';

//FORMULARIO
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

//SWEET ALERT
import Swal from 'sweetalert2';

//GUARDAR ARCHIVOS EN SUPABASE
import { createClient } from '@supabase/supabase-js';

// COMPONENTES
import { NavbarUsuario } from '../../components/navbar-usuario/navbar-usuario';
import { Footer } from '../../components/footer/footer';

//SERVICIO
import { DiscapacitadoService } from '../../services/discapacitado.service';


@Component({
  selector: 'app-registro-discapacitados',
  imports: [
    NavbarUsuario, Footer,
    CommonModule, FormsModule,
    ReactiveFormsModule],
  templateUrl: './registro-discapacitados.html',
  styleUrl: './registro-discapacitados.css'
})
export class RegistroDiscapacitados implements OnInit {

  discapacitadoForm: FormGroup;
  archivoSeleccionado: File | null = null;
  loading = false;
  v_id_cuidador: number = 0;
  registerLoader: HTMLElement | null = null;

  constructor(private fb: FormBuilder, private discapacitadoService: DiscapacitadoService) {
    this.discapacitadoForm = this.fb.group({
      nombre: ['', Validators.required],
      documento: ['', Validators.required],
      id_genero_discapacitado: ['', Validators.required],
      id_tipo_ceguera: ['', Validators.required],
    });
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.v_id_cuidador = Number(user.id);
    }

    this.registerLoader = document.getElementById('register-loader');
  }

  handleArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    this.archivoSeleccionado = input.files?.[0] ?? null;
  }

  private supabaseUrl = 'https://htrhxtphbszurzztjbim.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0cmh4dHBoYnN6dXJ6enRqYmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMzYyMjAsImV4cCI6MjA2NjkxMjIyMH0.PfXvci3rJHAfTj9ZKfH5LEygs2E4De75xxojfgZU6_E';
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  async subirPDF(nombreDiscapacitado: string, archivo: File): Promise<string | null> {
    if (!archivo || archivo.type !== 'application/pdf') {
      console.error('Archivo inválido o no es un PDF.');
      return null;
    }

    const nombreSanitizado = nombreDiscapacitado
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');

    const nombreArchivo = `${nombreSanitizado}_${Date.now()}.pdf`;

    const { error } = await this.supabase.storage
      .from('verificaciones')
      .upload(nombreArchivo, archivo, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (error) {
      console.error('Error al subir el archivo:', error.message);
      return null;
    }

    return `https://htrhxtphbszurzztjbim.supabase.co/storage/v1/object/public/verificaciones/${nombreArchivo}`;
  }

  async onSubmit() {
    if (this.discapacitadoForm.invalid || !this.archivoSeleccionado) {
      Swal.fire(
        'Campos incompletos',
        'Por favor completa todos los campos y selecciona un archivo PDF.',
        'warning'
      );
      return;
    }

    this.loading = true;

    const form = this.discapacitadoForm.value;
    const urlDocumento = await this.subirPDF(form.nombre, this.archivoSeleccionado);

    if (!urlDocumento) {
      this.loading = false;
      Swal.fire('Error', 'No se pudo subir el documento', 'error');
      return;
    }

    this.discapacitadoService.createDiscapacitado({
      nombre: form.nombre,
      documento: form.documento,
      id_genero_discapacitado: form.id_genero_discapacitado,
      id_tipo_ceguera: form.id_tipo_ceguera,
      id_cuidador: this.v_id_cuidador,
      estado: true,
      documento_verificacion: urlDocumento,
    }).subscribe({
      next: async () => {
        this.loading = false;
        await Swal.fire({
          title: `¡Registro exitoso de ${form.nombre}!`,
          text: 'Se te notificará por correo si se aprueba la solicitud',
          icon: 'success',
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        this.discapacitadoForm.reset();
      },
      error: (error) => {
        this.loading = false;
        Swal.fire(
          'Error en el registro',
          error.error?.detail || 'Ocurrió un error inesperado',
          'error'
        );
      },
    });
  }
}
