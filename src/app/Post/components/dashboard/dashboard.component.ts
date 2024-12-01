import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  posts: PostDTO[];
  numLikes: number;
  numDislikes: number;
  totalLikes: number = 0;
  totalDislikes: number = 0;

  // Opciones del gráfico
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Oculta la leyenda en gráficos individuales
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Reactions',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  };

  constructor(private store: Store<AppState>) {
    this.posts = new Array<PostDTO>();
    this.numLikes = 0;
    this.numDislikes = 0;

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
      this.calculateTotals();
    });
  }

  ngOnInit(): void {
    // No se necesita cargar los posts explícitamente
  }

  private calculateTotals(): void {
    this.totalLikes = this.posts.reduce((sum, post) => sum + post.num_likes, 0);
    this.totalDislikes = this.posts.reduce(
      (sum, post) => sum + post.num_dislikes,
      0
    );
  }

  // Genera datos para el gráfico de cada post
  generateChartData(post: PostDTO): ChartData<'bar'> {
    return {
      labels: ['Likes', 'Dislikes'],
      datasets: [
        {
          data: [post.num_likes, post.num_dislikes],
          backgroundColor: ['#17BF63', '#E0245E'],
        },
      ],
    };
  }
}
