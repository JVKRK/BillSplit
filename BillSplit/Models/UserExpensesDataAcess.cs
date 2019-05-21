using BillSplit.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillSplit.Models
{

    
    public class UserExpensesDataAcess : IUserExpenseService
    {
        private BillDBContext db;
       // ExpenseDBContext db = new ExpenseDBContext();
        public UserExpensesDataAcess(BillDBContext _db)
        {
            db = _db;
        }
        public IEnumerable<UserExpenses> GetAllExpenses()
        {
            try
            {
                return db.UserExpenses.ToList();
            }
            catch
            {
                throw;
            }
        }

     

        //To Add new Expense record       
        public void AddExpense(UserExpenses expense)
        {
            try
            {
                db.UserExpenses.Add(expense);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        //To Update the records of a particluar expense  
        public int UpdateExpense(UserExpenses expense)
        {
            try
            {
                db.Entry(expense).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

  

        //To Delete the record of a particular expense  
        public void DeleteExpense(int id)
        {
            try
            {
                UserExpenses emp = db.UserExpenses.Find(id);
                db.UserExpenses.Remove(emp);
                db.SaveChanges();

            }
            catch
            {
                throw;
            }
        }

        // To filter out the records based on the search string 
        public IEnumerable<UserExpenses> GetSearchResult(string searchString)
        {
            List<UserExpenses> exp = new List<UserExpenses>();
            try
            {
                exp = GetAllExpenses().ToList();
                return exp.Where(x => x.ItemName.IndexOf(searchString, StringComparison.OrdinalIgnoreCase) != -1);
            }
            catch
            {
                throw;
            }
        }

        //Get the data for a particular expense  
        public UserExpenses GetExpenseData(int id)
        {
            try
            {
                UserExpenses expense = db.UserExpenses.Find(id);
                return expense;
            }
            catch
            {
                throw;
            }
        }

    }
}
