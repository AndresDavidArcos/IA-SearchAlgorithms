class CostsArray {
  constructor() {
    this.arr = [];
  }

  add(node){
    this.arr.push(node)
  }

  isEmpty() {
    return this.arr.length === 0;
  }

  findMinCostNode() {
    let minIndex = 0;
    for (let i = 1; i < this.arr.length; i++) {
      if (this.arr[i].getCosts() < this.arr[minIndex].getCosts()) {
        minIndex = i;
      }
    }
    return minIndex;
  }

  retrieveMinNode() {
    const minIndex = this.findMinCostNode();
    const minNode = this.arr[minIndex];
    this.arr.splice(minIndex, 1);
    return minNode;
  }
}

module.exports = CostsArray;
