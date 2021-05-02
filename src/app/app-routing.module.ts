import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatepostComponent } from './posts/createpost/createpost.component';
import { CreateuserComponent } from './users/createuser/createuser.component';
import { PostsComponent } from './posts/posts.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { UsersComponent } from './users/users.component';
import { UserpostComponent } from './users/userpost/userpost.component';
import { UpdatepostComponent } from './posts/updatepost/updatepost.component';
import { UpdateuserComponent } from './users/updateuser/updateuser.component';


const routes: Routes = [
  {
    path:"posts",
    component:PostsComponent
  },
  {
    path:"users",
    component:UsersComponent
  },
  {
    path:"createpost",
    component:CreatepostComponent
  },
  {
    path:"createuser",
    component:CreateuserComponent
  },
  {
    path:"userposts",
    component:UserpostComponent
  },
  {
    path:"updatepost",
    component:UpdatepostComponent
  },
  {
    path:"updateuser",
    component:UpdateuserComponent
  },
  {
    path:"",
    component:PostsComponent,
    pathMatch:"full"
  },
  {
    path:"**",
    component:NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
