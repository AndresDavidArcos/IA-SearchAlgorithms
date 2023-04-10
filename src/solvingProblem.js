const {agent, problem} = require('./readingProblem.js')
const BreadthFirsth = require('./searchAlgorithms/breadthFirst.js')

const StateNode = require('./dataStructures/stateNode.js')
const rootNode =  new StateNode(agent, problem);

const breadthFirst = new BreadthFirsth(rootNode);

console.log(breadthFirst.searchGoalState().join(''))