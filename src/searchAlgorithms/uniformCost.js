const CostsArray = require('../dataStructures/costsArray.js')

class UniformCost{
    constructor(rootNode){
        this.costsArray = new CostsArray();
        this.costsArray.add(rootNode);
    }

      searchGoalState() {
        let goalState = false;
        let failState = false;
        let response = ["Error: el agente no ha podido encontrar el estado meta"]
        while (!goalState && !failState) {
          if (this.costsArray.isEmpty()) {
            failState = true;
          } else {
            const extractedNode = this.costsArray.retrieveMinNode();
            const extractedNodeChilds = extractedNode.expand();
            if (extractedNodeChilds === true) {
              response = extractedNode.getProblem().getActions();
              goalState = true;
            } else {
              extractedNodeChilds.forEach(child => {
                this.costsArray.add(child);
              });
            }
          }
        }
        return response;
      }
}

module.exports = UniformCost;