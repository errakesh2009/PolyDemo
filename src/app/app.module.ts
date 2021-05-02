import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './shared/app-header/app-header.component';
import { AppFooterComponent } from './shared/app-footer/app-footer.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreatepostComponent } from './posts/createpost/createpost.component';
import { CreateuserComponent } from './users/createuser/createuser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './services/tokeninterceptor';
import { UserpostComponent } from './users/userpost/userpost.component';
import { MessageComponent } from './shared/message/message.component';
import { UpdateuserComponent } from './users/updateuser/updateuser.component';
import { UpdatepostComponent } from './posts/updatepost/updatepost.component';
import { ConfirmDialogComponent } from './shared/modelpopup/confirmdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    PostsComponent,
    UsersComponent,
    NotfoundComponent,
    CreatepostComponent,
    CreateuserComponent,
    UserpostComponent,
    MessageComponent,
    UpdateuserComponent,
    UpdatepostComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
