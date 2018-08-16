import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripGeneratorFormComponent } from './trip-generator-form.component';

describe('TripGeneratorFormComponent', () => {
  let component: TripGeneratorFormComponent;
  let fixture: ComponentFixture<TripGeneratorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripGeneratorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripGeneratorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
