import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GridAPIService } from 'src/app/services/grid-apiservice.service';

@Component({
  selector: 'app-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css']
})
export class UpdatepostComponent implements OnInit {

  postForm: FormGroup;
  response: any;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  postId: number;

  constructor(private gridApiService: GridAPIService, private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.postId = +params.id;
        this.gridApiService.getPostById(this.postId)
          .subscribe((post) => {
            this.postForm.patchValue({
              user_id: post.data.user_id,
              title: post.data.title,
              body: post.data.body
            });
          });
      });

    this.postForm = this.fb.group({
      user_id: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  onSubmit() {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    var postData =
    {
      "id": this.postId,
      "user_id": this.postForm.value.user_id,
      "title": this.postForm.value.title,
      "body": this.postForm.value.body
    };
    console.log(postData);

    this.gridApiService.updatePost(postData)
      .subscribe(x => {
        console.log(x);
        if (x.code == 200) {
          this.showSuccessMessage = true;
          this.response = "Post updated successfully.";
          //this.postForm.reset();
        }
        else {
          this.showErrorMessage = true;
          this.response = x;
        }
      });
  }
  deletePost() {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.gridApiService.deletePost(this.postId)
      .subscribe(x => {
        if (x.code == 204) {
          this.response = "Post deleted successfully.";
          this.showSuccessMessage = true;
          this.postForm.reset();
        }
        else {
          this.showErrorMessage = true;
          this.response = x;
        }
      });

  }

}
