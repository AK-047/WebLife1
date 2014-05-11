using System.Web.Mvc;
using WebLife.DAL;

namespace WebLife.Controllers
{
    public class ConfigController : Controller
    {
        //
        // POST: /Config/
        [HttpPost]
        public ActionResult Save(int cellSize, int min, int max, int spawn, int[][] grid)
        {
            using (var dm = new DataManager())
            {
                dm.SaveConfig(cellSize, min, max, spawn, grid);
            }
            return RedirectToAction("Index","Home");
        }
	}
}