import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KartochekaComponent } from './kartocheka.component';

describe('KartochekaComponent', () => {
  let component: KartochekaComponent;
  let fixture: ComponentFixture<KartochekaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KartochekaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KartochekaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
