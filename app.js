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
                value: null, oper: "&", depth: 0};
  var third = {e1: {e1: "A", e2: null, value: false, oper: null, depth: 1},
                e2: {e1: "B", e2: null, value: null, oper: null, depth: 1},
                value: null, oper: "&", depth: 0};
  var fourth = {e1: "D", e2: null, value: true, oper: null, depth: 0};
  var fifth = {e1: {e1: "A", e2: null, value: false, oper: null, depth: 1}, e2: null, value: true, oper: "~", depth: 0}
  console.log(reit(first, second));
  console.log(reit(first, third));
  console.log(reit(second, third));
  console.log(reit(first, fourth));
  console.log(reit(first, fifth));
}

function and(express){
  if (express.value == null){
    return false;
  }
  if (express.value == true){
    return (express.e1.value == true && express.e2.value == true) ||
            (express.e1.value == true && express.e2.value == null) ||
            (express.e1.value == null && express.e2.value == true) ;
  }
  else{
    return express.e1.value == false || express.e2.value == false;
  }
}

function checkAnd(){
  var first = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
               e2: {e1: "B", e2: null, value: true, oper: null, depth: 1},
               value: true, oper: "&", depth: 0};
  var second = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
               e2: {e1: "B", e2: null, value: false, oper: null, depth: 1},
               value: false, oper: "&", depth: 0};
  var third = {e1: {e1: "A", e2: null, value: false, oper: null, depth: 1},
               e2: {e1: "B", e2: null, value: true, oper: null, depth: 1},
               value: true, oper: "&", depth: 0};
  var fourth = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
               e2: {e1: "B", e2: null, value: true, oper: null, depth: 1},
               value: false, oper: "&", depth: 0};
  var fifth = {e1: {e1: "A", e2: null, value: false, oper: null, depth: 1},
               e2: {e1: "B", e2: null, value: false, oper: null, depth: 1},
               value: true, oper: "&", depth: 0};
  // More complex test
  // (A & B) & (C | D)
   var sixth = {e1: {e1: {e1: "A", e2: null, value: null, oper: null, depth: 2},
                    e2: {e1: "B", e2: null, value: null, oper: null, depth: 2},
                          value: true, oper: "&", depth: 1},
              e2:   {e1: {e1: "C", e2: null, value: null, oper: null, depth: 2},
                    e2: {e1: "D", e2: null, value: null, oper: null, depth: 2},
                          value: false, oper: "|", depth: 1}, value: false,
              oper: "&", depth: 0}
  // test null
  var seventh = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
               e2: {e1: "B", e2: null, value: null, oper: null, depth: 1},
               value: true, oper: "&", depth: 0};

  console.log(and(first));
  console.log(and(second));
  console.log(and(third));
  console.log(and(fourth));
  console.log(and(fifth));
  console.log(and(sixth));
  console.log(and(seventh));
}
function or(express){
  if (express.value == null){
    return false;
  }
  if (express.value == true){
    return express.e1.value == true || express.e2.value == true;
  }
  else{
    return express.e1.value == false && express.e2.value == false;
  }
}
  function checkOr(){
  var first = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
               e2: {e1: "B", e2: null, value: true, oper: null, depth: 1},
               value: true, oper: "^", depth: 0};
  var second = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
               e2: {e1: "B", e2: null, value: false, oper: null, depth: 1},
               value: false, oper: "^", depth: 0};
  var third = {e1: {e1: "A", e2: null, value: false, oper: null, depth: 1},
               e2: {e1: "B", e2: null, value: true, oper: null, depth: 1},
               value: true, oper: "^", depth: 0};
  var fourth = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
               e2: {e1: "B", e2: null, value: true, oper: null, depth: 1},
               value: false, oper: "^", depth: 0};
  var fifth = {e1: {e1: "A", e2: null, value: false, oper: null, depth: 1},
               e2: {e1: "B", e2: null, value: false, oper: null, depth: 1},
               value: true, oper: "^", depth: 0};
  console.log(or(first));
  console.log(or(second));
  console.log(or(third));
  console.log(or(fourth));
  console.log(or(fifth));
}

