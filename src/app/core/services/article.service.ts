import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  getArticleURL: string = environment.baseURL + environment.getArticle_url;
  createArticleURL: string = environment.baseURL + environment.createArticle_url;
  getArticleBySlugURL: string = environment.baseURL + environment.getArticlebySlug_url;
  deleteArticleURL: string = environment.baseURL + environment.deleteArticle_url;
  updateArticleURL: string = environment.baseURL + environment.deleteArticle_url;

  getTagURL: string = environment.baseURL + environment.getTag_url;

  constructor(private http: HttpClient) { }

  getArticles(){
    return this.http.get<any>(this.getArticleURL);
  }

  createArticle(article: any) {
    return this.http.post(this.createArticleURL, article);
  }

  getArticleBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`${this.getArticleBySlugURL}/${slug}`);
  }

  getTags(){
    return this.http.get<any>(this.getTagURL);
  }
  

  updateArticle(slug: string, updatedArticle: any): Observable<any> {
      return this.http.put(`${this.updateArticleURL}/${slug}`, updatedArticle);
  }

  deleteArticle(slug: string): Observable<any> {
    return this.http.delete(`${this.deleteArticleURL}/${slug}`);
  }

}
