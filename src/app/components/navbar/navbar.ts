import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; //Esto es para importar el Router Link
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

}
