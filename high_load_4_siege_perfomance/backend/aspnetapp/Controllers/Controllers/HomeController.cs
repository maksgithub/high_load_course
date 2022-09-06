using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Linq;
using System.Text;

namespace MvcMovie.Controllers
{
    public class HomeController : Controller
    {
        public string Index()
        {
            var sb = new StringBuilder();
            foreach (DictionaryEntry e in System.Environment.GetEnvironmentVariables())
            {
                sb.AppendLine(e.Key + ":" + e.Value);
            }

            return sb.ToString();
        }
    }
}