import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiuserresponse } from '../model/apiresponse';
import { usermodel } from '../model/usermodel';
import { GridAPIService } from '../services/grid-apiservice.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  GridRowData: usermodel[]; 
  CurrentPage:number = 0;
  TotalPages:number;
  UserId:number=0;
  constructor(private gridApiService:GridAPIService,private route:ActivatedRoute) { }  
  
  ngOnInit() {  
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.UserId = +params.id;
        console.log(this.UserId); 
      }
    );  
    this.GetUsersByPageNo(1);
  }

  GetUsersByPageNo(page:number) {  
    this.gridApiService.getUsersByPageNo(page)
    .subscribe((x:apiuserresponse)=>{  
      this.GridRowData = x.data;
      this.CurrentPage = x.meta.pagination.page;
      this.TotalPages = x.meta.pagination.pages;
      console.log( x.meta.pagination);
      console.log(x);
    });
  }
  
  previous(){
    if(this.CurrentPage>1){
      this.GetUsersByPageNo(this.CurrentPage - 1);
    }
  }
  next()
  {
    if(this.CurrentPage<this.TotalPages){
      this.GetUsersByPageNo(this.CurrentPage + 1);
    }
  }
  deleteUser(id:number){
   console.log(id);
  }
}
