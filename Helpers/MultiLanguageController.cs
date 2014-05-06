using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.AccessControl;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace WebLife.Helpers
{
    public abstract class MultiLanguageController : Controller
    {
        protected override void ExecuteCore()
        {
            string cultureName = null;
            HttpCookie cultureCookie = Request.Cookies["Arsenal"];
            if (cultureCookie != null)
            {
                cultureName = cultureCookie.Value;
            }
            else
            {
                cultureName = "en";
            }

            Thread.CurrentThread.CurrentCulture = new CultureInfo(cultureName);
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
            base.ExecuteCore();
        }
        protected override bool DisableAsyncSupport
        {
            get { return true; }
        }
	}
}