import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as CategoriesAction from '../../actions';
import { CategoryDTO } from '../../models/category.dto';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  isUpdateMode: boolean = false;
  categoryId: string | null;
  userId: string = '';
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');

    // Inicializar formulario
    this.categoryForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(55)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      css_color: ['', [Validators.required, Validators.maxLength(7)]],
    });

    // Obtener userId del store
    this.store.select('auth').subscribe((auth) => {
      this.userId = auth.credentials?.user_id || '';
    });

    // Manejar la categoría si ya existe
    this.store.select('categories').subscribe((categories) => {
      if (categories.category) {
        const category = categories.category;
        this.categoryForm.patchValue({
          title: category.title,
          description: category.description,
          css_color: category.css_color,
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.categoryId) {
      this.isUpdateMode = true;
      this.isLoading = true;

      this.store.dispatch(
        CategoriesAction.getCategoryById({ categoryId: this.categoryId })
      );

      this.store.select('categories').subscribe(() => {
        this.isLoading = false;
      });
    }
  }

  saveCategory(): void {
    if (this.categoryForm.invalid || !this.userId) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    const category: CategoryDTO = {
      ...this.categoryForm.value,
      userId: this.userId,
    };

    if (this.isUpdateMode && this.categoryId) {
      this.store.dispatch(
        CategoriesAction.updateCategory({ categoryId: this.categoryId, category })
      );
    } else {
      this.store.dispatch(
        CategoriesAction.createCategory({ category })
      );
    }
  }

  // Getters para los controles individuales
  get title() {
    return this.categoryForm.get('title')!;
  }

  get description() {
    return this.categoryForm.get('description')!;
  }

  get css_color() {
    return this.categoryForm.get('css_color')!;
  }
}
