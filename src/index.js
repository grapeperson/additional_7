module.exports = function solveSudoku(matrix) {
  function getUniqueElems(A){
    let n = A.length, B = [];
    for (let i = 1, j = 0, t; i < n+1; i++){
      if (A[i-1] === A[ i ]) t = A[i-1];
      if (A[i-1] !== t) B[j++] = A[i-1];
     }
    return B;
  }
  let numbers = [1,2,3,4,5,6,7,8,9];
  function oneNumber(){
    for(let i=0,length=matrix.length;i<length;i++){
      for(let x=0;x<length;x++){
        let option = numbers.slice();
        if(matrix[i][x]==0 || matrix[i][x].length>=2){
          for(let key in matrix[i]){
            if(option.indexOf(matrix[i][key])!=-1){
               let index = option.indexOf(matrix[i][key]);
               option.splice(index,1);
            }
          }
          for(let e=0;e<length;e++){
            if(option.indexOf(matrix[e][x])!=-1){
              let index = option.indexOf(matrix[e][x]);
              option.splice(index,1);
            }
          }
          let line,column;
          if(i<=2 && x<=2 ){line=0;column=0;
          }else if(i<=2 && x>2 && x<=5){line=0;column=3;
          }else if(i<=2 && x>5 && x<=8){line=0;column=6;
          }else if(i>2 && i<=5 && x<=2){line=3;column=0;
          }else if(i>2 && i<=5 && x>2 && x<=5){line=3;column=3;
          }else if(i>2 && i<=5 && x>5 && x<=8){line=3;column=6;
          }else if(i>5 && i<=8 && x<=2){line=6;column=0;
          }else if(i>5 && i<=8 && x>2 && x<=5){line=6;column=3;
          }else if(i>5 && i<=8 && x>5 && x<=8){line=6;column=6;
          }
          for(let l=line;l<=line+2;l++){
            for(let c=column;c<=column+2;c++){
              if(option.indexOf(matrix[l][c])!=-1){
                let index = option.indexOf(matrix[l][c]);
                option.splice(index,1);
              }
            }
          }
         if (option.length==1){
           matrix[i][x]=option[0];
           i=0;
           x=0;
          }else{
            matrix[i][x]=option;

         }
        }
      }
    }
  }
  function uniqNumber(){
    for(let i=0,length=matrix.length;i<length;i++){
      for(let x=0;x<length;x++){
        if (matrix[i][x].length>=2){
          let allOptionsHorizon =[];
          let allOptionsVertical =[];
          for(let key in matrix[i]){
            if(matrix[i][key].length>=2){
               allOptionsHorizon=matrix[i][key].concat(allOptionsHorizon)
            }
            if(matrix[i][key]==0 || matrix[i][key].length==1){
              allOptionsHorizon=[];
              break;
            }
          }
          for(let e=0;e<length;e++){
            if(matrix[e][x].length>=2){
               allOptionsVertical=matrix[e][x].concat(allOptionsVertical)
            }
            if(matrix[e][x]==0 || matrix[e][x].length==1){
              allOptionsVertical=[];
              break;
            }
          }
          if(getUniqueElems(allOptionsHorizon.sort()).length==1){
            let  hidenHorizonNumber= getUniqueElems(allOptionsHorizon.sort())[0];
            for(let key in matrix[i]){
              if(matrix[i][key].length>=2){
                if(matrix[i][key].indexOf(hidenHorizonNumber)!=-1){
                  matrix[i][key]=hidenHorizonNumber;
                  oneNumber()
                }
              }
            }
          }
          if(getUniqueElems(allOptionsVertical.sort()).length==1){
            let  hidenVerticalNumber= getUniqueElems(allOptionsVertical.sort())[0];
            for(let e=0;e<length;e++){
              if(matrix[e][x].length>=2){
                if(matrix[e][x].indexOf(hidenVerticalNumber)!=-1){
                  matrix[e][x]=hidenVerticalNumber;
                  oneNumber()
                }
              }
            }
          }
        }
      }
    }
  }
  oneNumber();
  uniqNumber();
  return(matrix);
}
