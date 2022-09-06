using Microsoft.AspNetCore.Mvc;

namespace MvcMovie.Controllers
{
    public class HomeController : Controller
    {
        public string Index()
        {
            return "Ok";
        }
    }
}