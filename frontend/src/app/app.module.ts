import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CardComponent } from './components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailcardComponent } from './components/detailcard/detailcard.component';

import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ErrorComponent } from './components/error/error.component';
import { SellitemComponent } from './components/sellitem/sellitem.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { NgOptimizedImage } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestComponent } from './components/test/test.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { InboxComponent } from './components/inbox/inbox.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        CardComponent,
        DetailcardComponent,
        ErrorComponent,
        HomeComponent,
        SellitemComponent,
        LoginComponent,
        RedirectComponent,
        DummyComponent,
        DashboardComponent,
        TestComponent,
        DateAgoPipe,
        InboxComponent,
        ChatComponent
    ],
    bootstrap: [AppComponent],
    providers: [],
    imports: [NgOptimizedImage, BrowserModule, AppRoutingModule, HttpClientModule, FormsModule]
})
export class AppModule {}
