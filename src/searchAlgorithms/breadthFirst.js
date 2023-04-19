const Queue = require('../dataStructures/queue.js')
const readline = require('readline');

class BreadthFirst{
    constructor(rootNode){
        this.queue = new Queue();
        this.queue.enqueue(rootNode);
    }

    searchGoalState(maxDepth = 64) {
        let goalState = false;
        let failState = false;
        let response = ["Error: el agente no ha podido encontrar el estado meta"]
        while (!goalState && !failState) {
          if (this.queue.isEmpty()) {
            failState = true;
          } else {
            const extractedNode = this.queue.dequeue();
            const extractedNodeChilds = extractedNode.expand();
            if (extractedNodeChilds === true) {
              response = extractedNode.getProblem().getActions();
              goalState = true;
            } else if(extractedNode.getDepth() < maxDepth){
              extractedNodeChilds.forEach(child => {
                child.addDepth();
                this.queue.enqueue(child);
              });
            }
          }
        }
        return response;
      }

    async interactiveSearchGoalState() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
    
        let goalState = false;
        let failState = false;
          let contador = 0;
        while (!goalState && !failState) {
            contador++;
          const answer = await new Promise(resolve => {
            rl.question('¿Desea ejecutar una iteración sobre el método searchGoalState? (y/n): ', resolve);
          });

          if (answer.toLowerCase() === 'n') {
            break;
          }

          if (this.queue.isEmpty()) {
            failState = true;
          } else {
            const extractedNode = this.queue.dequeue();
            console.log("NODO EXTRAIDO: ", extractedNode.debugNode(), "fin nodo extraido");
            const extractedNodeChilds = extractedNode.expand();
            if(extractedNodeChilds === true){
                console.log("GOL DEL AMERICA");
                goalState = true;
            }else{
                extractedNodeChilds.forEach(child => {
                    this.queue.enqueue(child);
                  });
            }

            
          }
        }
    
        rl.close();
        console.log(contador)
        return goalState;
      }


}

module.exports = BreadthFirst;