import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyComponent } from './survey/survey.component';
import { BlogComponent } from './blog/blog.component';
import { InboxComponent } from './inbox/inbox.component';
import { YahooComponent } from './yahoo/yahoo.component';

const routes: Routes = [
  // { path: '',   redirectTo: '/yahoo', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/survey', component: SurveyComponent },
  { path: 'dashboard/blog', component: BlogComponent },
  { path: 'dashboard/inbox', component: InboxComponent },
  { path: 'dashboard/yahoo', component: YahooComponent }
];

// Only call RouterModule.forRoot() in the root AppRoutingModule (or the AppModule if that's where you register top level application routes). 
// In any other module, you must call the RouterModule.forChild method to register additional routes.
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule {}
