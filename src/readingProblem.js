const BoxAgent = require('./agent.js');
const BoxesProblem = require('./problem.js')
const fs = require('fs');
const path = require('path');

const nivelActual = 'nivel4.txt'
const nivel = fs.readFileSync(path.join(__dirname, '../niveles/'+nivelActual), 'utf-8')
const lineas = nivel.replace(/\r/g, '').split('\n');

let ultimaLineaConContenido = lineas.length - 1;
while (lineas[ultimaLineaConContenido].trim() === '') {
  ultimaLineaConContenido--;
}
lineas.splice(ultimaLineaConContenido + 1);

let numeroDeFilasMatriz = lineas.length -1;
while(lineas[numeroDeFilasMatriz].includes(',')){
  numeroDeFilasMatriz--;
}

const matriz = [];
for (let i = 0; i <= numeroDeFilasMatriz; i++) {
  matriz[i] = lineas[i].split('');
}

const agentPosition = lineas[numeroDeFilasMatriz+1].split(',').map(Number);

const boxesPosition = [];
for (let i = numeroDeFilasMatriz+2; i < lineas.length; i++) {
  boxesPosition.push(lineas[i].split(',').map(Number));
}

const estado = {
  matriz: matriz,
  agentPosition: agentPosition,
  boxesPosition: boxesPosition
};
const agent = new BoxAgent(agentPosition);
const problem = new BoxesProblem(matriz, boxesPosition, agent);

module.exports = {agent, problem};




