import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarUsuario } from '../../components/navbar-usuario/navbar-usuario';
import { Footer } from '../../components/footer/footer';


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

  ngOnInit(): void {
    setTimeout(() => {
      try {
        this.todos = [
          {
            id: 1,
            email: 'juan@gmail.com',
            nombre: 'Juan',
            apellido: 'Pérez',
            documento: '123456789',
            telefono: '3101234567',
            estado: true
          },
          {
            id: 2,
            email: 'ana@gmail.com',
            nombre: 'Ana',
            apellido: 'López',
            documento: '987654321',
            telefono: '3117654321',
            estado: false
          },
          {
            id: 3,
            email: 'carlos@gmail.com',
            nombre: 'Carlos',
            apellido: 'Ramírez',
            documento: '112233445',
            telefono: '3101122334',
            estado: true
          },
          {
            id: 4,
            email: 'laura@gmail.com',
            nombre: 'Laura',
            apellido: 'Martínez',
            documento: '998877665',
            telefono: '3129988776',
            estado: false
          },
          {
            id: 5,
            email: 'pedro@gmail.com',
            nombre: 'Pedro',
            apellido: 'Gómez',
            documento: '554433221',
            telefono: '3165544332',
            estado: true
          },
          {
            id: 6,
            email: 'maria@gmail.com',
            nombre: 'María',
            apellido: 'Rodríguez',
            documento: '667788990',
            telefono: '3176677889',
            estado: true
          },
          {
            id: 7,
            email: 'diego@gmail.com',
            nombre: 'Diego',
            apellido: 'Suárez',
            documento: '778899001',
            telefono: '3187788990',
            estado: false
          },
          {
            id: 8,
            email: 'julia@gmail.com',
            nombre: 'Julia',
            apellido: 'Vega',
            documento: '889900112',
            telefono: '3198899001',
            estado: true
          },
          {
            id: 9,
            email: 'andres@gmail.com',
            nombre: 'Andrés',
            apellido: 'Castro',
            documento: '990011223',
            telefono: '3209900112',
            estado: true
          },
          {
            id: 10,
            email: 'sofia@gmail.com',
            nombre: 'Sofía',
            apellido: 'Moreno',
            documento: '100200300',
            telefono: '3211002003',
            estado: false
          },
          {
            id: 11,
            email: 'camilo@gmail.com',
            nombre: 'Camilo',
            apellido: 'León',
            documento: '200300400',
            telefono: '3222003004',
            estado: true
          },
          {
            id: 12,
            email: 'valentina@gmail.com',
            nombre: 'Valentina',
            apellido: 'Mejía',
            documento: '300400500',
            telefono: '3233004005',
            estado: false
          },
          {
            id: 13,
            email: 'sebastian@gmail.com',
            nombre: 'Sebastián',
            apellido: 'Ruiz',
            documento: '400500600',
            telefono: '3244005006',
            estado: true
          },
          {
            id: 14,
            email: 'isabella@gmail.com',
            nombre: 'Isabella',
            apellido: 'Lara',
            documento: '500600700',
            telefono: '3255006007',
            estado: true
          },
          {
            id: 15,
            email: 'felipe@gmail.com',
            nombre: 'Felipe',
            apellido: 'Cárdenas',
            documento: '600700800',
            telefono: '3266007008',
            estado: false
          }
        ];
        this.loading = false;
      } catch (e) {
        this.error = 'No se pudieron cargar los usuarios';
        this.loading = false;
      }
    }, 1000); // Simula carga
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
