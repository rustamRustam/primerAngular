import { ApplicationConfig, enableProdMode, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
// import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic()
//   .bootstrapModule(
//     AppModule, 
//     { applicationProviders: [provideZoneChangeDetection()], }
//   )
//   .catch(err => console.error(err));



const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};


bootstrapApplication(
  AppComponent, 
  appConfig
)
  .catch((err) => console.error(err));
