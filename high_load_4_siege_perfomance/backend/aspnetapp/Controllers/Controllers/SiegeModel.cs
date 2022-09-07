using System;

namespace aspnetapp.Controllers.Controllers
{
    public class SiegeModel
    {
        public int transactions { get; set; }
        public double availability { get; set; }
        public double elapsed_time { get; set; }
        public double data_transferred { get; set; }
        public double response_time { get; set; }
        public double transaction_rate { get; set; }
        public double throughput { get; set; }
        public double concurrency { get; set; }
        public int successful_transactions { get; set; }
        public int failed_transactions { get; set; }
        public double longest_transaction { get; set; }
        public double shortest_transaction { get; set; }
    }
}

