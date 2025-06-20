import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';


@Component({
  selector: 'app-registro-user',
  imports: [Navbar, Footer, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registro-user.html',
  styleUrl: './registro-user.css'
})
export class RegistroUser {
  RegisForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.RegisForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmarPassword: ['', [Validators.required]],
      terminos: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit(): void {
    if (this.RegisForm.invalid) {
      this.RegisForm.markAllAsTouched();
      return;
    }

    const form = this.RegisForm.value;

    if (form.password !== form.confirmarPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.'
      });
      return;
    }

    Swal.fire({
      title: '¿Los datos son correctos?',
      html: `
      <strong>Nombre:</strong> ${form.nombre}<br/>
      <strong>Apellido:</strong> ${form.apellido}<br/>
      <strong>Documento:</strong> ${form.documento}<br/>
      <strong>Teléfono:</strong> ${form.telefono}<br/>
      <strong>Correo:</strong> ${form.email}
    `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrar',
      cancelButtonText: 'No, revisar'
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Tus datos fueron registrados correctamente.'
        });

        this.RegisForm.reset();
      }
    });
  }

}
