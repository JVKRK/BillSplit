import { Component, TemplateRef } from '@angular/core';
import { AppService } from '../Services/app.services';
//import { BsModalService } from 'ngx-bootstrap/modal';
//import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html'

})
export class ExpenseComponent {
  title = 'ClientApp';
  userExpenses: any = [];
  resultmsg: any = [];
  payments = {};

  constructor(

    private appService: AppService,
  ) {
  }

  ngOnInit(){
    this.getUsersDetails();
  }

  //To get the users list
  getUsersDetails() {
    this.appService.getUsersExpenses()
      .subscribe(data => {
        console.log(data)
        this.userExpenses = data;
        this.userExpenses.forEach(element => {
          let obj = element['userName'];
          this.payments[obj] = element.amount;
        });
        this.splitAmount(this.payments);
      },
        err => {

        })
  }

  splitAmount(payments) {
    this.resultmsg = [];
    const members = Object.keys(payments);
    const amountPaid = Object.values(payments);

    const sum = amountPaid.reduce((item, ind) => ind + item);
    const mean = sum / members.length;

    const sortedMember = members.sort((personA, personB) => payments[personA] - payments[personB]);
    const sortedAmountPaid = sortedMember.map((person) => payments[person] - mean);

    let i = 0;
    let j = sortedMember.length - 1;
    let debt;

    while (i < j) {
      debt = Math.min(-(sortedAmountPaid[i]), sortedAmountPaid[j]);
      sortedAmountPaid[i] += debt;
      sortedAmountPaid[j] -= debt;

      console.log(`${sortedMember[i]} NEED TO PAY ${sortedMember[j]} Rs.${debt}`);
      this.resultmsg.push(`${sortedMember[i]} NEED TO PAY ${sortedMember[j]} Rs.${debt}`);
      if (sortedAmountPaid[i] === 0) {
        i++;
      }

      if (sortedAmountPaid[j] === 0) {
        j--;
      }
    }
  }

  deleteExpense(eventId){
    this.appService.DeleteExpenses(eventId)
    .subscribe(data => {
      console.log(data);
        this.getUsersDetails();
    },
      err => {

      })
  }
}


