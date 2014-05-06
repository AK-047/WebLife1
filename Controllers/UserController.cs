using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Microsoft.AspNet.Identity;
using WebLife.DAL;
using WebLife.Models;

namespace WebLife.Controllers
{
    public class UserController : Controller
    {
        //
        // GET: /User/
        public ActionResult ChangeTheme(string theme)
        {
            DataManager dm = new DataManager();
            ApplicationUser user = dm.GetUser(u => u.Id == User.Identity.GetUserId());
            user.Theme = "~/Content/" + theme + ".min.css";
            dm.ModifyUser(user);


            return RedirectToAction("Index", "Home");
        }

	}
}