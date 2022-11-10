using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Engines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bst {

    [SimpleJob(RunStrategy.ColdStart)]
    [MinColumn, MaxColumn, MeanColumn, MedianColumn]
    [RPlotExporter]
    public class SortAlgoritm {
        private const int _insertionCount = 10;
        private readonly Random random = new Random();

        [Params(1_000_000)]
        public int UniqItemsCount;

        [Benchmark]
        [ArgumentsSource(nameof(Data))]
        public void CountingSort(int[] items) {
            CountSort.Run(items);
        }

        [Benchmark]
        [ArgumentsSource(nameof(Data))]
        public void QSort(int[] items) {
            Array.Sort(items);
        }

        public IEnumerable<int[]> Data() {
            for (int i = 100; i <= 100_000; i *= 2) {
                yield return Enumerable.Range(0, i).Select(x => random.Next(0, i)).ToArray();
            }
        }
    }
}
