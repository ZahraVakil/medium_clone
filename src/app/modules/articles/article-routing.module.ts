import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadArticleComponent } from './read-article/read-article.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { UpdatearticleComponent } from './updatearticle/updatearticle.component';

const routes: Routes = [

    {
        path: 'readarticle/:slug',
        component: ReadArticleComponent,
      },

      
    {
        path: 'createarticle',
        component: CreateArticleComponent,
      },
      {
        path: 'updatearticle/:slug',
        component: UpdatearticleComponent,
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
