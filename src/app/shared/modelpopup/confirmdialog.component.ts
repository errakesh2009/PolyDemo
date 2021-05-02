import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from './ConfirmDialogService';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  message: any;
  constructor(private confirmDialogService: ConfirmDialogService) { }

  ngOnInit(){    
    this.confirmDialogService.getMessage().subscribe(message => {
      this.message = message;
    });
  }
}
