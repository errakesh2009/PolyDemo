import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GridAPIService } from '../services/grid-apiservice.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  userForm:FormGroup; 
  response:any;
  
  constructor(private gridApiService:GridAPIService,private fb: FormBuilder) { } 

  ngOnInit(): void { 
    this.userForm = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      gender:['',Validators.required]
    });
  }

  onSubmit() {
    
    var userData = 
                     {
                         "name": this.userForm.value.name,
                         "email": this.userForm.value.email,
                         "gender": this.userForm.value.gender,
                         "status":"Active"
                     };
    console.log(userData);
    this.gridApiService.createUser(userData)
    .subscribe(x=>{
      console.log(x);
      this.response = x.data;
      this.userForm.reset();
    });
  }
}