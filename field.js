const hat = 'H';
const hole = 'O';
const fieldCharacter = 'F';
const pathCharacter = 'P';

class Field {
  constructor(field){
    this._field = field;
    this._side = field.length;
  }
  get field(){
    return this._field;
  }
  get side(){
    return this._side;
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
          cell.style.backgroundColor = 'yellow'
        }
        else if(this.field[x][y] === 'P'){
          cell.style.backgroundColor = 'red';
        } 
        gameArea.appendChild(cell);
      }
    }
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

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

startButton.addEventListener("click", getFormData);
resetButton.addEventListener("click", reset);

function getFormData(){
  const data = new FormData(document.querySelector('form'));

  const size = data.get("size");
  const percentage = data.get("percentage");

  const board = new Field(Field.generateField(size, percentage));

  board.createBoard();
}

function reset(){
  let gameArea = document.getElementById('board');
  gameArea.innerHTML = "";
}
