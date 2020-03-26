import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedMaterialModule } from './shared-material/shared-material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';

// Notice that the AppRoutingModule is last. Most importantly, it comes after the HeroesModule.
// When all routes were in one AppRoutingModule, you put the default and wildcard routes last, 
// after the /dashboard route, so that the router had a chance to match a URL to the /dashboard route 
// before hitting the wildcard route and navigating to "Page not found".
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    DashboardModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
