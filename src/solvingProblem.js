const {loadLevel, loadLevelsFromFolder} = require('./readingProblem.js')
const BreadthFirst = require('./searchAlgorithms/breadthFirst.js')
const DeepFirst = require('./searchAlgorithms/deepFirst.js')
const UniformCost = require('./searchAlgorithms/uniformCost.js')
const cloneDeep = require('lodash/cloneDeep');

const StateNode = require('./dataStructures/stateNode.js');

function solveOneLevel(level, absoluteRoute=undefined){
    let actionsOutput = '';
    const {agent, problem} = loadLevel(level, absoluteRoute)

    const rootNode =  new StateNode(agent, problem);
    
    const breadthFirst = new BreadthFirst(cloneDeep(rootNode));
    const deepFirst = new DeepFirst(cloneDeep(rootNode));
    const uniformCost = new UniformCost(cloneDeep(rootNode));
    
    actionsOutput =
        breadthFirst.searchGoalState().join('')+'\n'+
        deepFirst.searchGoalState().join('')+'\n'+
        uniformCost.searchGoalState().join('')+'\n';
    
    return actionsOutput;
}

function solveLevels(absoluteRoute=undefined){
    let rootNodes = [];
    let actionsOutput = '';
    const levelsFounded = loadLevelsFromFolder(absoluteRoute);
    levelsFounded.forEach((level)=>{
        const {agent, problem} = level;
        const rootNode =  new StateNode(agent, problem);
        rootNodes.push(rootNode);
    })
    
    rootNodes.forEach(root =>{
        const breadthFirst = new BreadthFirst(cloneDeep(root));
        const deepFirst = new DeepFirst(cloneDeep(root));
        const uniformCost = new UniformCost(cloneDeep(root));
        let actionsPack = 
        breadthFirst.searchGoalState().join('')+'\n'+
        deepFirst.searchGoalState().join('')+'\n'+
        uniformCost.searchGoalState().join('')+'\n';

        actionsOutput = actionsOutput.concat(actionsPack);
    })
    return actionsOutput;
}
console.log(solveOneLevel('nivel4.txt'));
console.log("///////////////////////");
console.log(solveLevels())

