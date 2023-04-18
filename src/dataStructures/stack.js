class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }

class Stack {
  constructor() {
    this.top = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new Node(value);
    newNode.next = this.top;
    this.top = newNode;
    this.length++;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.top.value;
    this.top = this.top.next;
    this.length--;
    return value;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.top.value;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  clear() {
    this.top = null;
    this.length = 0;
  }
}

  module.exports = Stack;