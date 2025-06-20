import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/services';
import { NavbarUsuario } from '../../components/navbar-usuario/navbar-usuario';
import { Footer } from '../../components/footer/footer';

declare var $: any;

@Component({
  selector: 'app-gestion-usuarios',
  imports: [CommonModule, NavbarUsuario, Footer],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.css'
})
export class GestionUsuarios implements OnInit {
  todos: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.todos = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al obtener usuarios';
        this.loading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#usuariosTable').DataTable();
    }, 500);
  }

  editar(id: number) {
    console.log('Editar usuario:', id);
  }

  activar(id: number) {
    const user = this.todos.find(t => t.id === id);
    if (user) user.estado = true;
  }

  desactivar(id: number) {
    const user = this.todos.find(t => t.id === id);
    if (user) user.estado = false;
  }
}