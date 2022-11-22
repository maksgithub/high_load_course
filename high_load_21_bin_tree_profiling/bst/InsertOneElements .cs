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
    public class InsertOneElements {
        private const int count = 400_000;
        private const int step = 50_000;
        private const int insertionsCount = 1000;
        private readonly Random random = new Random();

        [Benchmark]
        [ArgumentsSource(nameof(TreeData))]
        public void Insert(AATree<int> tree, int itemsCount) {
            for (int i = 0; i < insertionsCount; i++) {
                tree.Add(random.Next(0, i));
            }
        }

        [Benchmark]
        [ArgumentsSource(nameof(ArrayData))]
        public void InsertArr(List<int> array, int itemsCount) {
            for (int i = 0; i < insertionsCount; i++) {
                array.Insert(0, i);
            }
        }
        public IEnumerable<object[]> TreeData() {
            for (int i = 0; i < count; i += step) {
                yield return new object[] { CreateTree(i), i };
            }
        }

        public IEnumerable<object[]> ArrayData() {
            for (int i = 0; i < count; i += step) {
                var list = Enumerable.Range(0, i).Select(x => random.Next(0, i)).ToList();
                yield return new object[] { list, i };
            }
        }

        public AATree<int> CreateTree(int length) {
            var tree = new AATree<int>();
            for (int n = 0; n < length; n++) {
                tree.Add(random.Next(0, n));
            }
            return tree;
        }
    }
}
