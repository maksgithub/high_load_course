using app.Services;
using InfluxDB.Client.Api.Domain;
using InfluxDB.Client.Writes;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.Json;

namespace MvcMovie.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {
        }

        public string IndexAsync()
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