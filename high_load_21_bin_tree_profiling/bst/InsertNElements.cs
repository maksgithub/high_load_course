using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Diagnosers;
using BenchmarkDotNet.Engines;
using Intervals.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bst {

    [SimpleJob(RunStrategy.ColdStart)]
    [MemoryDiagnoser]
    [MinColumn, MaxColumn, MeanColumn, MedianColumn]
    [RPlotExporter]
    public class InsertNElements {
        private const int operatiosCount = 1;
        private const int count = 400_000;
        private readonly Random random = new Random();

        [Benchmark]
        [ArgumentsSource(nameof(DataArray))]
        public void Insert(int itemsCount) {
            var tree = new AATree<int>();
            for (int i = 0; i < itemsCount; i++) {
                tree.Add(i);
            }
        }

        [Benchmark]
        [ArgumentsSource(nameof(DataArray))]
        public void InsertArr(int itemsCount) {
            var array = new List<int>();
            for (int i = 0; i < itemsCount; i++) {
                array.Insert(0, i);
            }
        }

        public IEnumerable<int> DataArray() {
            for (int i = 0; i < count; i += 50_000) {
                yield return i;
            }
        }
    }
}
