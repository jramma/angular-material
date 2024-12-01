import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as CategoriesAction from '../../actions';
import { CategoryDTO } from '../../models/category.dto';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent {
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'css_color',
    'actions',
  ];
  dataSource: MatTableDataSource<CategoryDTO>;

  private userId: string;

  constructor(private router: Router, private store: Store<AppState>) {
    this.userId = '';
    this.dataSource = new MatTableDataSource<CategoryDTO>([]);

    // Obtener userId del store
    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials?.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });

    // Suscribirse al estado de categorías y actualizar la tabla
    this.store.select('categories').subscribe((categories) => {
      this.dataSource.data = categories.categories || [];
    });

    // Cargar categorías al inicio
    this.loadCategories();
  }

  private loadCategories(): void {
    if (this.userId) {
      this.store.dispatch(
        CategoriesAction.getCategoriesByUserId({ userId: this.userId })
      );
    }
  }

  createCategory(): void {
    this.router.navigateByUrl('/user/category/');
  }

  updateCategory(categoryId: string): void {
    this.router.navigateByUrl('/user/category/' + categoryId);
  }

  deleteCategory(categoryId: string): void {
    const confirmDelete = confirm(
      `Confirm delete category with ID: ${categoryId}.`
    );
    if (confirmDelete) {
      this.store.dispatch(CategoriesAction.deleteCategory({ categoryId }));
    }
  }
}
