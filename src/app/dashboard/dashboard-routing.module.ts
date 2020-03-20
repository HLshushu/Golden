import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { BlogComponent } from './blog/blog.component';
import { InboxComponent } from './inbox/inbox.component';
import { YahooComponent } from './yahoo/yahoo.component';

const routes: Routes = [
  {
    path: '',
    component: YahooComponent,
    children: [
      { path: '', redirectTo: 'yahoo', pathMatch: 'full' },
      { path: 'survey', component: SurveyComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'inbox', component: InboxComponent },
      { path: 'yahoo', component: YahooComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
