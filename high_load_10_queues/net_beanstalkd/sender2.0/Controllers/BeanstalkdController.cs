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
        _sender = new BeanstalkConnection("127.0.0.1", 11301);
    }

    int c = 0;

    [HttpPost]
    public async System.Threading.Tasks.Task<string> PostAsync()
    {
        await _sender.Use("tube");
        var id = await _sender.Put($"Mission{c++}");
        return id.ToString();
    }
}
