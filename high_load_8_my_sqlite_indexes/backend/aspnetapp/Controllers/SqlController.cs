using app.Services;
using InfluxDB.Client.Api.Domain;
using InfluxDB.Client.Writes;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class SqlController : ControllerBase
{
    private readonly ILogger<SqlController> _logger;
    private readonly InfluxDBService _influxDBService;
    private readonly string _org = Environment.GetEnvironmentVariable("DOCKER_INFLUXDB_INIT_ORG") ?? "maxim";
    private readonly string _bucket = Environment.GetEnvironmentVariable("DOCKER_INFLUXDB_INIT_BUCKET") ?? "weather";

    public SqlController(InfluxDBService influxDBService,
                                     ILogger<SqlController> logger)
    {
        _logger = logger;
        _influxDBService = influxDBService;
    }

    [HttpGet()]
    public string Sql()
    {
        return "Ok";
    }
}
