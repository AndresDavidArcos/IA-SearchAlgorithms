/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class BoxAgent{
    constructor(initialPosition) {
        this.currentPosition= initialPosition;
        //LEFT, UP, RIGHT, DOWN, CELL
        this.table = {
            "0,0,0,0": ["LEFT","UP", "RIGHT", "DOWN"],
            "0,0,0,W": ["LEFT","UP", "RIGHT"],
            "0,0,W,0": ["LEFT","UP", "DOWN"],
            "0,0,W,W": ["LEFT","UP"],
            "0,W,0,0": ["LEFT", "RIGHT", "DOWN"],
            "0,W,0,W": ["LEFT", "RIGHT"],
            "0,W,W,0": ["LEFT", "DOWN"],
            "0,W,W,W": ["LEFT"],
            "W,0,0,0": ["UP", "RIGHT", "DOWN"],
            "W,0,0,W": ["UP", "RIGHT"],
            "W,0,W,0": ["UP", "DOWN"],
            "W,0,W,W": ["UP"],
            "W,W,0,0": ["RIGHT", "DOWN"],
            "W,W,0,W": ["RIGHT"],
            "W,W,W,0": ["DOWN"],
        };
        
    }
    updateProblem(problem){
        this.problem = problem;
    }

    updatePosition(pos){
        this.currentPosition = pos;
    }

    getPosition(){
        return this.currentPosition;
    }

    receive(inputs) {
        this.perception = inputs;
    }

    send() {
        const [LEFT, UP, RIGTH, DOWN] = this.perception;
        const movementKey = this.perception.map(val => val === 'B' ? '0' : val)
        const possibleActions = this.table[movementKey]
        // Verifica si hay una caja en la dirección correspondiente y concatena "ANDMOVEBOX" si es así.
        const actionsWithBox = possibleActions.map(action => {
            const direction = (action === 'LEFT') ? LEFT :
                            (action === 'UP') ? UP :
                            (action === 'RIGHT') ? RIGTH :
                            DOWN;
            return (direction === 'B') ? action + 'ANDMOVEBOX' : action;
  });
  
  const actionsWithoutRepetitions = actionsWithBox.filter(action => {
    const {newAgentPosition, boxesPosition} = this.problem.howIsStateAfterAgentAction(this.currentPosition, action);
    return !(this.problem.stateHappened({agentPosition: newAgentPosition, boxesPosition}))
  })


  return actionsWithoutRepetitions;
}


}

module.exports = BoxAgent;