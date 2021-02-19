const hat = 'H';
const hole = 'O';
const fieldCharacter = 'F';
const pathCharacter = 'P';

class Field {
  constructor(field){
    this._field = field;
    this._side = field.length;
    this._goal = [];
    this._start = [];
    this._position = [];
  }
  //getter and setter methods
  get field(){
    return this._field;
  }
  get side(){
    return this._side;
  }
  get goal(){
    return this._goal;
  }
  get start(){
    return this._start;
  }
  get position(){
    return this._position;
  }
  set goal(coord){
    this._goal = coord;
  }
  set start(coord){
    this._start = coord;
  }
  set position(coord){
    this._position = coord;
  }

  print(){
    //console print
    for(let i = 0; i < this.field.length; i++){
      console.log(this.field[i].join(''));
    }
  }

  toString(){
    let ret_string = "";
    for(let i = 0; i < this.field.length; i++){
      ret_string += this.field[i].join('') + "\n";
    }
    return ret_string;
  }

  createBoard(){
    /*
    description: created the board interface
    */
    let gameArea = document.getElementById('board');
    gameArea.innerHTML = "";
    gameArea.style['grid-template-rows'] = 'repeat(' + this.side + ' , 1fr)';
    gameArea.style['grid-template-columns'] = 'repeat(' + this.side + ' , 1fr)';
    
    for(let x = 0; x < this.side; x++){
      for(let y = 0; y < this.side; y++){
        let cell = document.createElement('div');
        cell.id = `cell${x},${y}`;
        cell.className = "cell";
        cell.style['grid-row'] = x+1 + " / span 1";
        cell.style['grid-column'] = y+1 + " / span 1";
  
        if(this.field[x][y] === 'O'){
          cell.style.backgroundColor = '#222222';
        }
        else if(this.field[x][y] === 'H'){
          cell.style.backgroundColor = 'goldenrod'
          this.goal = [x, y];
        }
        else if(this.field[x][y] === 'P'){
          cell.style.backgroundColor = 'crimson';
          this.start = [x, y];
          this.position = this.start;
        } 
        gameArea.appendChild(cell);
      }
    }
  }

  movePlayer(direction){
    /*
    description: moves player position
    */
    if(!this.validateMove(direction)){
      logger('error', 'bad move')
      return;
    }

    const previous = [this.position[0], [this.position[1]]];
    if(direction === 'up'){
      this.position[0]--;
    }
    else if(direction === 'down'){
      this.position[0]++;
    }
    else if(direction === 'right'){
      this.position[1]++;
    }
    else if(direction === 'left'){
      this.position[1]--;
    }
    
    let cell = document.getElementById('cell' + this.position[0] + ',' + this.position[1]);
    let previousCell = document.getElementById('cell' + previous[0] + ',' + previous[1]);
    previousCell.style.backgroundColor = 'lightSalmon'
    if(this.field[this.position[0]][this.position[1]] === 'O'){
      //lose
      cell.style.backgroundColor = "DarkRed";
      let header = document.getElementById('header');
      let text = document.getElementById('h1-text');
      text.innerHTML = 'You fell in a hole!';
      header.style.backgroundColor = 'DarkRed';
      document.querySelector('body').removeEventListener('keydown', keyPressed);
    }
    else if(this.field[this.position[0]][this.position[1]] === 'H'){
      //win
      cell.style.backgroundColor = "darkgoldenrod";
      let text = document.getElementById('h1-text');
      let header = document.getElementById('header');
      text.innerHTML = 'You found your hat!';
      header.style.backgroundColor = 'goldenrod';
      document.querySelector('body').removeEventListener('keydown', keyPressed);
    }
    else{
      cell.style.backgroundColor = 'crimson';
    }
  }

  validateMove(direction){
    /*
    description: checks if player can move in that direction
    */
    if(direction === 'up'){
      if(this.position[0] == 0){
        return false;
      }
    }
    else if(direction === 'down'){
      if(this.position[0] == this.side-1){
        return false;
      }
    }
    else if(direction === 'right'){
      if(this.position[1] == this.side-1){
        return false;
      }
    }
    else if(direction === 'left'){
      if(this.position[1] == 0){
        return false;
      }
    }
    return true;
  }

  static generateField(size, percentage){
    if(percentage > 100){
      percentage *= 100;
    }
    
    const field = [];
    for(let i = 0; i < size; i++){
      const row = [];
      for(let j = 0; j < size; j++){
        const chance = Math.floor(Math.random() * 100);
        if(chance > percentage){
          row.push(fieldCharacter);
        }
        else{
          row.push(hole);
        }
      }
      field.push(row);
    }

    let hatX, hatY, startX, startY;
    do{
      hatX = Math.floor(Math.random() * size);
      hatY = Math.floor(Math.random() * size);
      startX = Math.floor(Math.random() * size);
      startY = Math.floor(Math.random() * size);
    }while(hatX === startX && hatY === startY);
    field[hatX][hatY] = hat;
    field[startX][startY] = pathCharacter;
    return field;
  }
}

/* start button */
const startButton = document.getElementById('start');
startButton.addEventListener("click", getFormData);

let board;

function getFormData(){
  const data = new FormData(document.querySelector('form'));

  const size = data.get("size");
  const percentage = data.get("percentage");

  board = new Field(Field.generateField(size, percentage));

  board.createBoard();
  document.getElementById('debug').innerHTML = "";
  //logger('size', board.side);
  //logger('start', board.start);
  //logger('position', board.position);
  //logger('goal', board.goal);

  /* controls */
  document.querySelector('body').addEventListener('keydown', keyPressed);
}

function keyPressed(e){
  let direction;
  if(e.keyCode == 87 || e.keyCode == 38)//up
    direction = 'up';
  else if(e.keyCode == 83 || e.keyCode == 40) //down
    direction = 'down';
  else if(e.keyCode == 68 || e.keyCode == 39) //right
    direction = 'right';
  else if(e.keyCode == 65 || e.keyCode == 37) //left
    direction = 'left';
    
  //keyPressed(direction);
  //changeLogger('position_log', board.position);
  board.movePlayer(direction);
}

/* reset button */
const resetButton = document.getElementById('reset');
resetButton.addEventListener("click", reset);

function reset(){
  let gameArea = document.getElementById('board');
  gameArea.innerHTML = "";
  document.getElementById('debug').innerHTML = "";
  board.createBoard();
  document.querySelector('body').addEventListener('keydown', keyPressed);
  board.position = board.start;

  let header = document.getElementById('header');
  let text = document.getElementById('h1-text');
  text.innerHTML = 'Find your hat!';
  header.style.backgroundColor = 'limegreen';

  /* debug */
  //logger('size', board.side);
  //logger('start', board.start);
  //logger('position', board.position);
  //logger('goal', board.goal);
}

/* logger */
function logger(name, data){
  let loggingArea = document.getElementById('debug');
  let log = document.createElement('p');
  log.id = name + '_log';
  log.innerHTML = name + ": " + data;
  loggingArea.appendChild(log);
}
function changeLogger(name, data){
  let logLine = document.getElementById(name);
  logLine.innerHTML = 'position: ' + data;
}