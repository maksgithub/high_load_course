using BenchmarkDotNet.Running;
using System;

BenchmarkRunner.Run(typeof(Program).Assembly);

//for (int i = 0; i < 1000; i += 100) {
//    Console.WriteLine(i);
//}