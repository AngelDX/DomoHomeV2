import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSensoresComponent } from './gestion-sensores.component';

describe('GestionSensoresComponent', () => {
  let component: GestionSensoresComponent;
  let fixture: ComponentFixture<GestionSensoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionSensoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSensoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
