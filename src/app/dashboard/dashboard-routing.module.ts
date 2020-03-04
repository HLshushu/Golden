import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { BlogComponent } from './blog/blog.component';
import { InboxComponent } from './inbox/inbox.component';

const routes: Routes = [
  {
    path: '',
    component: InboxComponent,
    children: [
      { path: '', redirectTo: 'inbox', pathMatch: 'full' },
      { path: 'survey', component: SurveyComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'inbox', component: InboxComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
