import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { createClient } from '@supabase/supabase-js';

// COMPONENTES
import { NavbarUsuario } from '../../components/navbar-usuario/navbar-usuario';
import { Footer } from '../../components/footer/footer';


@Component({
  selector: 'app-registro-discapacitados',
  imports: [NavbarUsuario, Footer, CommonModule, FormsModule],
  templateUrl: './registro-discapacitados.html',
  styleUrl: './registro-discapacitados.css'
})
export class RegistroDiscapacitados implements OnInit {
  v_nombre = '';
  v_documento = '';
  v_genero = '';
  v_tipo_ceguera = '';
  v_id_cuidador = '';
  v_estado = true;
  archivoSeleccionado: File | null = null;
  loading = false;

  supabaseUrl = 'https://htrhxtphbszurzztjbim.supabase.co';

  supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0cmh4dHBoYnN6dXJ6enRqYmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzMzYyMjAsImV4cCI6MjA2NjkxMjIyMH0.PfXvci3rJHAfTj9ZKfH5LEygs2E4De75xxojfgZU6_E'; // Usa tu clave pública
  supabase = createClient(this.supabaseUrl, this.supabaseKey);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.v_id_cuidador = user.id;
    }
  }

  handleArchivo(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  async subirPDF(nombre: string, archivo: File): Promise<string | null> {
    const nombreArchivo = `${nombre.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.pdf`;

    const { error } = await this.supabase.storage
      .from('verificaciones')
      .upload(nombreArchivo, archivo, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (error) {
      console.error('Error al subir archivo:', error.message);
      return null;
    }

    return `${this.supabaseUrl}/storage/v1/object/public/verificaciones/${nombreArchivo}`;
  }

  async RegisterDiscapacitadoV() {
    if (!this.archivoSeleccionado) {
      Swal.fire('Error', 'Debes seleccionar un documento de verificación', 'error');
      return;
    }

    this.loading = true;

    try {
      const urlDocumento = await this.subirPDF(this.v_nombre, this.archivoSeleccionado);

      if (!urlDocumento) throw new Error('Error al subir el documento');

      const body = {
        nombre: this.v_nombre,
        documento: this.v_documento,
        id_genero_discapacitado: this.v_genero,
        id_tipo_ceguera: this.v_tipo_ceguera,
        id_cuidador: this.v_id_cuidador,
        estado: this.v_estado,
        documento_verificacion: urlDocumento,
      };

      const response = await this.http
        .post('https://proyectomascotas.onrender.com/create_discapacitadoV', body)
        .toPromise();

      Swal.fire('Registro exitoso', 'Se notificará por correo cuando se apruebe.', 'success');
    } catch (e) {
      console.error(e);
      Swal.fire('Error', 'Hubo un problema en el registro', 'error');
    } finally {
      this.loading = false;
    }
  }
}
