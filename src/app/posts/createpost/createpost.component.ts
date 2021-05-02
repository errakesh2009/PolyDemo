import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GridAPIService } from '../../services/grid-apiservice.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  postForm:FormGroup; 
  response:any;
  showSuccessMessage:boolean=false;
  showErrorMessage:boolean=false;

  constructor(private gridApiService:GridAPIService,private fb: FormBuilder) { } 
  
  ngOnInit(): void {
    this.postForm = this.fb.group({
      user_id:['',Validators.required],
      title:['',Validators.required],
      body:['',Validators.required]
    });
  }

  onSubmit() {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    var postData = 
                     {
                         "user_id": this.postForm.value.user_id,
                         "title": this.postForm.value.title,
                         "body": this.postForm.value.body
                     };
    console.log(postData);
    this.gridApiService.createPost(postData)
      .subscribe(x=>{
        if (x.code == 201) {
          this.showSuccessMessage = true;
          this.response="Post created successfully.";
          this.postForm.reset();
        }
        else{
          this.showErrorMessage = true;
          this.response = x;
        }
      });
  }
}
