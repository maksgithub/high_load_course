using Microsoft.Net.Http.Headers;
using System.Net.Http;
using System.Text.Json;

namespace high_load_3_google_analitycs;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly IHttpClientFactory _httpClientFactory;

    public Worker(ILogger<Worker> logger, IHttpClientFactory httpClientFactory)
    {
        _logger = logger;
        _httpClientFactory = httpClientFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await OnGet();
            await Task.Delay(20000, stoppingToken);
        }
    }

    public async Task OnGet()
    {
        var httpRequestMessage = new HttpRequestMessage(
            HttpMethod.Get,
            "https://bank.gov.ua/NBU_Exchange/exchange?json");

        var httpClient = _httpClientFactory.CreateClient();
        var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);

        if (httpResponseMessage.IsSuccessStatusCode)
        {
            using var contentStream =
                await httpResponseMessage.Content.ReadAsStreamAsync();

            var exchangeItems = await JsonSerializer.DeserializeAsync<ExchangeItem[]>(contentStream);
            foreach (var exchangeItem in exchangeItems)
            {
                GoogleAnalyticsApi.TrackEvent("ExchangeRate_2", exchangeItem.CurrencyCodeL, exchangeItem.Amount.ToString());
            }
        }
    }
}
