import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RolesService } from '../../../services/roles.service';
import { UserService } from '../../../services/users.service';
import { Roles } from '../../../models/roles.model';

@Component({
  selector: 'app-registro-usu',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-usu.html',
  styleUrl: './registro-usu.css'
})
export class RegistroUsu implements OnInit {
  registroForm: FormGroup;
  roles: Roles[] = [];
  loading = false;

  constructor(private fb: FormBuilder, private rolesService: RolesService, private userService: UserService) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmar_password: ['', Validators.required],
      rol: ['', Validators.required],
      estado: [true]
    });
  }

  ngOnInit(): void {
    this.rolesService.getRoles().subscribe(response => {
      this.roles = response.resultado;
    });
  }

  registrarUsuario(): void {
    const form = this.registroForm.value;

    if (form.password !== form.confirmar_password) {
      Swal.fire({
        title: 'Parece que ha ocurrido un error',
        text: 'Las contraseñas no coinciden.',
        icon: 'error',
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Desea registrar un nuevo Usuario a SensuTrack!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, registrar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;

        const usuario = {
          email: form.email,
          password: form.password,
          nombre: form.nombre,
          apellido: form.apellido,
          documento: form.documento,
          telefono: form.telefono,
          id_rol: parseInt(form.rol, 10),
          estado: form.estado,
        };

        this.userService.createUser(usuario).subscribe({
          next: (data) => {
            this.loading = false;
            console.log('Respuesta recibida:', data);

            if (data.resultado === 'Usuario creado correctamente') {
              Swal.fire({
                title: `¡Registrado!, ¡Bienvenid@ ${form.nombre}!`,
                icon: 'success',
              });
              this.registroForm.reset({ estado: true });
            } else if (data.resultado === 'El usuario ya existe') {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Lo sentimos, el usuario ya existe.',
              });
            }
          },
          error: (err) => {
            this.loading = false;
            console.error(err);
            Swal.fire('Error', 'Hubo un problema al registrar el usuario.', 'error');
          },
        });
      } else {
        Swal.fire('REGISTRO CANCELADO', '', 'error');
      }
    });
  }
}
