import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import Swal, { SweetAlertResult } from 'sweetalert2';
import emailjs from 'emailjs-com';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { UserService } from '../../services/users.service';

declare const grecaptcha: any;

@Component({
  selector: 'app-registro-user',
  imports: [Navbar, Footer, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registro-user.html',
  styleUrl: './registro-user.css'
})
export class RegistroUser implements OnInit {
  RegisForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  codigoGenerado = '';
  verificado = false;
  loading = false;

  serviceID = 'service_j9bousa';
  templateID = 'template_e735fno';
  apiKey = 'dFD1OdFitzwQblEX0';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.RegisForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmarPassword: ['', [Validators.required]],
      terminos: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      grecaptcha.render('captcha-container', {
        sitekey: '6Lf0vdUqAAAAAN51836FYzxSTExokw1cl2HB426y',
      });
    }, 0);
  }

  togglePassword(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  async enviarCodigoEmail(correo: string, codigo: string) {
    const templateParams = { email: correo, r: codigo };

    try {
      await emailjs.send(this.serviceID, this.templateID, templateParams, this.apiKey);
      return true;
    } catch (error) {
      console.error('Error al enviar correo:', error);
      return false;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.RegisForm.invalid) {
      this.RegisForm.markAllAsTouched();
      return;
    }

    const form = this.RegisForm.value;

    if (form.password !== form.confirmarPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
      });
      return;
    }

    // Verificación de correo
    this.codigoGenerado = Math.random().toString(36).slice(2, 8).toUpperCase();
    const enviado = await this.enviarCodigoEmail(form.email, this.codigoGenerado);

    if (!enviado) {
      Swal.fire('Error', 'No se pudo enviar el correo de verificación', 'error');
      return;
    }

    while (!this.verificado) {
      const result: SweetAlertResult<string> = await Swal.fire({
        title: '🔐 Verificación de Correo',
        text: 'Ingresa el código de 6 caracteres que fue enviado a tu correo.',
        input: 'text',
        inputAttributes: {
          maxlength: '6',
          placeholder: 'CÓDIGO EN MAYÚSCULAS',
        },
        showCancelButton: true,
        confirmButtonText: '✅ Verificar',
        cancelButtonText: '❌ Cancelar',
        allowOutsideClick: false,
        showLoaderOnConfirm: true,
        preConfirm: (input) => {
          if (!input) Swal.showValidationMessage('⚠️ Debes ingresar un código.');
        },
      });

      const codigoIngresado = result.value;
      const isDismissed = result.isDismissed;

      if (isDismissed) {
        Swal.fire('Verificación cancelada', 'No se completó el registro', 'info');
        return;
      }

      if (codigoIngresado === this.codigoGenerado) {
        this.verificado = true;
        await Swal.fire('¡Código correcto!', 'Tu correo ha sido verificado', 'success');
      } else {
        await Swal.fire('Código incorrecto', 'Intenta nuevamente', 'error');
      }
    }

    // Verificar reCAPTCHA
    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, verifica el reCAPTCHA.',
      });
      return;
    }

    // Confirmar registro
    const confirmar = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Desea registrarse a SensuTrack!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, registrarse!',
    });

    if (!confirmar.isConfirmed) {
      Swal.fire('Registro cancelado', '', 'info');
      return;
    }

    // Enviar al backend usando UserService
    this.loading = true;
    this.userService.createUser({
      nombre: form.nombre,
      apellido: form.apellido,
      documento: form.documento,
      telefono: form.telefono,
      email: form.email,
      password: form.password,
      id_rol: 2,
      estado: true,
    }).subscribe({
      next: async () => {
        this.loading = false;
        grecaptcha.reset();

        await Swal.fire({
          title: `¡Registrado! ¡Bienvenido ${form.nombre}!`,
          icon: 'success',
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        this.RegisForm.reset();
      },
      error: (error) => {
        this.loading = false;
        grecaptcha.reset();
        Swal.fire('Error en el registro', error.error?.detail || 'Ocurrió un error inesperado', 'error');
      },
    });
  }
}
