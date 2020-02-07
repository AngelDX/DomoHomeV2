import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSensoresComponent } from './main-sensores.component';

describe('MainSensoresComponent', () => {
  let component: MainSensoresComponent;
  let fixture: ComponentFixture<MainSensoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSensoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSensoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
