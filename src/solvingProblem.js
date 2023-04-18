const {agent, problem} = require('./readingProblem.js')
const BreadthFirst = require('./searchAlgorithms/breadthFirst.js')
const DeepFirst = require('./searchAlgorithms/deepFirst.js')
const UniformCost = require('./searchAlgorithms/uniformCost.js')
const cloneDeep = require('lodash/cloneDeep');

const StateNode = require('./dataStructures/stateNode.js')
const rootNode =  new StateNode(agent, problem);

const breadthFirst = new BreadthFirst(cloneDeep(rootNode));
const deepFirst = new DeepFirst(cloneDeep(rootNode));
const uniformCost = new UniformCost(cloneDeep(rootNode));

console.log(breadthFirst.searchGoalState().join(''))
console.log(deepFirst.searchGoalState().join(''))
console.log(uniformCost.searchGoalState().join(''))