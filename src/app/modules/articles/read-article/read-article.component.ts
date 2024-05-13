import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-read-article',
  templateUrl: './read-article.component.html',
  styleUrls: ['./read-article.component.css']
})
export class ReadArticleComponent {
  article: any;
  isLoading: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug'); 
    if (slug) {
      this.articleService.getArticleBySlug(slug).subscribe(
        (response) => {
          this.article = response.article; 
          this.isLoading = false; 

        },
        (error) => {
          this.toastr.error('Error fetching article', error.message, {
            timeOut: 2000,
          });
          console.error('Error:', error);
          this.isLoading = false; 

        }
      );
    } else {
      console.error('Slug not found in route');
    }
  }

  followAuthor(): void {
    // Add logic to follow/unfollow the author
  }

  toggleFavorite(): void {
    // Add logic to toggle favoriting of the article
  }
}
