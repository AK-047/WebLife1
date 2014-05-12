using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using WebLife.DAL;

namespace WebLife.Controllers
{
    public class ConfigController : Controller
    {
        //
        // POST: /Config/
        [HttpPost]
        public ActionResult Save(string name,int cellSize, int min, int max, int spawn, int[][] grid)
        {
            using (var dm = new DataManager())
            {
                dm.SaveConfig(name,cellSize, min, max, spawn, grid, User.Identity.GetUserId());
            }
            return RedirectToAction("Index","Home");
        }
	}
}