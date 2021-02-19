function updatePercInput(val){
  //document.getElementById('percValue').innerHTML = "changed";
  var modeLabel = document.getElementById('percValue');
  if(val == 0){
    modeLabel.innerHTML = 'Baby';
  }
  else if(val == 10){
    modeLabel.innerHTML = 'Easy';
  }
  else if(val == 20){
    modeLabel.innerHTML = 'Medium';
  }
  else if(val == 30){
    modeLabel.innerHTML = 'Hard';
  } 
  else if(val == 40){
    modeLabel.innerHTML = 'Expert';
  } 
  else{
    modeLabel.innerHTML = 'Impossible';
  }  
}

function updateSizeInput(val){
  var sizeLabel = document.getElementById('sizeValue');
  sizeLabel.innerHTML = val + " by " + val;  
}

