import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeATattlerComponent } from './become-a-tattler.component';

describe('BecomeATattlerComponent', () => {
  let component: BecomeATattlerComponent;
  let fixture: ComponentFixture<BecomeATattlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeATattlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeATattlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
