using app.Services;
using InfluxDB.Client.Api.Domain;
using InfluxDB.Client.Writes;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly InfluxDBService _influxDBService;
    private readonly string _org = Environment.GetEnvironmentVariable("DOCKER_INFLUXDB_INIT_ORG") ?? "maxim";
    private readonly string _bucket = Environment.GetEnvironmentVariable("DOCKER_INFLUXDB_INIT_BUCKET") ?? "weather";

    public WeatherForecastController(InfluxDBService influxDBService)
    {
        _influxDBService = influxDBService;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        var weather = GetWeather();
        _influxDBService.Write(write =>
        {
            foreach (var item in weather)
            {
                var point = PointData.Measurement("weather")
                .Tag("date", item.Date.ToString())
                .Tag("Summary", item.Summary)
                .Field("TemperatureC", item.TemperatureC)
                .Timestamp(DateTime.UtcNow, WritePrecision.Ns);

                write.WritePoint(point, _bucket, _org);
            }
        });
        return weather;
    }

    private static IEnumerable<WeatherForecast> GetWeather()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
