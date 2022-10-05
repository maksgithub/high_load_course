// See https://aka.ms/new-console-template for more information
// See https://aka.ms/new-console-template for more information
using System.Net;
using Beanstalk.Core;

HttpListener server = new HttpListener();

server.Prefixes.Add("http://localhost:81/");
server.Start();
var client = new BeanstalkConnection("127.0.0.1", 11300);

await client.Watch("mytube");

Console.WriteLine("Started");
while (true)
{
    var context = server.GetContext();
    var request = context.Request;
    var response = context.Response;

    var job = await client.Reserve(TimeSpan.FromMinutes(5));
    Console.WriteLine("Reversed job: {0} {1}", job.Id, job.Data);
    await client.Delete(job.Id);
    ;
    createResponse(response, $"{job.Id} {job.Data}");
}

static void createResponse(HttpListenerResponse response, string responseString)
{
    byte[] buffer = System.Text.Encoding.UTF8.GetBytes(responseString);

    response.ContentLength64 = buffer.Length;
    var output = response.OutputStream;
    output.Write(buffer, 0, buffer.Length);
    output.Close();
}
