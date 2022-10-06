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
        _receiver = new BeanstalkConnection("127.0.0.1", 11301);
    }

    [HttpGet]
    public async System.Threading.Tasks.Task<string> GetAsync()
    {
        await _receiver.Watch("tube");
        var job = await _receiver.Reserve(System.TimeSpan.FromMinutes(5));
        await _receiver.Delete(job.Id);
        return $"{job.Id} => {job.Data}";
    }
}
