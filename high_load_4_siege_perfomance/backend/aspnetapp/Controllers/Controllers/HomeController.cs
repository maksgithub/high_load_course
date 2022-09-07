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
        private readonly InfluxDBService _influxDBService;
        private readonly string _org = Environment.GetEnvironmentVariable("DOCKER_INFLUXDB_INIT_ORG") ?? "maxim";
        private readonly string _bucket = "siege";

        public HomeController(InfluxDBService influxDBService)
        {
            _influxDBService = influxDBService;
        }

        public string IndexAsync()
        {
            var proc = Process.Start(new ProcessStartInfo("siege", "http://localhost:5000/WeatherForecast -j -t 5s -c 1"));
            proc.StartInfo.RedirectStandardOutput = true;
            proc.Start();
            var sb = new StringBuilder();
            while (!proc.StandardOutput.EndOfStream)
            {
                string line = proc.StandardOutput.ReadLine();
                sb.AppendLine(line);
                // do something with line
            }

            var item = JsonSerializer.Deserialize<aspnetapp.Controllers.Controllers.SiegeModel>(sb.ToString());

            _influxDBService.Write(write =>
            {
                var point = PointData.Measurement("siege")
                .Tag("availability2", item.availability.ToString())
                .Tag("elapsed_time", item.elapsed_time.ToString())
                .Field("concurrency2", item.concurrency)
                .Timestamp(DateTime.UtcNow, WritePrecision.Ns);

                write.WritePoint(point, _bucket, _org);
            });

            //var sb = new StringBuilder();
            //foreach (DictionaryEntry e in System.Environment.GetEnvironmentVariables())
            //{
            //    sb.AppendLine(e.Key + ":" + e.Value);
            //}

            return sb.ToString();
        }
    }
}