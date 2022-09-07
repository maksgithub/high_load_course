using System;
using System.Threading.Tasks;
using InfluxDB.Client;
using Microsoft.Extensions.Configuration;

namespace app.Services
{
    public class InfluxDBService
    {
        private readonly string _token;

        public InfluxDBService()
        {
            _token = Environment.GetEnvironmentVariable("DOCKER_INFLUXDB_INIT_ADMIN_TOKEN") ?? "862cc2466480ea55f910e93c150345d6eea67ad57a409454b6f557f08c572563";
        }

        public void Write(Action<WriteApi> action)
        {
            using var client = InfluxDBClientFactory.Create("http://localhost:8086", _token);
            using var write = client.GetWriteApi();
            action(write);
        }

        public async Task<T> QueryAsync<T>(Func<QueryApi, Task<T>> action)
        {
            using var client = InfluxDBClientFactory.Create("http://localhost:8086", _token);
            var query = client.GetQueryApi();
            return await action(query);
        }
    }
}