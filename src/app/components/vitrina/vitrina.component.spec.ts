import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitrinaComponent } from './vitrina.component';

describe('VitrinaComponent', () => {
  let component: VitrinaComponent;
  let fixture: ComponentFixture<VitrinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitrinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitrinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