function implication(express){
  if (express.value == null)
    return false;
  if (express.value == true){
    //for a true implication
    //if antecedent is true, consequence must be true
    //else antecedent is false, whole expression is true
    if (express.e1.value == true)
      return express.e2.value == true;
    else
      return true;
  }
  else{
    //for a false implication
    //if antecedent is true, consequence must be false
    //else antecedent is false, whole expression is false
    if (express.e1.value == true)
      return express.e2.value == false;
    else
      return false;
  }
}

function checkImplication(){
  var first = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
              e2: {e1: "B", e2: null, value: true, oper: null, depth: 1},
               value: true, oper: "$", depth: 0};
  var second = {e1: {e1: "A", e2: null, value: false, oper: null, depth: 1},
              e2: {e1: "B", e2: null, value: true, oper: null, depth: 1},
               value: true, oper: "$", depth: 0};
  var third = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
              e2: {e1: "B", e2: null, value: false, oper: null, depth: 1},
               value: true, oper: "$", depth: 0};
  var fourth = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
              e2: {e1: "B", e2: null, value: true, oper: null, depth: 1},
               value: false, oper: "$", depth: 0};
  var fifth = {e1: {e1: "A", e2: null, value: false, oper: null, depth: 1},
              e2: {e1: "B", e2: null, value: true, oper: null, depth: 1},
               value: false, oper: "$", depth: 0};
  console.log(implication(first));
  console.log(implication(second));
  console.log(implication(third));
  console.log(implication(fourth));
  console.log(implication(fifth));

}

function biconditional(express){
  if (express.value == null)
    return false;
  if (express.value == true)
    return (express.e1.value == true && express.e2.value == true) || (express.e1.value == false && express.e2.value == false);
  else
    return (express.e1.value == true && express.e2.value == false) || (express.e1.value == false && express.e2.value == true);
}

function checkBiconditional(){
  var first = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
              e2: {e1: "B", e2: null, value: true, oper: null, depth: 1},
               value: true, oper: "%", depth: 0};
  var second = {e1: {e1: "A", e2: null, value: false, oper: null, depth: 1},
              e2: {e1: "B", e2: null, value: false, oper: null, depth: 1},
               value: true, oper: "%", depth: 0};
  var third = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
              e2: {e1: "B", e2: null, value: false, oper: null, depth: 1},
               value: true, oper: "%", depth: 0};
  var fourth = {e1: {e1: "A", e2: null, value: true, oper: null, depth: 1},
              e2: {e1: "B", e2: null, value: true, oper: null, depth: 1},
               value: false, oper: "%", depth: 0};
  var fifth = {e1: {e1: "A", e2: null, value: false, oper: null, depth: 1},
              e2: {e1: "B", e2: null, value: true, oper: null, depth: 1},
               value: false, oper: "%", depth: 0};

  console.log(biconditional(first));
  console.log(biconditional(second));
  console.log(biconditional(third));
  console.log(biconditional(fourth));
  console.log(biconditional(fifth));
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
  return char == '|' || char == '&' || char == '$' || char == '%';
}
//can be passed a char or charCode
function charIsLiteral(char){
  if (typeof char == "string"){
    charCode = char.charCodeAt(0);
    return charCode > 64 && charCode < 91;
  }
  return char > 64 && char < 91;
}

function checkValidAlphabet(text){
  var char;
  for (var i = 0; i < text.length; i++){
    var charCode = text.charCodeAt(i);
    var char = text.charAt(i);
    if (!(charCode >= 65 && charCode <= 90) && char != '(' && char != ')' && char != ' ' &&
          char != '&' && char != '|' && char != '~' && char != '$' && char != '%')
      return false;
  }
  return true;
}

