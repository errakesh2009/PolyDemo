import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { apiresponse, apiuserresponse } from "../model/apiresponse";

const postUrl: string = "https://gorest.co.in/public-api/posts";
const userUrl: string = "https://gorest.co.in/public-api/users";

@Injectable({
  providedIn: "root"
})
export class GridAPIService {

  errorMsg: string;
  constructor(private http: HttpClient) { }

  getUserPostByPageNo(page: number,limit:number=10): Observable<apiresponse> {
    return this.http.get<apiresponse>(postUrl + "?page=" + page+"&limit="+limit)
      .pipe(catchError(error => of(error)));
  }

  getUsersByPageNo(page: number,limit:number=10): Observable<apiuserresponse> {
    return this.http.get<apiuserresponse>(userUrl + "?page=" + page+"&limit="+limit)
      .pipe(catchError(error => of(error)));
  }
  createUser(data: any): Observable<any> {
    return this.http.post(userUrl, data)
      .pipe(catchError(error => of(error)));
  }
  createPost(data: any): Observable<any> {
    return this.http.post(postUrl, data)
      .pipe(catchError(error => of(error)));
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(userUrl+"/"+id)
      .pipe(catchError(error => of(error)));
  }
  deletePost(id: number): Observable<any> {
    console.log(postUrl+"/"+id);
    return this.http.delete(postUrl+"/"+id)
      .pipe(catchError(error => of(error)));
  }

  getUserWithPosts(id: number): Observable<any> {
    return forkJoin({
      user: this.http.get(userUrl + "/" + id),
      posts: this.http.get(userUrl + "/" + id + "/posts")
    }).pipe(catchError(error => of(error)));
  }
  getUserById(id: number): Observable<any> {
    return this.http.get(userUrl + "/"+id)
      .pipe(catchError(error => of(error)));
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(postUrl + "/"+id)
      .pipe(catchError(error => of(error)));
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(userUrl + "/"+data.id, data)
      .pipe(catchError(error => of(error)));
  }
  updatePost(data: any): Observable<any> {
    return this.http.put(postUrl + "/"+data.id, data)
      .pipe(catchError(error => of(error)));
  }
}