import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; //Esto es para importar el Router Link

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
