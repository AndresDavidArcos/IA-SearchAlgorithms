const Stack = require('../dataStructures/stack.js')

class DeepFirst{
    constructor(rootNode){
        this.stack = new Stack();
        this.stack.push(rootNode);
    }

    searchGoalState(maxDepth = 64) {
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
            } else if(extractedNode.getDepth() < maxDepth){

              extractedNodeChilds.forEach(child => {
                child.addDepth();
                this.stack.push(child);
              });
            }
          }
        }
        return response;
      }
}

module.exports = DeepFirst;