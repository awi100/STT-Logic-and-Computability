//==============================================================================
//= LOGIC ======================================================================
//==============================================================================

function isLiteral(express){
  return express.e1.length == 1 && express.e1 != '~' && express.e2 == null;
}

function reit(express1, express2){
  if (express1 == null || express2 == null)
    return true;
  var e1isLit = isLiteral(express1), e2isLit = isLiteral(express2);
  if (!e1isLit && !e2isLit){
    return reit(express1.e1, express2) && reit(express1.e2, express2) && reit(express1, express2.e1) && reit(express1, express2.e2);
  }
  else if (!e1isLit){
    return reit(express1.e1, express2) && reit(express1.e2, express2);
  }
  else if (!e2isLit){
    return reit(express1, express2.e1) && reit(express1, express2.e2);
  }
  var sameLit = express1.e1 == express2.e1;
  if (sameLit && express1.value != express2.value)
    return false;
  else
    return true;
}

function checkReit(){
  var first = {e1: "A", e2: null, value: true, oper: null, depth: 0};
  var second = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
                e2: {e1: "B", e2: null, value: null, oper: null, depth: 1},
                value: null, oper: "^", depth: 0};
  var third = {e1: {e1: "A", e2: null, value: false, oper: null, depth: 1},
                e2: {e1: "B", e2: null, value: null, oper: null, depth: 1},
                value: null, oper: "^", depth: 0};
  var fourth = {e1: "D", e2: null, value: true, oper: null, depth: 0};
  var fifth = {e1: {e1: "A", e2: null, value: false, oper: null, depth: 1}, e2: null, value: true, oper: "~", depth: 0}
}

//function to check if there are parens around the
//expression that are serving no purpose
function checkUselessParens(text){
  if (text.charAt(0) != '(' || text.charAt(text.length-1) != ')')
    return false;
  var level = 0, i = 0, useless = true, char;
  //if the level is 0 somewhere inside the expression before
  //the last closing paren then the parens are not useles
  for (i = 0; i < text.length-1; i++){
    char = text.charAt(i);
    if (char == '(')
      level++;
    if (char == ')')
      level--;
    if (level == 0)
      useless = false;
  }
  return useless;
}

function isOperator(char){
  return char == '|' || char == '^' || char == "&";
}

function validateInput(text){
  var level = 0, i = 0, numOfZeroDepths = 0, containsParens = false, anotherOperatorAppeared = false;
  for (i = 0; i < text.length; i++){
    var char = text.charAt(i);
    var charCode = text.charCodeAt(i);
    if (char == '('){
      containsParens = true;
      level++;
    }
    if (char == ')'){
      containsParens = true;
      level--;
    }
    if (numOfZeroDepths == 1 && isOperator(char) && level == 0) anotherOperatorAppeared = true;
    //check that you're at level 0 again after another operator appeared
    if (numOfZeroDepths > 0 && anotherOperatorAppeared && level == 0)
      numOfZeroDepths++;
    //else if you're at level 0 for the first time
    else if (level == 0 && numOfZeroDepths == 0 && isOperator(char))
      numOfZeroDepths++;
    //check for another operator appearing on level 0

    //check for literals longer than 1 char
    if(i > 0 && charCode > 64 && charCode < 91 && (text.charCodeAt(i-1) > 64 && text.charCodeAt(i-1) < 91))
      return "Literals must be length 1";
  }
  //cannot have two operators at the top level
  if (numOfZeroDepths > 1 && containsParens) return "Only 1 main operator allowed.";
  //cannot have a different # of left than right parens
  if (level != 0) return "Uneven number of open and closed parens.";

  return "";
}

function newObj(str, exp) {
  return {str: str, exp: exp, rule: "", val: null, num: null, edit: false}
}

function createObject(text, counter, obj){
  //for consistency
  text = text.toUpperCase()
  //clean text of spaces
  if (text.charAt(0) == ' ')
    text = text.substring(1, text.length);
  if (text.charAt(text.length-1) == ' ')
    text = text.substring(0, text.length-1);
  // var errMsg = validateInput(text);
  // if (errMsg != ""){
  //   document.getElementById('myText').value = errMsg;
  //   return;
  // }
  var express;
  //get rid of outer brackets if not needed
  while (checkUselessParens(text)){
    text = text.substring(1, text.length-1);
  }
  //return literal (base case)
  if (text.length == 1){
    express = {e1: text, e2: null, value: null, oper: null, depth: counter};
    obj.push(newObj(text, express));
    return express;
  }
  if (text.length == 2){
    var neg = text.charAt(0);
    var lit = text.charAt(1);
    var myLit = {e1: lit, e2: null, value: null, oper: null, depth: counter+1};
    express = {e1: myLit, e2: null, value: null, oper: neg, depth: counter};
    obj.push(newObj(neg, express));
    obj.push(newObj(lit, express));
    return express;
  }
  //calculate the max depth level
  var i, maxLevelTracker = 1, maxLevel = 0;
  for(i = 0; i < text.length; i++){
    var char = text.charAt(i);
    if (char == '(') maxLevelTracker++;
    if (char == ')') maxLevelTracker--;
    if (maxLevelTracker > maxLevel) maxLevel = maxLevelTracker;
  }
  //find the 0 level operator and recurse
  var level = 0;
  for (i = 0; i < text.length; i++){
    var char = text.charAt(i);
    if (char == '(')
      level++;
    if (char == ')')
      level--;
    if (isOperator(char) && level == 0){
      var left = text.substring(0, i);
      var right = text.substring(i+1, text.length);
      // Set e2 as null first so obj has correct order
      express = {e1: createObject(left, counter+1, obj), e2: null, value: null, oper: char, depth: counter};
      obj.push(newObj(char, express));
      express.e2 = createObject(right, counter+1, obj);
      return express;
   }
  }
}

