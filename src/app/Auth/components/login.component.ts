import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as AuthAction from '../actions';
import { AuthDTO } from '../models/auth.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  // Agregar estas propiedades
  isLoading: boolean = false;
  loginError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.loginError = null;

    const credentials: AuthDTO = {
      email: this.email.value,
      password: this.password.value,
      user_id: '',
      access_token: '',
    };

    // Despachar la acción de login al store
    this.store.dispatch(AuthAction.login({ credentials }));

    // Simular suscripción o efecto para manejar loginSuccess o loginFailure
    this.store.select('auth').subscribe((state) => {
      if (state.error) {
        this.loginError = 'Login failed. Please try again.';
      }
      this.isLoading = false;
    });
  }
}
