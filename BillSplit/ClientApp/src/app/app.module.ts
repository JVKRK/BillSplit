import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ExpenseComponent } from './expenses/expenses.component';
import { AppService } from './Services/app.services';
import { addEditExpenseComponent } from './expenses/addeditexpenses.component';
//import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseComponent,
    addEditExpenseComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    //ModalModule.forRoot(),
    RouterModule.forRoot([
     // { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '', component: ExpenseComponent },
      { path: 'addExpense', component: addEditExpenseComponent },
      { path: 'editExpense', component: addEditExpenseComponent }
    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
