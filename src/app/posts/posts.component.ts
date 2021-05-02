import { Component, OnInit } from '@angular/core';
import { apiresponse } from '../model/apiresponse';
import { postmodel } from '../model/postmodel';
import { GridAPIService } from '../services/grid-apiservice.service';
import { ConfirmDialogService } from '../shared/modelpopup/ConfirmDialogService';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  GridRowData: postmodel[];
  CurrentPage: number = 0;
  TotalPages: number;
  
  constructor(private gridApiService: GridAPIService,
    private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.GetPostsByPageNo(1);
  }

  GetPostsByPageNo(page: number) {
    this.gridApiService.getUserPostByPageNo(page)
      .subscribe((x: apiresponse) => {
        this.GridRowData = x.data;
        this.CurrentPage = x.meta.pagination.page;
        this.TotalPages = x.meta.pagination.pages;
      });
  }

  previous() {
    if (this.CurrentPage > 1) {
      this.GetPostsByPageNo(this.CurrentPage - 1);
    }
  }
  next() {
    if (this.CurrentPage < this.TotalPages) {
      this.GetPostsByPageNo(this.CurrentPage + 1);
    }
  }

  deleteConfirmation(id: number) {
    this.confirmDialogService.confirmThis("Are you sure you want to delete?","Delete Confirmation", () => {
      this.deletePost(id);
    }, function () {});
  }

  deletePost(id: number) {
    this.gridApiService.deletePost(id)
    .subscribe(x => {
      if (x.code == 204) {   
        for (let i = 0; i < this.GridRowData.length; ++i) {
          if (this.GridRowData[i].id === id) {
            this.GridRowData.splice(i, 1);
          }
        }           
        this.confirmDialogService.dialogThis("Post deleted successfully.","Success", 
        function(){}, function () {});
      }
      else{
        this.confirmDialogService.dialogThis("Error while deleting please check the log.","Error", 
        function(){}, function () {});
        console.log(x);
      }
    });
  }
}

