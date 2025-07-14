import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ✅ IMPORTA ESTO
import { NavbarUsuario } from '../../components/navbar-usuario/navbar-usuario';
import { Footer } from '../../components/footer/footer';
import { UserService } from '../../services/users.service';

declare var $: any;

@Component({
  standalone: true,
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.css',
  imports: [ // ✅ AGREGA HttpClientModule AQUÍ
    CommonModule,
    HttpClientModule,
    NavbarUsuario,
    Footer
  ]
})
export class GestionUsuarios implements OnInit {
  todos: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private userservice: UserService) { }

  ngOnInit(): void {
    this.userservice.getUsers().subscribe({
      next: (data) => {
        this.todos = data.usuarios;
        this.loading = false;

        // Espera y luego carga DataTable (solo si tienes muchos datos o jQuery)
        setTimeout(() => {
          if ($.fn.dataTable.isDataTable('#usuariosTable')) {
            $('#usuariosTable').DataTable().destroy();
          }
          $('#usuariosTable').DataTable();
        }, 100);
      },
      ...
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
