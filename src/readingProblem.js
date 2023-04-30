const BoxAgent = require('./agent.js');
const BoxesProblem = require('./problem.js')
const fs = require('fs');
const path = require('path');

   function loadLevel(levelName, absoluteRoute=undefined) {
    let level;
    if(!absoluteRoute){
     level = fs.readFileSync(path.join(__dirname, `../niveles/${levelName}`), 'utf-8');
    }else{
      const level = fs.readFileSync(absoluteRoute+levelName, 'utf-8');
    }
    const lines = level.replace(/\r/g, '').split('\n');

    let lastLineWithContent = lines.length - 1;
    while (lines[lastLineWithContent].trim() === '') {
      lastLineWithContent--;
    }
    lines.splice(lastLineWithContent + 1);

    let numberOfRowsInMatrix = lastLineWithContent - 1;
    while(lines[numberOfRowsInMatrix].includes(',')){
      numberOfRowsInMatrix--;
    }

    const matrix = [];
    for (let i = 0; i <= numberOfRowsInMatrix; i++) {
      matrix[i] = lines[i].split('');
    }

    const agentPosition = lines[numberOfRowsInMatrix + 1].split(',').map(Number);

    const boxesPosition = [];
    for (let i = numberOfRowsInMatrix + 2; i < lines.length; i++) {
      boxesPosition.push(lines[i].split(',').map(Number));
    }

    const agent = new BoxAgent(agentPosition);
    const problem = new BoxesProblem(matrix, boxesPosition, agent);

    return { agent, problem };
  }

  function loadLevelsFromFolder(absoluteRoute = undefined) {
    const levels = [];
    let files;
    if(!absoluteRoute){
       files = fs.readdirSync(path.join(__dirname, `../niveles/`), 'utf-8');
    }else{
      files = fs.readdirSync(absoluteRoute, 'utf-8');
    }
  
    for (const file of files) {
      const { agent, problem } = loadLevel(file, absoluteRoute);
      levels.push({ agent, problem });
    }

    return levels;
  }

module.exports = {loadLevel, loadLevelsFromFolder};