//==============================================================================
//= INTERFACE ==================================================================
//==============================================================================

const inputMap = {
  "^": "\u22a5",
  "~": "\u00ac",
  "&": "\u2227",
  "|": "\u2228",
  "$": "\u2192",
  "%": "\u2194"
};

var modified = false;
function verifyChange() {
  if (modified) {
    alert("Changing inputs will erase all progress");
  }
}

var app = angular.module("shortTruthTables", []);

app.controller("MainCtrl", ["$scope","$timeout", function($scope, $timeout) {
  $scope.editing = null;
  $scope.inputMode = true;
  $scope.inputs = [{str: "", id: 0}];
  $scope.idCounter = 0;
  $scope.expressions = [];
  $scope.stepCounter = 0;

  function nextId() {
    $scope.idCounter++;
    return $scope.idCounter;
  }

  $scope.addInput = () => {
    let id = nextId();
    $scope.inputs.push({id: id, str: "", err: ""});
    $timeout(() => {
      document.getElementById("input-" + id).focus();
    });
  };

  $scope.enterInput = (e) => {
    if (e.key === "Enter") $scope.addInput(); // On enter, submit input
  };

  $scope.deleteInput = (input) => {
    let removeIndex = $scope.inputs.indexOf(input);
    $scope.inputs.splice(removeIndex, 1);
    removeIndex = $scope.expressions.map(function(exp) { return exp.id; }).indexOf(input.id);
    $scope.expressions.splice(removeIndex, 1);
  };

  $scope.validateInput = (input) => {
    let idx = $scope.expressions.map(function(exp) { return exp.id; }).indexOf(input.id);
    input.err = validateInput(input.str);
    // If valid, add to expressions
    if (input.err == "") {
      let obj = [];
      let expression = createObject(input.str, 0, obj);
      if (idx == -1) { // If doesn't exist, push new
        $scope.expressions.push({id: input.id, obj: obj, exp: expression});
      } else { // If does exist, edit
        $scope.expressions[idx].exp = expression;
        $scope.expressions[idx].obj = obj;
      }
    } else if (idx != -1) { // Remove, if invalidated
      $scope.expressions.splice(idx, 1);
    }
    console.log($scope.expressions)
  };

  $scope.connect = (obj) => {
    if ($scope.editing) {
      $scope.editing.edit = false;
      if ($scope.editing.rule == "reit") {

      }
    }
    $scope.editing = obj;
    obj.edit = true;
  };

  $scope.setObjVal = (obj, val) => {
    console.log(obj)
    if (obj.exp.value != null && !val) {
      $scope.expressions.forEach((e) => {
        e.obj.num -= 1;
      });
      $scope.stepCounter--;
    } else if (obj.exp.value == null && val) {
      $scope.stepCounter++;
    }
    obj.val = val;
    if (val) {
      obj.exp.value = (val == "T");
      obj.num = $scope.stepCounter;
    } else {
      obj.exp.value = null;
      obj.num = null;
    }
  };

  $scope.isObjValid = (obj) => {
    return false;
  };

  $scope.export = () => {
    let filename = "stt.bram";
    let save = {
      editing: $scope.editing,
      inputMode: $scope.inputMode,
      inputs: $scope.inputs,
      idCounter: $scope.idCounter,
      expressions: $scope.expressions,
      stepCounter: $scope.stepCounter
    }
    let blob = new Blob([angular.toJson(save, true)], {type: "text/plain;charset=utf-8"});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        var e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
        // window.URL.revokeObjectURL(a.href); // clean the url.createObjectURL resource
    }
  };

  $scope.import = () => {
    return false;
  };
}]);

app.directive("ngFileSelect",function() {
  return {
    link: function($scope,el){
      el.bind("change", function(e){
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      });
    }
  }
});
