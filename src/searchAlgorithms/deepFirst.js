const Stack = require('../dataStructures/stack.js')

class DeepFirst{
    constructor(rootNode){
        this.stack = new Stack();
        this.stack.push(rootNode);
    }

    searchGoalState() {
        let goalState = false;
        let failState = false;
        let response = ["Error: el agente no ha podido encontrar el estado meta"]
        while (!goalState && !failState) {
          if (this.stack.isEmpty()) {
            failState = true;
          } else {
            const extractedNode = this.stack.pop();
            const extractedNodeChilds = extractedNode.expand();
            if (extractedNodeChilds === true) {
              response = extractedNode.getProblem().getActions();
              goalState = true;
            } else {
              extractedNodeChilds.forEach(child => {
                this.stack.push(child);
              });
            }
          }
        }
        return response;
      }
}

module.exports = DeepFirst;