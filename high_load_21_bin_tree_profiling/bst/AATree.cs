namespace Intervals.Tools;

using System;
using System.Collections.Generic;

public partial class AATree<T> {
    private Node? _root;
    private IComparer<T> _comparer;
    private readonly Action<Node> _onChildChanged;

    public AATree()
        : this(Comparer<T>.Default, (_) => { }) { }

    public AATree(IComparer<T> comparer, Action<Node> onChildChanged) {
        _comparer = comparer;
        _onChildChanged = onChildChanged;
    }

    internal Node? Root => _root;

    public int Count { get; private set; }

    public bool Add(T element) {
        var oldCount = Count;
        _root = Insert(_root, element);

        return Count != oldCount;
    }

    private Node Insert(Node? node, T element) {
        if (node is null) {
            node = new Node(element, _onChildChanged);
            Count++;
        }

        var comparison = _comparer.Compare(element, node.Value);
        if (comparison < 0) {
            node.Left = Insert(node.Left, element);
        } else if (comparison > 0) {
            node.Right = Insert(node.Right, element);
        }

        node = Skew(node);
        node = Split(node);

        return node!;
    }

    public bool Remove(T element) {
        (_root, var isRemoved) = Remove(_root, element);

        if (isRemoved) {
            Count--;
        }

        return isRemoved;
    }

    private (Node?, bool) Remove(Node? node, T element) {
        var isRemoved = false;
        if (node is null) {
            return (default, isRemoved);
        }

        var comparison = _comparer.Compare(element, node.Value);
        if (comparison > 0) {
            (node.Right, isRemoved) = Remove(node.Right, element);
        } else if (comparison < 0) {
            (node.Left, isRemoved) = Remove(node.Left, element);
        } else if (node!.Left is null) {
            return (node!.Right, true);
        } else {
            var nextNode = FindMin(node.Right!);
            nextNode!.Right = RemoveMin(node.Right!);
            nextNode!.Left = node.Left;
            nextNode.Level = node.Level;

            node = nextNode;

            isRemoved = true;
        }

        node = BalanceRemoval(node);
        return (node, isRemoved);
    }

    private Node? BalanceRemoval(Node? node) {
        if ((node!.Left?.Level ?? 0) < node?.Level - 1 || (node!.Right?.Level ?? 0) < node!.Level - 1) {
            node!.Level--;
            if (node!.Right?.Level > node.Level) {
                node.Right.Level = node.Level;
            }

            node = Skew(node);
            node!.Right = Skew(node.Right);
            if (node!.Right?.Right is not null) {
                node!.Right.Right = Skew(node.Right.Right);
            }

            node = Split(node);
            node!.Right = Split(node.Right);
        }

        return node;
    }

    private Node? FindMin(Node node) {
        if (node.Left is null) {
            return node;
        }

        return FindMin(node.Left);
    }

    private Node? RemoveMin(Node? node) {
        if (node!.Left is null) {
            return node.Right;
        }

        node.Left = RemoveMin(node.Left);
        node = BalanceRemoval(node);

        return node;
    }

    private Node? Split(Node? node) {
        if (node?.Right?.Right?.Level == node?.Level) {
            node = RotateRight(node!);
            node.Level++;
        }

        return node;
    }

    private Node RotateRight(Node node) {
        var temp = node.Right;

        node.Right = temp?.Left;
        temp!.Left = node;

        return temp;
    }

    private Node? Skew(Node? node) {
        if (node?.Left?.Level == node?.Level) {
            node = RotateLeft(node!);
        }

        return node;
    }

    private Node RotateLeft(Node node) {
        var temp = node.Left;

        node.Left = temp?.Right;
        temp!.Right = node;

        return temp;
    }

    public bool Contains(T element) {
        var current = _root;

        while (current != null) {
            var comparison = _comparer.Compare(element, current.Value);
            if (comparison > 0) {
                current = current.Right;
            } else if (comparison < 0) {
                current = current.Left;
            } else {
                return true;
            }
        }

        return false;
    }

    public void Clear() {
        _root = null;
        Count = 0;
    }

    //public void DFS(int indent) {
    //    DFS(_root, indent);
    //}
}