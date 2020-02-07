import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSensoresComponent } from './listar-sensores.component';

describe('ListarSensoresComponent', () => {
  let component: ListarSensoresComponent;
  let fixture: ComponentFixture<ListarSensoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarSensoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSensoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
