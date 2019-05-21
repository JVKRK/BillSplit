using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BillSplit.Interfaces;
using BillSplit.Models;
using Microsoft.AspNetCore.Mvc;

namespace BillSplit.Controllers
{
    [Route("api/[controller]")]
    public class UserExpensesController : Controller
    {
        private readonly IUserExpenseService objexpense;

        public UserExpensesController(IUserExpenseService _objexpense)
        {
            objexpense = _objexpense;
        }

        [HttpGet("[action]")]
        public IActionResult Index(string searchString)
        {
            List<UserExpenses> lstEmployee = new List<UserExpenses>();
            lstEmployee = objexpense.GetAllExpenses().ToList();

            if (!string.IsNullOrEmpty(searchString))
            {
                lstEmployee = objexpense.GetSearchResult(searchString).ToList();
            }
            return Ok(lstEmployee);
        }

        public ActionResult AddEditExpenses(int itemId)
        {
            UserExpenses model = new UserExpenses();
            if (itemId > 0)
            {
                model = objexpense.GetExpenseData(itemId);
            }
            return new OkObjectResult(new { message = "Data added successfully." });
        }

        [HttpPost("[action]")]
        public ActionResult Create([FromBody]UserExpenses newExpense)
        {
            if (ModelState.IsValid)
            {
                if (newExpense.ItemId > 0)
                {
                    objexpense.UpdateExpense(newExpense);
                }
                else
                {
                    objexpense.AddExpense(newExpense);
                }
            }
            return new OkObjectResult(new { message = "Data added successfully." });

        }

        [HttpPost("[action]")]
        public IActionResult Delete([FromBody]int id)
        {
            objexpense.DeleteExpense(id);
            return new OkObjectResult(new { message = "Expense deleted successfully." });
        }
    }
}