import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as AuthAction from '../../../Auth/actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  showAuthSection: boolean = false;
  showNoAuthSection: boolean = true;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(takeUntil(this.destroy$))
      .subscribe((auth) => {
        this.showAuthSection = !!auth.credentials?.access_token;
        this.showNoAuthSection = !this.showAuthSection;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  logout(): void {
    this.store.dispatch(AuthAction.logout());
    this.navigateTo('home');
  }
}
