import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/users.service';


declare const grecaptcha: any;

@Component({
  selector: 'app-iniciar-sesion',
  imports: [
    Navbar, Footer,
    FormsModule, CommonModule,
    ReactiveFormsModule, RouterLink
  ],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css'
})

export class IniciarSesion implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

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

    this.userService.loginGenerateToken({ email: correo, password: contraseña }).subscribe({
      next: (data) => {
        this.loading = false;

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
          ruta = '/Sistema-Administrativo';
        }

        Swal.fire({
          title: 'Inicio de Sesión Exitoso',
          text: mensaje,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate([ruta]);
        });
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 403) {
          Swal.fire({
            icon: 'warning',
            title: 'Cuenta Desactivada',
            text: error.error.detail || 'Tu cuenta ha sido desactivada. Contacta al soporte.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.detail || 'Usuario o Contraseña Incorrectos!',
          });
        }
      },
    });
  }
}