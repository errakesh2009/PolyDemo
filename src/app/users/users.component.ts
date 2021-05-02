import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiuserresponse } from '../model/apiresponse';
import { usermodel } from '../model/usermodel';
import { GridAPIService } from '../services/grid-apiservice.service';
import { ConfirmDialogService } from '../shared/modelpopup/ConfirmDialogService';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  GridRowData: usermodel[];
  CurrentPage: number = 0;
  TotalPages: number;

  constructor(private gridApiService: GridAPIService, private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService) { }

  ngOnInit() {
    this.GetUsersByPageNo(1);
  }

  GetUsersByPageNo(page: number) {
    this.gridApiService.getUsersByPageNo(page)
      .subscribe((x: apiuserresponse) => {
        this.GridRowData = x.data;
        this.CurrentPage = x.meta.pagination.page;
        this.TotalPages = x.meta.pagination.pages;
      });
  }

  previous() {
    if (this.CurrentPage > 1) {
      this.GetUsersByPageNo(this.CurrentPage - 1);
    }
  }
  next() {
    if (this.CurrentPage < this.TotalPages) {
      this.GetUsersByPageNo(this.CurrentPage + 1);
    }
  }
  selectPage(page: string) {
    this.CurrentPage = parseInt(page, 10);

    if(this.CurrentPage <= 1) 
      this.CurrentPage = 1;
    else if(this.CurrentPage>this.TotalPages) 
      this.CurrentPage = this.TotalPages;
      
    this.GetUsersByPageNo(this.CurrentPage);
  }
  
  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  deleteConfirmation(id: number) {
    this.confirmDialogService.confirmThis("Are you sure you want to delete?","Delete Confirmation", () => {
      this.deleteUser(id);
    }, function () {});
  }
  deleteUser(id: number) {
    this.gridApiService.deleteUser(id)
    .subscribe(x => {
      if (x.code == 204) {     
        for (let i = 0; i < this.GridRowData.length; ++i) {
          if (this.GridRowData[i].id === id) {
            this.GridRowData.splice(i, 1);
          }
        }         
        this.confirmDialogService.dialogThis("User deleted successfully.","Success", 
        function(){}, function () {});
      }
      else {
        this.confirmDialogService.dialogThis("Error while deleting please check the log.","Error", 
        function(){}, function () {});
        console.log(x);
      }
    });    
  }
}
