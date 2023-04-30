class BoxesProblem{
      /**
     * Constructor de la clase BoxesProblem
     * @param {Array2d} world - Una matriz que representa el mundo en el que se desarrolla el problema.
     * @param {Array} boxesPosition - Un arreglo que contiene las coordenadas de las cajas en el mundo.
     * @param {Object} agent - Un objeto que representa el agente del problema.
     * @param {Object} statesHistory - Un objeto que representa el historial de estados del problema.
     * @param {Array} actions - Un arreglo que contiene las acciones del agente.
     * @param {number} costs - Un número que representa el costo total del problema.
     */
    constructor(world, boxesPosition, agent, statesHistory = null, actions = [], costs = 0){
        this.world = world;
        this.boxesPosition = boxesPosition;
        this.agent = agent;
        this.actions = actions;
        this.costs = costs;
      
        if (statesHistory === null) {
          this.statesHistory = {[this.obtainHashKey({agentPosition: agent.getPosition(), boxesPosition})]: null};
      } else {
          this.statesHistory = statesHistory;
      }   

        this.createGoalsCoordinates();
        this.agent.updateProblem(this); 
    }

    getStatesHistory(){
        return this.statesHistory;
    }
    
    getBoxesPosition(){
      return this.boxesPosition;
    }

    getWorld(){
      return this.world;
    }

    getActions(){
      return this.actions;
    }

    getCosts(){
      return this.costs;
    }
      /**
     * Genera las percepciones del agente en el estado actual del problema.
     * Solo tendra en cuenta la posicion justo arriba, abajo, izquierda o derecha del agente.
     * Devolvera B si al lado hay una caja que puede mover, W si hay un muro o 0 si hay un espacio vacio.
     * @returns {Array} - Un arreglo que contiene las percepciones del agente.
     */
    makePerceptions() {
        const [agenty, agentx] = this.agent.getPosition();
      
        const left = this.world[agenty][agentx-1];
        const right = this.world[agenty][agentx+1];
        const up = this.world[agenty-1][agentx];
        const down = this.world[agenty+1][agentx];
      
        const perceptionVector = [left, up, right, down];
      
        const agentPerceptions = perceptionVector.map((val, index) => {
            if (val != 'W') {
              // Is there a box in this position?
              switch (index) {
                case 0:
                  //left
                  if (this.searchBox(agenty, agentx-1)) {
                    //there is a box to the left, so now, is there a wall or a box to the left of the box?
                    return (agentx-2 >= 0 && (this.world[agenty][agentx-2] === 'W' || this.searchBox(agenty, agentx-2))) ? 'W' : 'B';
                  } else {
                    return '0'; // there's no box, just return the original value
                  }
                  break;
                case 1:
                  //up
                  if (this.searchBox(agenty-1, agentx)) {
                    //there is a box above, so now, is there a wall above the box?
                    return (agenty-2 >= 0 && (this.world[agenty-2][agentx] === 'W' || this.searchBox(agenty-2, agentx))) ? 'W' : 'B';
                  } else {
                    return '0';
                  }
                  break;
                case 2:
                  //right
                  if (this.searchBox(agenty, agentx+1)) {
                    //there is a box to the right, so now, is there a wall to the right of the box?
                    return (agentx+2 < this.world[agenty].length && (this.world[agenty][agentx+2] === 'W' || this.searchBox(agenty, agentx+2))) ? 'W' : 'B';
                  } else {
                    return '0';
                  }
                  break;
                case 3:
                  //down
                  if (this.searchBox(agenty+1, agentx)) {
                    //there is a box below, so now, is there a wall below the box?
                    return (agenty+2 < this.world.length && (this.world[agenty+2][agentx] === 'W' || this.searchBox(agenty+2, agentx))) ? 'W' : 'B';
                  } else {
                    return '0';
                  }
                  break;
                default:
                  console.log("problem.js makePerceptions error")
                  break;
              }
            } else {
              // it's just a wall
              return 'W';
            }
          });
        return agentPerceptions;
          

    }
      /**
      Busca una caja en la posición dada por las coordenadas (y, x) y devuelve true si la encuentra y false si no la encuentra.
      @param {number} y - La posición vertical de la caja.
      @param {number} x - La posición horizontal de la caja.
      @returns {boolean} - Devuelve true si encuentra una caja en la posición dada, de lo contrario false.
      */
      searchBox(y, x) {   
          return this.boxesPosition.some(posArr => posArr[0] === y && posArr[1] === x);
        }
      /**
      Obtiene una clave única en forma de cadena de caracteres que representa el estado actual del problema, dadas las posiciones del agente y de las cajas.
      @param {Object} state - Un objeto que contiene la posición actual del agente y de las cajas.
      @returns {string} - La clave única que representa el estado actual del problema.
      */
      obtainHashKey(state){
        const {agentPosition, boxesPosition} = state; 
        const key = `${agentPosition.join(',')}-${boxesPosition.map(box => box.join(',')).join('-')}`
        return key;
    }
    /**
    Calcula el nuevo estado del problema después de que el agente realice una acción. Devuelve un objeto que contiene las nuevas posiciones del agente y de las cajas.
    @param {Object} agentPosition - Un objeto que contiene la posición actual del agente.
    @param {string} action - Una cadena que representa la acción que el agente realiza.
    @returns {Object} - Un objeto que contiene las nuevas posiciones del agente y de las cajas.
    */
    howIsStateAfterAgentAction(agentPosition, action){
        const [agentY, agentX] = agentPosition;
        let newAgentPosition = [agentY, agentX];
        let boxesPosition = [...this.boxesPosition];
        switch (action) {
            case 'LEFT':
              newAgentPosition = [agentY, agentX - 1];
              break;
            case 'UP':
              newAgentPosition = [agentY - 1, agentX];
              break;
            case 'RIGHT':
              newAgentPosition = [agentY, agentX + 1];
              break;
            case 'DOWN':
              newAgentPosition = [agentY + 1, agentX];
              break;
            case 'LEFTANDMOVEBOX':
              newAgentPosition = [agentY, agentX - 1];
              const boxLeftIndex = boxesPosition.findIndex(box => box[0] === agentY && box[1] === agentX - 1);
              boxesPosition[boxLeftIndex] = [agentY, agentX - 2];                
              break;
            case 'UPANDMOVEBOX':
              newAgentPosition = [agentY - 1, agentX];
              const boxUpIndex = boxesPosition.findIndex(box => box[0] === agentY - 1 && box[1] === agentX);
              boxesPosition[boxUpIndex] = [agentY - 2, agentX];                
              break;
            case 'RIGHTANDMOVEBOX':
              newAgentPosition = [agentY, agentX + 1];
              const boxRightIndex = boxesPosition.findIndex(box => box[0] === agentY && box[1] === agentX + 1);
              boxesPosition[boxRightIndex] = [agentY, agentX + 2];                
              break;
            case 'DOWNANDMOVEBOX':
              newAgentPosition = [agentY + 1, agentX];
              const boxDownIndex = boxesPosition.findIndex(box => box[0] === agentY + 1 && box[1] === agentX);
              boxesPosition[boxDownIndex] = [agentY + 2, agentX];                
              break;
            default:
              console.log('Invalid action');
              break;
          }
          
        
        return {newAgentPosition, boxesPosition};
    }
    /**
    * Comprueba si el estado dado ya ha sucedido en la historia de los estados del problema. 
    * Devuelve true si el estado ha sucedido antes y false si es un nuevo estado.
    @param {string} state - La clave única que representa el estado actual del problema.
    @returns {boolean} - Devuelve true si el estado ya ha sucedido antes, de lo contrario false.
    */
    stateHappened(state){
       return (this.statesHistory[this.obtainHashKey(state)] === null)
    }

    /**
    * Actualiza el estado del problema después de que el agente realice una acción. 
    * Actualiza la posición del agente y de las cajas, 
    * y agrega el nuevo estado a la historia de los estados.
    @param {string} action - Una cadena que representa la acción que el agente realiza.
    */
    updateState(action){
     const {newAgentPosition, boxesPosition} = this.howIsStateAfterAgentAction(this.agent.getPosition(), action);
     this.agent.updatePosition(newAgentPosition);
     this.boxesPosition = boxesPosition;
     this.statesHistory[this.obtainHashKey({agentPosition: newAgentPosition, boxesPosition})] = null;
     if(action[action.length] === 'X'){
      this.costs++;
    }else{
      this.costs += 2;
    }
      //formatting action for achieve the requeries project output     
     this.actions.push(action[0]);

    }
    /**
    * Crea un arreglo con las coordenadas de todas las metas (las posiciones de las cajas objetivo)
    * en el problema.
    @returns {Array} - Un arreglo que contiene las coordenadas de todas las metas en el problema.
    */
    createGoalsCoordinates(){
      let goalsCoordinates = []
      for(let i = 0; i < this.world.length; i++){
        for(let j = 0; j < this.world[i].length; j++){
          if(this.world[i][j] === 'X'){
              goalsCoordinates.push([i,j]);
          }
        }
       }
      this.goalsCoordinates = goalsCoordinates;
      }
      /**
      * Comprueba si todas las cajas están en una posición meta.
      @returns {boolean} - Devuelve true si todas las cajas están en una posición meta, de lo contrario false.
      */
      isGoal(){
        const goalsHash = {};
        for (let i = 0; i < this.goalsCoordinates.length; i++) {
          const [yGoal, xGoal] = this.goalsCoordinates[i];
          const goalKey = `${yGoal},${xGoal}`;
          goalsHash[goalKey] = null;
        }
        for (let iBox = 0; iBox < this.boxesPosition.length; iBox++) {
          const [yBox, xBox] = this.boxesPosition[iBox];
          const boxKey = `${yBox},${xBox}`;

          if (goalsHash[boxKey] !== null) {
            return false;
          }
        }
        return true;
    }
  }      

module.exports = BoxesProblem;