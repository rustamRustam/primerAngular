import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionKartochekComponent } from './collection-kartochek.component';

describe('CollectionKartochekComponent', () => {
  let component: CollectionKartochekComponent;
  let fixture: ComponentFixture<CollectionKartochekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionKartochekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionKartochekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
