using AngularKeep.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AngularKeep.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class HomeController : Controller
    {

        public HomeController() { }
        public IActionResult Index()
        {
            return RedirectToAction("Notes", "Home");
        }

        [Route("notes/{*url}")]
        public IActionResult Notes(string url)
        {
            return View("Notes", url);
        }

        [Route("tasks/{*url}")]
        public IActionResult Tasks(string url)
        {
            return View("Tasks", url);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}