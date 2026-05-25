import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.scss',
        './listHeader.css.scss'
    ],
    standalone: true,
    imports: [RouterOutlet, RouterLink]
})
export class AppComponent {
  title = 'artists_page';

  darkTema() {
    document.body.classList.toggle("finter-invert");
  }

  constructor(
    private loader: LoaderService,
    private cdr: ChangeDetectorRef
  ) {

  }

  // doReRender() {
  //   this.cdr.detectChanges();
  // }

  rewriteBD() {
    this.loader.closeDB();
    this.loader.deleteDB();
    this.loader.initDB();
    location.reload();
  }
}
