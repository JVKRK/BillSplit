import { Component, TemplateRef } from '@angular/core';
import { AppService } from '../Services/app.services';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'addedit-expenses',
  templateUrl: './addeditexpenses.component.html'

})
export class addEditExpenseComponent {

  text = 'Add';
  addEditUserForm: FormGroup;

  constructor(
    private appService: AppService,
  ) {

    this.addEditUserForm = new FormGroup({
      ItemId: new FormControl(0, Validators.compose([Validators.required])),
      ItemName: new FormControl('', Validators.compose([Validators.required])),
      UserName: new FormControl('', Validators.compose([Validators.required])),
      Category: new FormControl('', Validators.compose([Validators.required])),
      Amount: new FormControl('', Validators.compose([Validators.required])),
      ExpenseDate: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit(){

  }

  submitData(event){
    if(this.addEditUserForm.valid){
        console.log(event)
        this.appService.AddUsersExpenses(event)
        .subscribe(data => {
          console.log(data);
          this.addEditUserForm.reset();
        },
          err => {

          })
    }
    else{
      alert("Please enter Data");
    }
  }

}
