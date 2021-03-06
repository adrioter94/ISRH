var dict_str = "ABCDE"

class Letter {
  constructor(name, prob){
    this.name = name
    this.prob = prob
  }
  toString(){
    return String(this.name)
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

function huffman(){
  resetDictCoded()
  resetTableCoded()
  var chain = document.getElementById('chain').value.toUpperCase();
  if (!isValid(chain)){
    alert("Cadena inválida: El diccionario es " + toString(dict))
    return false
  }
  getCode(dict)
  meanLong()
  insertTable()
  document.getElementById("huffman_code").innerHTML = "<b> Cadena " + chain + " = ";
  for (var s in chain) {
    document.getElementById("huffman_code").innerHTML += dict_coded[chain[s]];
  }
}

function runScript(e) {
  if(e.keyCode == 13) {
    huffman()
  }
}

function resetDictCoded() {
  dict_coded["A"] = "";
  dict_coded["B"] = "";
  dict_coded["C"] = "";
  dict_coded["D"] = "";
  dict_coded["E"] = "";
}

function resetTableCoded() {
  document.getElementById("coded_table").innerHTML = "";
}

function isValid(chain){
  if (chain == "") {
    return false
  }
  for (var i = 0; i < chain.length; i++) {
    if (!dict_str.includes(chain[i])){
      return false
    }
  }
  return true
}

function toString(dict) {
  var str = "";
  for(i in dict) {
    str += dict[i].toString() + ", "
  }
  return str
}

function getCode(arr) {
  if (arr.length == 1) {
    return true
  }
  sort_arr = sort(arr)
  var new_arr = []
  var letter, left, rigth
  left = sort_arr[0]
  right = sort_arr[1]
  if (right == undefined) {
    new_arr.push(left)
    return new_arr
  }
  for(var i = 2; i < sort_arr.length; i++) {
    new_arr.push(sort_arr[i])
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
  return sort_arr
}

function insertTable() {
  var table = document.getElementById("coded_table");
  table.innerHTML += `<tr>
    <th>Símbolo (s) </th>
    <th>Código </th>
  </tr>`
  for (l in dict_coded) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = l;
    cell2.innerHTML = dict_coded[l];
  }
}

function entropy() {
  var sum = 0;
  for (l in dict) {
    sum += -Math.log2(dict[l].prob)*dict[l].prob
  }
  document.getElementById("entropy").innerHTML = "<b>Entropía<b> = " + sum.toFixed(5) + " bits/símbolo";
}

function meanLong() {
  var sum = 0
  for (l in dict) {
    sum += dict_coded[dict[l].name].length*dict[l].prob
  }
  document.getElementById("long").innerHTML = "<b>Longitud media = " + sum.toFixed(3) + " bits/símbolo";
}
