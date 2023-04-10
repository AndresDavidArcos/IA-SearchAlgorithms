class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class Queue {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  
    enqueue(value) {
      const newNode = new Node(value);
      if (this.isEmpty()) {
        this.head = newNode;
      } else {
        this.tail.next = newNode;
      }
      this.tail = newNode;
      this.length++;
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      const value = this.head.value;
      this.head = this.head.next;
      this.length--;
      if (this.isEmpty()) {
        this.tail = null;
      }
      return value;
    }
  
    peek() {
      if (this.isEmpty()) {
        return null;
      }
      return this.head.value;
    }
  
    size() {
      return this.length;
    }
  
    isEmpty() {
      return this.length === 0;
    }
  
    clear() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  }

  module.exports = Queue;