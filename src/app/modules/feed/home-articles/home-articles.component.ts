import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/core/services/article.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home-articles',
  templateUrl: './home-articles.component.html',
  styleUrls: ['./home-articles.component.css']
})
export class HomeArticlesComponent {
  articles: any[] = [];
  loggedInUser: any;
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    //get current user
    this.authService.getCurrentUser().subscribe( 
      (response: any) => {
  this.loggedInUser = response.user.username;
  this.fetchArticles();

  console.log('Logged in user:', this.loggedInUser);
},
(error: any) => {
  console.error('Error fetching current user:', error);
});
 

}

fetchArticles(): void {
  this.articleService.getArticles().subscribe(
    (response: any) => {
      // Filter 
      const user = this.loggedInUser;
      this.articles = response.articles.filter(
        (article: any) => article.author.username !== user
      );
      this.isLoading = false; 
    },
    (error: any) => {
      this.toastr.error('Error fetching articles', error.message, {
        timeOut: 2000,
      });
      this.isLoading = false; 
    }
  );
}

  toggleFavorite(article: any): void {
    // Add logic to toggle favorite status
    if (article.favorited) {
      // Handle unfavorite logic
    } else {
      // Handle favorite logic
    }
  }

  followAuthor(author: any): void {
    // Add logic to follow/unfollow author
  }
}
