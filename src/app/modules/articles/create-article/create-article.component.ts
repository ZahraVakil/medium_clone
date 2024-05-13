import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent {
  articleForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      tags: ['', [Validators.pattern('^[a-zA-Z0-9, ]*$')]], // Validate tag pattern
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const articleData = {
        title: this.articleForm.get('title')?.value,
        description: this.articleForm.get('description')?.value,
        body: this.articleForm.get('body')?.value,
        tags: this.articleForm.get('tags')?.value.split(',').map((tag: string) => tag.trim()),  

      };

      this.articleService.createArticle({ article: articleData }).subscribe(
        (response) => {
          this.toastr.success('Article created successfully', '', {
            timeOut: 2000,
          });
          this.router.navigate(['/articles']); // Navigate to the articles page
        },
        (error) => {
          this.toastr.error('Error creating article', error.message, {
            timeOut: 2000,
          });
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
