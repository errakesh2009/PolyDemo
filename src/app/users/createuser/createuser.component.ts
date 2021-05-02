import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GridAPIService } from '../../services/grid-apiservice.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  userForm:FormGroup; 
  response:any;
  showSuccessMessage:boolean=false;
  showErrorMessage:boolean=false;

  constructor(private gridApiService:GridAPIService,private fb: FormBuilder) { } 

  ngOnInit(): void { 
    this.userForm = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      gender:['',Validators.required]
    });
  }

  onSubmit() {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
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
      if (x.code == 201) {
        this.showSuccessMessage = true;
        this.response="User created successfully.";
        this.userForm.reset();
      }
      else{
        this.showErrorMessage = true;
        this.response = x;
      }
    });
  }
}