// See https://aka.ms/new-console-template for more information

using System.ComponentModel;
using InfluxDB.Client.Api.Domain;
using InfluxDB.Client.Writes;

Console.WriteLine("Start");
var serv = new InfluxDBService();
serv.Write((x) =>
{
    foreach (var i in Enumerable.Range(0, 100))
    {
        var point = PointData.Measurement("test")
                   .Field("concurrency", 3 * i)
                   .Field("time_total", 5.14 * i)
                   .Timestamp(DateTime.UtcNow, WritePrecision.Ns);

        x.WritePoint(point, "test", "maxim");
    }
});
Console.WriteLine("End");