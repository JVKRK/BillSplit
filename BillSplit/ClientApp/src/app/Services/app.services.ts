// Service

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {

    constructor(private http: HttpClient
    ) {

  }



  // get users list
  public getUsersExpenses() {
    return this.http.get(`http://localhost:44314/api/UserExpenses/Index`);
  }
   // add users expenses
   public AddUsersExpenses(data) {
    return this.http.post(`http://localhost:44314/api/UserExpenses/Create`,data);
  }

     // Delete Expenses
     public DeleteExpenses(data) {
      return this.http.post(`http://localhost:44314/api/UserExpenses/Delete`,data);
    }

}


