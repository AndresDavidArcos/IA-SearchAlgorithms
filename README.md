### Solución de problemas del juego SOKOBAN
Antes de empezar a usar el repositorio, se debe hacer un npm install.\n 
Para ejecutar el archivo *solvingProblem.js* se hace con node solvingProblem.js dentro del direcotrio src.\n
Para obtener las soluciones a los problemas del juego SOKOBAN, se debe usar el archivo 
*solvingProblem.js*. Este archivo tiene dos funciones:

* La función *solveOneLevel(level, absoluteRoute=undefined)* devuelve las acciones que solucionan el nivel indicado, utilizando los algoritmos de búsqueda *breadthFirst*, *deepFirst* y *uniformCost*, en ese orden.

    * En su primer parámetro recibe un string con el nombre del nivel que debe estar en un archivo de extensión *.txt*. Por ejemplo, se le puede pasar *'nivel1.txt'*.

    * El segundo parámetro es opcional. Si no se indica, la función buscará dentro de la carpeta *niveles* que está en este proyecto aquel nivel indicado en el primer parámetro. Por lo tanto, se recomienda copiar y pegar todos los niveles en esa carpeta. Si no se hace así, también se puede pasar un string con la dirección absoluta de la carpeta donde se tienen los niveles.

* La función *solveLevels(absoluteRoute=undefined)* devuelve un conjunto de 3 acciones que solucionan el problema del *SOKOBAN* usando los algoritmos breadthFirst, deepFirst y uniformCost, en ese orden. Devolvera tantos conjuntos de 3 acciones como niveles contenga el directorio.

    * En su parámetro opcional, si no se especifica, se resolverán aquellos niveles que se encuentren en el directorio niveles que está justo al lado del directorio src. Por lo tanto, se recomienda cambiar ese directorio con los niveles deseados a testear. Sin embargo, también se le puede pasar como parámetro la dirección absoluta del directorio que contiene todos los niveles a solucionar.
