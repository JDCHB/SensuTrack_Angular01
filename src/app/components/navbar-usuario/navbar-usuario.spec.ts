import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUsuario } from './navbar-usuario';

describe('NavbarUsuario', () => {
  let component: NavbarUsuario;
  let fixture: ComponentFixture<NavbarUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
