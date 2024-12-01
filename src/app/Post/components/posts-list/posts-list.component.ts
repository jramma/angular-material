import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  displayedColumns: string[] = [
    'title',
    'description',
    'num_likes',
    'num_dislikes',
    'publication_date',
    'categories',
    'userAlias',
    'actions',
  ];
  dataSource: MatTableDataSource<PostDTO>;

  private userId: string;

  constructor(private router: Router, private store: Store<AppState>) {
    this.userId = '';
    this.dataSource = new MatTableDataSource<PostDTO>([]);

    // Suscribirse al store para obtener el userId
    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials?.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });

    // Suscribirse al store de posts para actualizar la tabla
    this.store.select('posts').subscribe((postsState) => {
      this.dataSource.data = postsState.posts || [];
    });

    // Cargar los posts al inicio
    this.loadPosts();
  }

  private loadPosts(): void {
    if (this.userId) {
      this.store.dispatch(
        PostsAction.getPostsByUserId({ userId: this.userId })
      );
    }
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post/');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  deletePost(postId: string): void {
    const confirmDelete = confirm(`Confirm delete post with ID: ${postId}.`);
    if (confirmDelete) {
      this.store.dispatch(PostsAction.deletePost({ postId }));
    }
  }
}
