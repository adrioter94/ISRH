var dict_str = "ABCDE"
// var dict_coded = [];


class Letter {
  constructor(name, prob, code){
    this.name = name
    this.prob = prob
    this.code = null
  }
  toString(){
    return String(this.name) + ": " + String(this.prob)
  }
}
dict_coded = {}

dict_coded["A"] = "";
dict_coded["B"] = "";
dict_coded["C"] = "";
dict_coded["D"] = "";
dict_coded["E"] = "";

var A = new Letter("A", 0.1)
var B = new Letter("B", 0.2)
var C = new Letter("C", 0.4)
var D = new Letter("D", 0.2)
var E = new Letter("E", 0.1)

var dict = []
dict.push(A)
dict.push(B)
dict.push(C)
dict.push(D)
dict.push(E)


function getCode(arr) {
  if (arr.length == 1) {
    return true
  }
  sort_arr = sort(arr)
  var new_arr = []
  var letter, left, rigth
  for (var i = 0; i < sort_arr.length; i+=2) {
    left = sort_arr[i]
    right = sort_arr[i+1]
    if (right == undefined) {
      new_arr.push(left)
      break
    }
    letter = new Letter(left.name + right.name, left.prob + right.prob)
    new_arr.push(letter)
    for(var key in dict_coded){
      if (left.name.includes(key)) {
        dict_coded[key] = "0" + dict_coded[key]
      }
      if (right.name.includes(key)) {
        dict_coded[key] = "1" + dict_coded[key]
      }
    }
  }
  getCode(new_arr)
}

function sort(arr) {
  var aux = arr.slice()
  var sort_arr = []
  var small;
  while (aux.length != 0){
    small = aux[0]
    for (var i = 1; i < aux.length; i++){
      if (aux[i].prob < small.prob) {
        small = aux[i]
      } else if (aux[i].prob == small.prob){
        if(aux[i].name.length > small.name.length) {
          small = aux[i]
        }
      }
    }
    index = aux.indexOf(small);
    if (index > -1) {
      aux.splice(index, 1);
    }
    sort_arr.push(small)
  }
//  console.log(sort_arr)
  return sort_arr
}

function huffman(){
  var chain = document.getElementById('chain').value.toUpperCase();
  if (!isValid(chain)){
    alert("Cadena inválida: El diccionario es " + dict)
    return false
  }
  getCode(dict)
  console.log(dict_coded);
  document.getElementById("huffman_code").innerHTML = chain + " = ";
  for (var s in chain) {
    document.getElementById("huffman_code").innerHTML += dict_coded[chain[s]];
    console.log(chain[s]);
  }
}

function isValid(chain){
  for (var i = 0; i < chain.length; i++) {
    if (!dict_str.includes(chain[i])){
      return false
    }
  }
  return true
}
