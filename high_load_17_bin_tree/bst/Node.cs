namespace Intervals.Tools;

using System;

public partial class AATree<T> {
    public class Node {
        private readonly Action<Node> _onChildChanged;
        private Node? _left;
        private Node? _right;

        public Node(T element, Action<Node> onChildChanged) {
            Value = element;
            Level = 1;
            _onChildChanged = onChildChanged;
        }

        public T Value { get; set; }

        public Node? Right {
            get => _right;
            set {
                _right = value;
                _onChildChanged.Invoke(this);
            }
        }

        public Node? Left {
            get => _left;
            set {
                _left = value;
                _onChildChanged.Invoke(this);
            }
        }

        public int Level { get; set; }
    }
}