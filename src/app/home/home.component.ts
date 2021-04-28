import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { apiresponse } from '../model/apiresponse';
import { postmodel } from '../model/postmodel';
import { GridAPIService } from '../services/grid-apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { 
  GridRowData: postmodel[]; 
  CurrentPage:number = 0;
  TotalPages:number;
  constructor(private gridApiService:GridAPIService) { }  
  
  ngOnInit() {      
    this.GetPostsByPageNo(1);
  }

  GetPostsByPageNo(page:number) {  
    this.gridApiService.getUserPostByPageNo(page)
    .subscribe((x:apiresponse)=>{  
      this.GridRowData = x.data;
      this.CurrentPage = x.meta.pagination.page;
      this.TotalPages = x.meta.pagination.pages;
      console.log( x.meta.pagination);
      console.log(x);
    });
  }
  
  previous(){
    if(this.CurrentPage>1){
      this.GetPostsByPageNo(this.CurrentPage - 1);
    }
  }
  next()
  {
    if(this.CurrentPage<this.TotalPages){
      this.GetPostsByPageNo(this.CurrentPage + 1);
    }
  }

  deletePost(id:number){
    var postData = 
                     {
                         "id": id
                     };
    
    this.gridApiService.deletePost(postData)
    .subscribe(x=>{
      console.log(x);
    });
  }
}  