function validateInput(text){
  if (checkValidAlphabet(text) == false) return "Characters used not in valid alphabet";
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
    if(i > 0 && charIsLiteral(char) && charIsLiteral(text.charAt(i-1)))
      return "Literals must be length 1";
    //check that literals are not double spaced
    if (i > 1 && text.charAt(i-1) == ' ' && text.charAt(i-2) == ' ')
      return "Input cannot be double spaced";
    //check that chars are seperated with operator
    if (i > 1 && charIsLiteral(char) && (text.charAt(i-1) == ' ' || text.charAt(i-1) == '(' || text.charAt(i-1) == ')') && charIsLiteral(text.charAt(i-2)))
      return "Literals must be seperated by an operator";
    //check that operators are seperated with a literal
    if (i > 1 && isOperator(char) && isOperator(text.charAt(i-1)))
      return "Operators must be seperated by a literal";
    if (i > 1 && isOperator(char) && (text.charAt(i-1) == ' ' || text.charAt(i-1) == '(' || text.charAt(i-1) == ')') && isOperator(text.charAt(i-2)))
      return "Operators must be seperated by a literal";
  }
  //cannot have two operators at the top level
  if (numOfZeroDepths > 1 && containsParens) return "Only 1 main operator allowed.";
  //cannot have a different # of left than right parens
  if (level != 0) return "Uneven number of open and closed parens.";

  return "";
}

function newObj(str, exp) {
  if (str in inputMap) str = inputMap[str];
  return {str: str, exp: exp, val: {bool: null, num: null, rule: "", link: null, valid: null}, edit: false}
}

