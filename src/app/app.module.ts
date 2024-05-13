import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedModule } from './modules/feed/feed.module';
import { PageNotFoundModule } from './modules/404/notFound.module';
import { AuthModule } from './modules/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorInterceptor } from './core/interceptors/auth-interceptor.interceptor';
import { CreateArticleComponent } from './modules/articles/create-article/create-article.component';
import { ReadArticleComponent } from './modules/articles/read-article/read-article.component';
import { ArticleModule } from './modules/articles/article.module';
import { ProfileComponent } from './modules/userProfile/profile/profile.component';
import { UserModule } from './modules/userProfile/user.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FeedModule,
    PageNotFoundModule,
    AuthModule,
    ArticleModule,
    UserModule
  ],
  providers: [   
     { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
