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
          
            
            return View();
        }
	}
}