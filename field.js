const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field){
    this._field = field;
  }
  get field(){
    return this._field;
  }
  print(){
    for(let i = 0; i < this.field.length; i++){
      console.log(this.field[i].join(''));
    }
  }
  static generateField(height, width, percentage){
    const field = [];
    for(let i = 0; i < height; i++){
      const row = [];
      for(let j = 0; j < width; j++){
        const chance = Math.floor(Math.random() * 100);
        if(chance > percentage*100){
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
      hatX = Math.floor(Math.random() * height);
      hatY = Math.floor(Math.random() * width);
      startX = Math.floor(Math.random() * height);
      startY = Math.floor(Math.random() * width);
    }while(hatX === startX && hatY === startY);
    field[hatX][hatY] = hat;
    field[startX][startY] = pathCharacter;
    return field;
  }
}

/* web app side */


