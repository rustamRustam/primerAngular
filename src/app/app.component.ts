import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
    './listHeader.css.scss'
  ]
})
export class AppComponent {
  title = 'artists_page';

  darkTema() {
    document.body.classList.toggle("finter-invert");
  }
}
