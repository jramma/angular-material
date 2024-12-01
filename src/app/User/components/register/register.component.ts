import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as UserAction from '../../actions';
import { UserDTO } from '../../models/user.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerUser: UserDTO;

  registerForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.registerUser = new UserDTO('', '', '', '', new Date(), '', '');

    this.isValidForm = null;

    // Usamos FormBuilder para inicializar el formulario
    this.registerForm = this.formBuilder.group({
      name: new FormControl(this.registerUser.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ]),
      surname_1: new FormControl(this.registerUser.surname_1, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ]),
      surname_2: new FormControl(this.registerUser.surname_2, [
        Validators.minLength(5),
        Validators.maxLength(25),
      ]),
      alias: new FormControl(this.registerUser.alias, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ]),
      birth_date: new FormControl(
        formatDate(this.registerUser.birth_date, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ),
      email: new FormControl(this.registerUser.email, [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      password: new FormControl(this.registerUser.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
    });
  }

  ngOnInit(): void {}

  register(): void {
    this.isValidForm = false;

    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.registerUser = this.registerForm.value;

    const user: UserDTO = {
      name: this.registerUser.name,
      surname_1: this.registerUser.surname_1,
      surname_2: this.registerUser.surname_2,
      alias: this.registerUser.alias,
      birth_date: this.registerUser.birth_date,
      email: this.registerUser.email,
      password: this.registerUser.password,
    };

    this.store.dispatch(UserAction.register({ user }));
  }
}
