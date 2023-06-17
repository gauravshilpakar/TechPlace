import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailcardComponent } from './components/detailcard/detailcard.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { SellitemComponent } from './components/sellitem/sellitem.component';
import { LoginComponent } from './components/login/login.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { ExtUrlResolverService } from './service/ext-url-resolver/ext-url-resolver.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestComponent } from './components/test/test.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'items/:id', component: DetailcardComponent }],
  },
  { path: 'login', component: LoginComponent },
  { path: 'redirect', component: RedirectComponent },
  { path: 'items', redirectTo: '' },
  { path: 'sell-item', component: SellitemComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'inbox/:id', component: ChatComponent },
  { path: 'edit-item/:id', component: SellitemComponent },
  { path: 'dummy', component:DummyComponent, resolve: {
    url: ExtUrlResolverService
    } },
  { path: 'test', component: TestComponent },

  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
