import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: "root"
}) export class ConfirmDialogService {
    private subject = new Subject<any>();

    confirmThis(message: string,title: string, yesFn: () => void, noFn: () => void): any {
        this.setConfirmation(message,title,"confirm", yesFn, noFn);
    }
    dialogThis(message: string,title: string, yesFn: () => void, noFn: () => void): any {
        this.setConfirmation(message,title,"dialog", yesFn, noFn);
    }
    setConfirmation(message: string,title: string,type:string, yesFn: () => void, noFn: () => void): any {        
        const that = this;
        this.subject.next({
            "type": type,
            "text": message,
            "title":title,
            yesFn(): any {
                that.subject.next();
                yesFn();
            },
            noFn(): any {
                that.subject.next();
                noFn();
            }
        });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}