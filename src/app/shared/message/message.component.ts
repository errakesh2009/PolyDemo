import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector:"app-message",
    templateUrl:"./message.component.html"
})
export class MessageComponent {
   @Input() showSuccessMessage:boolean = false;
   @Input() showErrorMessage:boolean = false;
   @Input() response:any;
}