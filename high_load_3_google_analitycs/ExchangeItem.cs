using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace high_load_3_google_analitycs
{
    public class ExchangeItem
    {
        public string StartDate { get; set; }
        public string TimeSign { get; set; }
        public string CurrencyCode { get; set; }
        public string CurrencyCodeL { get; set; }
        public int Units { get; set; }
        public double Amount { get; set; }
    }
}
