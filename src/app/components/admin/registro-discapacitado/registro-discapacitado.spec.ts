import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDiscapacitado } from './registro-discapacitado';

describe('RegistroDiscapacitado', () => {
  let component: RegistroDiscapacitado;
  let fixture: ComponentFixture<RegistroDiscapacitado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDiscapacitado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDiscapacitado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
