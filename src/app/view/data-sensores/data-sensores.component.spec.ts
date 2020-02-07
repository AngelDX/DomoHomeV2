import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSensoresComponent } from './data-sensores.component';

describe('DataSensoresComponent', () => {
  let component: DataSensoresComponent;
  let fixture: ComponentFixture<DataSensoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSensoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSensoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
