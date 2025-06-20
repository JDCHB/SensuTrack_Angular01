import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDiscapacitados } from './registro-discapacitados';

describe('RegistroDiscapacitados', () => {
  let component: RegistroDiscapacitados;
  let fixture: ComponentFixture<RegistroDiscapacitados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroDiscapacitados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroDiscapacitados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
