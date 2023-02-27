import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeraciyaComponent } from './numeraciya.component';

describe('NumeraciyaComponent', () => {
  let component: NumeraciyaComponent;
  let fixture: ComponentFixture<NumeraciyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumeraciyaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumeraciyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
