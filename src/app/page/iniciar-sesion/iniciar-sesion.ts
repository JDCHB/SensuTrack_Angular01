import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-iniciar-sesion',
  imports: [Navbar, Footer, FormsModule,
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css'
})
export class IniciarSesion {
  LoginForm: FormGroup;
  showPassword = false;
  loading = false;


  constructor(private fb: FormBuilder, private router: Router) {
    this.LoginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  VisibilidadPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.loading = true;

    setTimeout(() => {
      const { correo, contraseña } = this.LoginForm.value;

      const correoValido = "Juan@gmail.com";
      const contraseñaValida = "123456";

      if (correo == correoValido && contraseña == contraseñaValida) {
        localStorage.setItem('usuario', JSON.stringify({ correo }));
        this.router.navigate(['/usuario']);
      } else {
        alert("Correo o Contraseña incorrectos.")
      }

      this.loading = false;
    }, 1500);
  }

}
