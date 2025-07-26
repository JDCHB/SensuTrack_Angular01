import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDiscapacitados } from './tabla-discapacitados';

describe('TablaDiscapacitados', () => {
  let component: TablaDiscapacitados;
  let fixture: ComponentFixture<TablaDiscapacitados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaDiscapacitados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaDiscapacitados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
