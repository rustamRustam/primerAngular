import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogKartochekComponent } from './catalog-kartochek.component';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CatalogKartochekComponent', () => {
  let component: CatalogKartochekComponent;
  let fixture: ComponentFixture<CatalogKartochekComponent>;
  let httpTestingController: HttpTestingController


  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [CatalogKartochekComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
