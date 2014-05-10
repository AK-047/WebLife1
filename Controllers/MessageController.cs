using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebLife.DAL;
using WebLife.Models;

namespace WebLife.Controllers
{
    public class MessageController : Controller
    {
        //
        // GET: /Message/
        public ActionResult Index()
        {
            var model = new AllUsersViewModel();
            var dm = new DataManager();
            List<ApplicationUser> users = dm.GetUsers().ToList();
            model.Users = users.Select(u => new AllUsersViewModel.User {Id = u.Id, Name = u.UserName}).ToList();
            
            return View(model);
        }
	}
}