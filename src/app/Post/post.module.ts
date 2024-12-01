import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';

import { FormatDatePipe } from '../Shared/Pipes/format-date.pipe';
import { HomeComponent } from './components/home/home.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardComponent } from '../Shared/Components/card/card.component';
@NgModule({
  declarations: [
    PostsListComponent,
    PostFormComponent,
    HomeComponent,
    FormatDatePipe,
    DashboardComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    NgChartsModule,
  ],
  exports: [
    DashboardComponent, // Exporta si se usará fuera de este módulo
  ],
})
export class PostModule {}
