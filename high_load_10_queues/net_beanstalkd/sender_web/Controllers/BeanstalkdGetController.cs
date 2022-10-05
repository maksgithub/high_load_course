using Beanstalk.Core;
using Microsoft.AspNetCore.Mvc;

namespace sender_web.Controllers;

[ApiController]
[Route("[controller]")]
public class BeanstalkdGetController : ControllerBase
{
    private BeanstalkConnection _receiver;

    public BeanstalkdGetController()
    {
        _receiver = new BeanstalkConnection("127.0.0.1", 11300);
    }

    [HttpGet]
    public async Task<string> GetAsync()
    {
        try
        {
            Console.WriteLine("get 2");
            await _receiver.Watch("tube");
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
}
