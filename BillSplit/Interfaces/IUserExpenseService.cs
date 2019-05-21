using BillSplit.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BillSplit.Interfaces
{
    public interface IUserExpenseService
    {
        IEnumerable<UserExpenses> GetAllExpenses();
                IEnumerable<UserExpenses> GetSearchResult(string searchString);
        void AddExpense(UserExpenses expense);
        UserExpenses GetExpenseData(int id);
        int UpdateExpense(UserExpenses expense);
        void DeleteExpense(int id);
    }
}
