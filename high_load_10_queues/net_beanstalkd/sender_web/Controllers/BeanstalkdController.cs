using Beanstalk.Core;
using Microsoft.AspNetCore.Mvc;

namespace sender_web.Controllers;

[ApiController]
[Route("[controller]")]
public class BeanstalkdController : ControllerBase
{
    private BeanstalkConnection _sender;

    private BeanstalkConnection _receiver;

    public BeanstalkdController()
    {
        Task.Run(() =>
        {
            _receiver = new BeanstalkConnection("127.0.0.1", 11300);
            _receiver.Watch("tube");
        });
        _sender = new BeanstalkConnection("127.0.0.1", 11300);
    }

    [HttpGet]
    public async Task<string> GetAsync()
    {
        try
        {
            Console.WriteLine("get 2");
            var job = await _receiver.Reserve(TimeSpan.FromMinutes(5));
            Console.WriteLine("get 3");
            await _receiver.Delete(job.Id);
            Console.WriteLine("get 4");
            return $"{job.Id} => {job.Data}";
        }
        catch (System.Exception)
        {
            return "error";
        }
    }

    int c = 0;

    [HttpPost]
    public async Task<string> PostAsync()
    {
        await _sender.Use("tube");
        var id = await _sender.Put($"Mission{c++}");
        return id.ToString();
    }
}
