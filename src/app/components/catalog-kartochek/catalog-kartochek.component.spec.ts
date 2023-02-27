import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogKartochekComponent } from './catalog-kartochek.component';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'

describe('CatalogKartochekComponent', () => {
  let component: CatalogKartochekComponent;
  let fixture: ComponentFixture<CatalogKartochekComponent>;
  let httpTestingController: HttpTestingController


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CatalogKartochekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogKartochekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
