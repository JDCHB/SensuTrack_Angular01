import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactenosComponentComponent } from './contactenos-component.component';

describe('ContactenosComponentComponent', () => {
  let component: ContactenosComponentComponent;
  let fixture: ComponentFixture<ContactenosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactenosComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactenosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
