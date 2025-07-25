import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsu } from './registro-usu';

describe('RegistroUsu', () => {
  let component: RegistroUsu;
  let fixture: ComponentFixture<RegistroUsu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroUsu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroUsu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
