import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GridAPIService } from 'src/app/services/grid-apiservice.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  userForm: FormGroup;
  response: any;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  userId: number;

  constructor(private gridApiService: GridAPIService, private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.userId = +params.id;
        this.gridApiService.getUserById(this.userId)
          .subscribe((post) => {
            this.userForm.patchValue({
              name: post.data.name,
              email: post.data.email,
              gender: post.data.gender,
              status: post.data.status
            });
          });
      });

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    var postData =
    {
      "id": this.userId,
      "name": this.userForm.value.name,
      "email": this.userForm.value.email,
      "gender": this.userForm.value.gender,
      "status": this.userForm.value.status
    };

    this.gridApiService.updateUser(postData)
      .subscribe(x => {
        if (x.code == 200) {
          this.showSuccessMessage = true;
          this.response = "User updated successfully.";
          //this.userForm.reset();
        }
        else {
          this.showErrorMessage = true;
          this.response = x;
        }
      });
  }

  deleteUser() {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.gridApiService.deleteUser(this.userId)
    .subscribe(x => {
      if (x.code == 204) {
        this.response="User deleted successfully.";
        this.showSuccessMessage = true;
      }
      else{
        this.showErrorMessage = true;
        this.response = x;
      }
    });
  }

}
