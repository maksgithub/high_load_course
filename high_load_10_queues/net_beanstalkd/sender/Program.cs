using System.Net;
using Beanstalk.Core;

HttpListener server = new HttpListener();

server.Prefixes.Add("http://localhost:80/");
server.Start();
var client = new BeanstalkConnection("127.0.0.1", 11300);

await client.Use("mytube");
int c = 0;

Console.WriteLine("Started");
while (true)
{
    var context = server.GetContext();
    var request = context.Request;
    var response = context.Response;

    var id = await client.Put($"Mission{c++}");
    createResponse(response, id.ToString());
}

static void createResponse(HttpListenerResponse response, string responseString)
{
    byte[] buffer = System.Text.Encoding.UTF8.GetBytes(responseString);

    response.ContentLength64 = buffer.Length;
    var output = response.OutputStream;
    output.Write(buffer, 0, buffer.Length);
    output.Close();
}
