using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebLife.DAL;
using WebLife.Helpers;
using WebLife.Models;

namespace WebLife.Controllers
{
    [RequireHttps]
    public class HomeController : MultiLanguageController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Load()
        {
            var model = new ConfigsModel();
            using (var dm = new DataManager())
            {
                model.Configs = dm.GetConfigs();
            }

            return View(model);
        }
        public ActionResult DeleteConfig(string id)
        {
            new DataManager().RemoveConfig(id);
            return RedirectToAction("Load");
        }

        public ActionResult Uploading(string id)
        {
            using (var dm = new DataManager())
            {
                Config config = dm.GetConfig(id);
                ViewBag.CellSize = config.CellSize;
                ViewBag.Name = config.Name;
                ViewBag.Min = config.Min;
                ViewBag.Max = config.Max;
                ViewBag.Spawn = config.Spawn;
                var cells = dm.GetCells(config.ConfigId);
                var X = new int[cells.Length];
                var Y = new int[cells.Length];
                for (int i = 0; i < cells.Length; i++)
                {
                    if (cells[i].ConfigId != config.ConfigId)
                        continue;

                    X[i] = cells[i].X;
                    Y[i] = cells[i].Y;
                }
               

                ViewBag.X = new JavaScriptSerializer().Serialize(X);
                ViewBag.Y = new JavaScriptSerializer().Serialize(Y);
            }
            return View("Index");
        }
    }
}