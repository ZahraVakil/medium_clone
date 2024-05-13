import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/core/services/article.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent {
  articles: any[] = [];
  loggedInUser: any;
  isLoading: boolean = true; // Flag for spinner

  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Get the logged-in user and fetch their articles
    this.authService.getCurrentUser().subscribe(
      (response: any) => {
        this.loggedInUser = response.user;
        this.fetchArticles();
      },
      (error: any) => {
        this.toastr.error('Error fetching user data', error.message, {
          timeOut: 2000,
        });
      }
    );
  }

  fetchArticles(): void {
    this.articleService.getArticles().subscribe(
      (response: any) => {
        const user = this.loggedInUser.username;
        // Filter to get only articles authored by the logged-in user
        this.articles = response.articles.filter(
          (article: any) => article.author.username === user
        );
        this.isLoading = false; // Data has loaded
      },
      (error: any) => {
        this.toastr.error('Error fetching articles', error.message, {
          timeOut: 2000,
        });
        this.isLoading = false; // Loading failed
      }
    );
  }

  updateArticle(article: any): void {
    // Logic for updating the article (e.g., navigate to an edit page)
  }

  deleteArticle(article: any): void {
    const confirmDelete = confirm(`Are you sure you want to delete "${article.title}"?`);
    if (!confirmDelete) {
      return; 
    }

    this.articleService.deleteArticle(article.slug).subscribe(
      () => {
        // Remove the deleted article
        this.articles = this.articles.filter((a) => a.slug !== article.slug);
        this.toastr.success(`"${article.title}" deleted successfully`, '', {
          timeOut: 2000,
        });
      },
      (error) => {
        this.toastr.error(`Error deleting "${article.title}"`, error.message, {
          timeOut: 2000,
        });
        console.error('Error deleting article:', error);
      }
    );
  }
}
