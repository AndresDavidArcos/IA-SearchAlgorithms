const BoxAgent = require('../agent.js');
const BoxesProblem = require('../problem.js');
const cloneDeep = require('lodash/cloneDeep');

class StateNode{
    constructor(agent, problem, depth = 0){
        this.agent = agent;
        this.problem = problem;
        this.depth = depth;
    }
    getDepth(){
        return this.depth;
    }

    getProblem(){
        return this.problem
    }
    getAgent(){
        return this.agent
    }

   getCosts(){
        return this.problem.getCosts();
   }

   addDepth(){
    this.depth++;
    }

    debugNode(){
        return {
            'agentPos': this.agent.getPosition(),
            'boxesPos': this.problem.getBoxesPosition(),
            'world': this.problem.getWorld(),
            'actions': this.problem.getActions()
    }
    }

    isGoal(){
        return this.problem.isGoal();
    }

    expand(){
        if(this.problem.isGoal()){
            return true;
        }else{
            let perceptions = this.problem.makePerceptions();
            this.agent.receive(perceptions)
            let agentActions = this.agent.send()
            const statesHistory = this.problem.getStatesHistory();
            const world = this.problem.getWorld();
            const boxesPosition = this.problem.getBoxesPosition();
            const agentPosition = this.agent.getPosition();
            const actions = this.problem.getActions();
            const costs = this.problem.getCosts();

               const childStates = agentActions.map(action => {
                let newAgent = new BoxAgent(cloneDeep(agentPosition));
                let newProblem = new BoxesProblem(world, cloneDeep(boxesPosition), newAgent, statesHistory, cloneDeep(actions), costs); 
                newProblem.updateState(action)
               return new StateNode(newAgent, newProblem);
            });

            return childStates;
        }
    }
}

module.exports = StateNode;