// See https://aka.ms/new-console-template for more information

using InfluxDB.Client.Api.Domain;
using InfluxDB.Client.Writes;
using System;
using System.Collections;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.Json;

Console.WriteLine("Start");
var serv = new InfluxDBService();

serv.Write((x) =>
{
    foreach (var i in Enumerable.Range(10, 25))
    {

        var proc = Process.Start(new ProcessStartInfo("siege", $"http://localhost:5000/WeatherForecast -j -t 20s -c {i * 3}"));
        proc.StartInfo.RedirectStandardOutput = true;
        proc.Start();
        var sb = new StringBuilder();
        while (!proc.StandardOutput.EndOfStream)
        {
            string line = proc.StandardOutput.ReadLine();
            sb.AppendLine(line);
        }

        var item = JsonSerializer.Deserialize<SiegeModel>(sb.ToString());
        var point = PointData.Measurement("siege")
                   .Field("concurrency", item.concurrency)
                   .Field("availability", item.availability)
                   .Field("elapsed_time", item.elapsed_time)
                   .Field("response_time", item.response_time)
                   .Timestamp(DateTime.UtcNow, WritePrecision.Ns);

        x.WritePoint(point, "siege", "maxim");
    }
});
Console.WriteLine("End");