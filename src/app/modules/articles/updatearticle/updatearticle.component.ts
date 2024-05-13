import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-updatearticle',
  templateUrl: './updatearticle.component.html',
  styleUrls: ['./updatearticle.component.css']
})
export class UpdatearticleComponent {

  updateArticleForm!: FormGroup; 
  //slug article
  articleSlug: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the article slug from the route
    this.articleSlug = this.route.snapshot.paramMap.get('slug') || '';

    // Initialize the form
    this.updateArticleForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
    });

    // Fetch the article data
    if (this.articleSlug) {
      this.articleService.getArticleBySlug(this.articleSlug).subscribe(
        (response) => {
          const article = response.article;
          //bind data
          this.updateArticleForm.patchValue({
            title: article.title,
            description: article.description,
            body: article.body,
          });
        },
        (error) => {
          this.toastr.error('Error fetching article data', error.message, {
            timeOut: 2000,
          });
          console.error('Error:', error);
        }
      );
    }
  }

  // Update 
  updateArticle(): void {
    if (this.updateArticleForm.valid) {
      const updatedArticle = {
        article: {
          title: this.updateArticleForm.get('title')?.value,
          description: this.updateArticleForm.get('description')?.value,
          body: this.updateArticleForm.get('body')?.value,
        },
      };

      
      this.articleService.updateArticle(this.articleSlug, updatedArticle).subscribe(
        () => {
          this.toastr.success('Article updated successfully', '', {
            timeOut: 2000,
          });
          // Navigate back to My Blogs page
          this.router.navigate(['/user/myblogs']);
        },
        (error) => {
          this.toastr.error('Error updating article', error.message, {
            timeOut: 2000,
          });
          console.error('Error:', error);
        }
      );
    }
  }
}
