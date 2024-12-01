import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog-uoc-project-front';

  // Observable para controlar el estado de carga
  loading$: Observable<boolean>;

  constructor(private store: Store<{ user: { loading: boolean } }>) {
    // Selecciona el estado de carga del store
    this.loading$ = this.store.select(state => state.user.loading);
  }
}
