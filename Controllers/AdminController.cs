using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebLife.DAL;
using WebLife.Models;

namespace WebLife.Controllers
{
    public class AdminController : Controller
    {
        //
        // GET: /Admin/
        public ActionResult ManageUsers()
        {
            AdminViewModel model = new AdminViewModel();
            model.users = new DataManager().GetUsers().ToList();
            return View(model);
        }

        public ActionResult Delete(string id)
        {
            new DataManager().RemoveUser(id);
            return RedirectToAction("ManageUsers");
        }
	}
}