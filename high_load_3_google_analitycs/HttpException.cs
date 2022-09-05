using System.Runtime.Serialization;

namespace high_load_3_google_analitycs
{
    [Serializable]
    internal class HttpException : Exception
    {
        private int statusCode;
        private string v;

        public HttpException()
        {
        }

        public HttpException(string? message) : base(message)
        {
        }

        public HttpException(int statusCode, string v)
        {
            this.statusCode = statusCode;
            this.v = v;
        }

        public HttpException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected HttpException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}