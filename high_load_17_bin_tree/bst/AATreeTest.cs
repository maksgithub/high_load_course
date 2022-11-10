using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Engines;
using Intervals.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bst {

    [SimpleJob(RunStrategy.ColdStart)]
    [MinColumn, MaxColumn, MeanColumn, MedianColumn]
    [RPlotExporter]
    public class AATreeTest {
        private const int operatiosCount = 1;
        private const int count = 1_000_000;
        private readonly Random random = new Random();

        [Benchmark]
        [ArgumentsSource(nameof(Data))]
        public void Insert(AATree<int> tree, int item) {
            for (int i = 0; i < operatiosCount; i++) {
                tree.Add(random.Next(0, item));
            }
        }

        [Benchmark]
        [ArgumentsSource(nameof(Data))]
        public void Delete(AATree<int> tree, int item) {
            for (int i = 0; i < operatiosCount; i++) {
                tree.Remove(random.Next(0, item));
            }
        }

        [Benchmark]
        [ArgumentsSource(nameof(Data))]
        public void Find(AATree<int> tree, int item) {
            for (int i = 0; i < operatiosCount; i++) {
                tree.Contains(random.Next(0, item));
            }
        }

        [Benchmark]
        [ArgumentsSource(nameof(DataArray))]
        public void InsertArr(List<int> array, int item) {
            for (int i = 0; i < operatiosCount; i++) {
                array.Insert(0, random.Next(0, item));
            }
        }

        [Benchmark]
        [ArgumentsSource(nameof(DataArray))]
        public void DeleteArr(List<int> array, int item) {
            for (int i = 0; i < operatiosCount; i++) {
                array.Remove(random.Next(0, item));
            }
        }

        [Benchmark]
        [ArgumentsSource(nameof(DataArray))]
        public void FindArr(List<int> array, int item) {
            for (int i = 0; i < operatiosCount; i++) {
                array.Contains(random.Next(0, item));
            }
        }

        public IEnumerable<object[]> Data() {
            for (int i = 100; i <= count; i *= 5) {
                yield return new object[] { CreateTree(i), i };
            }
        }

        public IEnumerable<object[]> DataArray() {
            for (int i = 100; i <= count; i *= 5) {
                yield return new object[] { Enumerable.Range(0, i).Select(x => random.Next(0, i)).ToList(), i };
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