function createObject(text, counter, objs){
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
    objs.push(newObj(text, express));
    return express;
  }
  if (text.length == 2){
    var neg = text.charAt(0);
    var lit = text.charAt(1);
    var myLit = {e1: lit, e2: null, value: null, oper: null, depth: counter+1};
    express = {e1: myLit, e2: null, value: null, oper: neg, depth: counter};
    objs.push(newObj(neg, express));
    objs.push(newObj(lit, express));
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
      express = {e1: createObject(left, counter+1, objs), e2: null, value: null, oper: char, depth: counter};
      objs.push(newObj(char, express));
      express.e2 = createObject(right, counter+1, objs);
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
  $scope.linking = null;
  $scope.inputMode = true;
  $scope.inputs = [{id: 0, str: "", err: "", conclusion: false}];
  $scope.idCounter = 0;
  $scope.expressions = [];
  $scope.stepCounter = 0;
  $scope.file = {data: null};
  $scope.modified = false;
  $scope.task = "Validity";

  function nextId() {
    $scope.idCounter++;
    return $scope.idCounter;
  }

  $scope.addInput = () => {
    let id = nextId();
    $scope.inputs.push({id: id, str: "", err: "", conclusion: false});
    $timeout(() => {
      document.getElementById("input-" + id).focus();
    });
  };

  $scope.enterInput = (e) => {
    if (e.key === "Enter") $scope.addInput(); // On enter, submit input
  };

  function cleanStepCounter(objs) {
    // Turn back step counter for each counted in old exp
    let nums = [];
    objs.forEach((o) => {
      if (o.val.num != null) {
        nums.push(o.val.num);
      }
    });
    nums.forEach((n) => {
      $scope.expressions.forEach((e) => {
        e.objs.forEach((o) => {
          if (o.val.num >= n) o.val.num -= 1;
        });
      });
      $scope.stepCounter -= 1;
    });
  }

  $scope.deleteInput = (input) => {
    let idx = $scope.inputs.indexOf(input);
    $scope.inputs.splice(idx, 1);
    idx = $scope.expressions.map(function(exp) { return exp.id; }).indexOf(input.id);
    cleanStepCounter($scope.expressions[idx].objs);
    $scope.expressions.splice(idx, 1);
  };

  $scope.validateInput = (input) => {
    let idx = $scope.expressions.map(function(exp) { return exp.id; }).indexOf(input.id);
    input.err = validateInput(input.str);
    // If valid, add to expressions
    if (input.err == "") {
      let objs = [];
      let expression = createObject(input.str, 0, objs);
      if (idx == -1) { // If doesn"t exist, push new
        $scope.expressions.push({id: input.id, objs: objs, exp: expression});
      } else { // If does exist, edit
        cleanStepCounter($scope.expressions[idx].objs);
        $scope.expressions[idx].exp = expression;
        $scope.expressions[idx].objs = objs;
      }
    } else if (idx != -1) { // Remove, if invalidated
      $scope.expressions.splice(idx, 1);
    }
  };

  $scope.connect = (obj) => {
    if ($scope.linking) {
      $scope.linking.val.link = obj;
      $scope.verifyRule($scope.linking);
      $scope.linking = null;
    } else {
      if ($scope.editing && $scope.editing != obj) {
        $scope.editing.edit = false;
        obj.edit = true;
      } else {
        obj.edit = !obj.edit;
      }
      $scope.editing = obj.edit ? obj : null;
    }
  };

  $scope.setObjVal = (obj, val) => {
    // If setting to null, work steps backwards
    if (obj.exp.value != null && !val) {
      $scope.expressions.forEach((e) => {
        e.objs.forEach((o) => {
          if (o.val.num > obj.val.num) o.val.num -= 1;
        });
      });
      $scope.stepCounter--;
    } else if (obj.exp.value == null && val) {
      $scope.stepCounter++;
    }
    obj.val.bool = val;
    // Set to bool
    if (val) {
      obj.exp.value = (val == "T");
      // Increment step iff was not already set to bool
      if (obj.val.num == null) obj.val.num = $scope.stepCounter;
    } else {
      // Set to empty
      obj.exp.value = null;
      obj.val.num = null;
    }
  };

  $scope.verifyRule = (obj) => {
    if (!$scope.linking) {
      $scope.linking = obj;
    } else {
      switch (obj.val.rule) {
        case "":
        obj.val.valid = null;
        break;
        case "reit":
        obj.val.valid = obj.val.link == null ? null : reit(obj.exp, obj.val.link.exp);
        break;
        case "and":
        obj.val.valid = and(obj.val.link.exp);
        break;
        case "or":
        obj.val.valid = or(obj.val.link.exp);
        break;
        case "imp":
        obj.val.valid = implication(obj.val.link.exp);
        break;
        case "bic":
        obj.val.valid = biconditional(obj.val.link.exp);
        break;
        case "neg":
        // obj.val.valid = negation(obj.val.link.exp);
        break;
        default:
        obj.val.valid = null;
      }
    }
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
        let e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
        e.initEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
        // window.URL.revokeObjectURL(a.href); // clean the url.createObjectURL resource
    }
  };

  $scope.import = () => {
    $scope.importStatus = "Loading... ";
    let header = $scope.file.data.indexOf(";base64,");
    let json = JSON.parse(atob($scope.file.data.substring(header+8)));
    $scope.editing = json.editing;
    $scope.inputMode = json.inputMode;
    $scope.inputs = json.inputs;
    $scope.idCounter = json.idCounter;
    $scope.expressions = json.expressions;
    $scope.stepCounter = json.stepCounter;
    $scope.modified = json.modified;
    $scope.importStatus = "";
  };

  $scope.importError = (e) => {
    $scope.importStatus = e;
  };

  $scope.importProgress = (t, l) => {
    $scope.importStatus = "Loading... " + l + "/" + t;
  }
}]);

app.directive("fileSelect", ["$window", function ($window) {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, el, attr, ctrl) {
      let fileReader = new $window.FileReader();

      fileReader.onload = function () {
        ctrl.$setViewValue(fileReader.result);

        if ("fileLoaded" in attr) {
          scope.$eval(attr["fileLoaded"]);
        }
      };

      fileReader.onprogress = function (event) {
        if ("fileProgress" in attr) {
          scope.$eval(attr["fileProgress"], {"$total": event.total, "$loaded": event.loaded});
        }
      };

      fileReader.onerror = function () {
        if ("fileError" in attr) {
          scope.$eval(attr["fileError"], {"$error": fileReader.error});
        }
      };

      let fileType = attr["fileSelect"];

      el.bind("change", function (e) {
        let fileName = e.target.files[0];
        if (fileType === "bram") {
          fileReader.readAsText(fileName);
        } else if (fileType === "data") {
          fileReader.readAsDataURL(fileName);
        }
      });
    }
  };
}]);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
