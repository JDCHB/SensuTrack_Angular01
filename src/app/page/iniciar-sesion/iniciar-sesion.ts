import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

declare const grecaptcha: any;

@Component({
  selector: 'app-iniciar-sesion',
  imports: [Navbar, Footer, FormsModule,
    CommonModule, ReactiveFormsModule, RouterLink
  ],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css'
})

export class IniciarSesion implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  loading = false;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(1)]],
    });

    // Inicializar reCAPTCHA
    setTimeout(() => {
      grecaptcha.render('captcha-container', {
        sitekey: '6Lf0vdUqAAAAAN51836FYzxSTExokw1cl2HB426y',
      });
    }, 0);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    this.loading = true;

    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, verifica el reCAPTCHA.',
      });
      return;
    }

    const { correo, contraseña } = this.loginForm.value;

    try {
      const response = await fetch(
        'https://proyectomascotas.onrender.com/login_generate_token',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: correo, password: contraseña }),
        }
      );

      const data = await response.json();
      this.loading = false;

      if (response.ok) {
        grecaptcha.reset();
        const { access_token, user_data } = data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('user_data', JSON.stringify(user_data));

        const rol = user_data.id_rol;
        const nombre = user_data.nombre;

        let mensaje = '';
        let ruta = '';

        if (rol === 1) {
          mensaje = `¡Bienvenido al Sistema de Administrador! ${nombre}`;
          ruta = '/Can_See_Or_Not';
        } else if (rol === 2) {
          mensaje = `¡Bienvenido al Sistema de Usuario! ${nombre}`;
          ruta = '/usuario';
        } else if (rol === 3) {
          mensaje = `¡Bienvenido al Sistema de Super Administrador! ${nombre}`;
          ruta = '/administrador';
        }

        Swal.fire({
          title: 'Inicio de Sesión Exitoso',
          text: mensaje,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate([ruta]);
        });
      } else {
        if (response.status === 403) {
          Swal.fire({
            icon: 'warning',
            title: 'Cuenta Desactivada',
            text: data.detail || 'Tu cuenta ha sido desactivada. Contacta al soporte.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.detail || 'Usuario o Contraseña Incorrectos!',
          });
        }
      }
    } catch (e) {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema con el inicio de sesión. Intenta nuevamente.',
      });
    }
  }
}
