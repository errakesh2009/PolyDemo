import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GridAPIService } from '../services/grid-apiservice.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  postForm:FormGroup; 
  response:any;
  constructor(private gridApiService:GridAPIService,private fb: FormBuilder) { } 
  
  ngOnInit(): void {
    this.postForm = this.fb.group({
      user_id:['',Validators.required],
      title:['',Validators.required],
      body:['',Validators.required]
    });
  }

  onSubmit() {
    var postData = 
                     {
                         "user_id": this.postForm.value.user_id,
                         "title": this.postForm.value.title,
                         "body": this.postForm.value.body
                     };
    console.log(postData);
    this.gridApiService.createPost(postData)
      .subscribe(x=>{
        console.log(x);
        this.response = x.data;
        this.postForm.reset();
      });
  }
}
