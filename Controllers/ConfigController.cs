using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Ajax.Utilities;
using RestSharp;

namespace WebLife.Controllers
{
    public class ConfigController : Controller
    {
        //
        // POST: /Config/
        [HttpPost]
        public ActionResult Save(int cellSize, int min, int max, int spawn, int[][] grid)
        {

            return RedirectToAction("Index","Home");
        }
	}
}