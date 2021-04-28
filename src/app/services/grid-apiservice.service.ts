import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import{catchError, map} from 'rxjs/operators'
import { apiresponse, apiuserresponse } from "../model/apiresponse";

const postUrl:string="https://gorest.co.in/public-api/posts";
const userUrl:string="https://gorest.co.in/public-api/users";

@Injectable({
    providedIn:"root"
})
export class GridAPIService{  
  
  errorMsg:string;
    constructor(private http:HttpClient){}
    
    getUserPostByPageNo(page:number):Observable<apiresponse>{        
      return this.http.get<apiresponse>(postUrl+"?page="+page)
      .pipe(
        catchError(error => {
            if (error.error instanceof ErrorEvent) {
                this.errorMsg = `Error: ${error.error.message}`;
            } else {
                this.errorMsg = `Error: ${error.message}`;
            }
            console.log(this.errorMsg);
            return of(new apiresponse());
        })
      );
    } 

   getUsersByPageNo(page:number):Observable<apiuserresponse>{        
    return this.http.get<apiuserresponse>(userUrl+"?page="+page)
    .pipe(
      catchError(error => {
          if (error.error instanceof ErrorEvent) {
              this.errorMsg = `Error: ${error.error.message}`;
          } else {
              this.errorMsg = `Error: ${error.message}`;
          }
          console.log(this.errorMsg);
          return of(new apiuserresponse());
      })
    );
   } 
   createUser(data:any):Observable<any>{        
    return this.http.post(userUrl,data)
    .pipe(
      catchError(error => {
          if (error.error instanceof ErrorEvent) {
              this.errorMsg = `Error: ${error.error.message}`;
          } else {
              this.errorMsg = `Error: ${error.message}`;
          }
          console.log(this.errorMsg);
          return of([]);
        })
      );
    }
    createPost(data:any):Observable<any>{        
      return this.http.post(postUrl,data)
      .pipe(
        catchError(error => {
            if (error.error instanceof ErrorEvent) {
                this.errorMsg = `Error: ${error.error.message}`;
            } else {
                this.errorMsg = `Error: ${error.message}`;
            }
            console.log(this.errorMsg);
            return of([]);
          })
        );
      }
      deleteUser(data:any):Observable<any>{        
        return this.http.delete(userUrl,data)
        .pipe(
          catchError(error => {
              if (error.error instanceof ErrorEvent) {
                  this.errorMsg = `Error: ${error.error.message}`;
              } else {
                  this.errorMsg = `Error: ${error.message}`;
              }
              console.log(this.errorMsg);
              return of([]);
            })
          );
        }
      deletePost(data:any):Observable<any>{        
        return this.http.delete(postUrl,data)
        .pipe(
          catchError(error => {
              if (error.error instanceof ErrorEvent) {
                  this.errorMsg = `Error: ${error.error.message}`;
              } else {
                  this.errorMsg = `Error: ${error.message}`;
              }
              console.log(this.errorMsg);
              return of([]);
            })
          );
        }
}