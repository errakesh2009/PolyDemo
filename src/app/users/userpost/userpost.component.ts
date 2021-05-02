import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { postmodel } from 'src/app/model/postmodel';
import { usermodel } from 'src/app/model/usermodel';
import { GridAPIService } from 'src/app/services/grid-apiservice.service';

@Component({
  selector: 'app-userpost',
  templateUrl: './userpost.component.html',
  styleUrls: ['./userpost.component.css']
})
export class UserpostComponent implements OnInit {
  
  
  response:any;
  user:usermodel;
  posts:postmodel[];

  constructor(private gridApiService:GridAPIService,private fb: FormBuilder,
              private route:ActivatedRoute) { } 

  ngOnInit(): void { 
    this.user=new usermodel();
    this.route.queryParams
      .subscribe(params => {
        this.gridApiService.getUserWithPosts(+params.id)
          .subscribe(({user,posts})=>{
            this.posts=posts.data;            
            this.user.name = user.data.name;
            this.user.email = user.data.email;
            this.user.gender = user.data.gender;
          });      
      }
    );
  }
}
