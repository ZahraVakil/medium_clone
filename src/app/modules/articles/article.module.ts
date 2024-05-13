import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ReadArticleComponent } from './read-article/read-article.component';
import { ArticleRoutingModule } from './article-routing.module';
import { UpdatearticleComponent } from './updatearticle/updatearticle.component';

@NgModule({
    declarations: [CreateArticleComponent, ReadArticleComponent, UpdatearticleComponent],
    imports: [CommonModule, ReactiveFormsModule, ArticleRoutingModule 
       ],
    exports: [],
  })
  export class  ArticleModule {}