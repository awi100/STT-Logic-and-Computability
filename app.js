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
  if (!sameLit)
    return false;
  if (sameLit && express1.value != express2.value)
    return false;
  else
    return true;
}

function and(express){
  if (express.value == null || express.oper != '&'){
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

function andOperator(express){
  if (express.value == null || express.oper != '&')
    return false;
  if (express.value == true){
    return express.e1.value == true && express.e2.value == true;
  }
  else
    return express.e1.value == false || express.e2.value == false;

}

function or(express){
  if (express.value == null || express.oper != '|' || (express.e1.value == null && express.e2.value == null)){
    return false;
  }
  if (express.value == true){
    return (express.e1.value != null || express.e2.value != null) && (express.e1.value == true || express.e2.value == true);
  }
  else{
    return (express.e1.value != null || express.e2.value != null) && (express.e1.value == false && express.e2.value == false);
  }
}

function implication(express){
  if (express.value == null || express.oper != '$')
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

function biconditional(express){
  if (express.value == null || express.oper != '%')
    return false;
  if (express.value == true)
    return (express.e1.value == true && express.e2.value == true) || (express.e1.value == false && express.e2.value == false);
  else
    return (express.e1.value == true && express.e2.value == false) || (express.e1.value == false && express.e2.value == true);
}

function negation(express){
    return false;
    // if (express == null || express.oper == null) return false;
    // if (express.oper != '~') return negate(express.e1) || negate(express.e2);
    // if (express.value == true){
    //   return express.e1 != null && express.e1.value == false;
    // }
    // if (express.value == false){
    //   return express.e1 != null && express.e1.value == true;
    // }
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
    var char = text.charAt(i);
    var charCode = char.toUpperCase().charCodeAt(0);
    if ((charCode < 65 || charCode > 90) && char != '(' && char != ')' &&
          char != '&' && char != '|' && char != '~' && char != '$' && char != '%')
      return false;
  }
  return true;
}

function validateInput(text){
  text = text.replace(/ /g,''); //remove whitespace
  if (checkValidAlphabet(text) == false) return "Characters used not in valid alphabet";
  var level = 0, i = 0, numOfZeroDepths = 0, containsParens = false, anotherOperatorAppeared = false,
      litCount = 0, operCount = 0, isOper = false, isLit = false;
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

    isOper = isOperator(char);
    isLit = (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);

    if (isOper) operCount++;
    if (isLit) litCount++;
    //check for literals longer than 1 char
    if(i > 0 && isLit && charIsLiteral(text.charAt(i-1)))
      return "Literals must be length 1";
    //check that chars are seperated with operator
    if (i > 1 && isLit && (text.charAt(i-1) == '(' || text.charAt(i-1) == ')') && charIsLiteral(text.charAt(i-2)))
      return "Literals must be seperated by an operator";
    //check that operators are seperated with a literal
    if (i > 1 && isOper && isOperator(text.charAt(i-1)))
      return "Operators must be seperated by a literal";
    if (i > 1 && isOper && (text.charAt(i-1) == '(' || text.charAt(i-1) == ')') && isOperator(text.charAt(i-2)))
      return "Operators must be seperated by a literal";
  }
  //cannot have two operators at the top level
  if (numOfZeroDepths > 1 && containsParens) return "Only 1 main operator allowed.";
  //cannot have a different # of left than right parens
  if (level != 0) return "Uneven number of open and closed parens.";
  //cannot have the same # of literals and operators;
  if (operCount+1 != litCount) {
    return "Incorrect number of operators or literals";
  }
  return "";
}

function newObj(str, exp, intangible) {
  if (str in inputMap) str = inputMap[str];
  return {str: str, exp: exp, intangible: intangible, val: {num: null, rule: "", link: null, valid: null}, edit: false}
}

function createObject(text, counter, objs) {
  text = text.replace(/ /g,''); //remove whitespace
  //for consistency
  text = text.toUpperCase()
  //clean text of spaces
  if (text.charAt(0) == ' ')
    text = text.substring(1, text.length);
  if (text.charAt(text.length-1) == ' ')
    text = text.substring(0, text.length-1);
  var express;
  //get rid of outer brackets if not needed
  while (checkUselessParens(text)){
    text = text.substring(1, text.length-1);
  }
  //return literal (base case)
  if (text.length == 1){
    express = {e1: text, e2: null, value: null, oper: null, depth: counter};
    objs.push(newObj(text, express, false));
    return express;
  }
  if (text.length == 2){
    var neg = text.charAt(0);
    var lit = text.charAt(1);
    var myLit = {e1: lit, e2: null, value: null, oper: null, depth: counter+1};
    express = {e1: myLit, e2: null, value: null, oper: neg, depth: counter};
    objs.push(newObj(neg, express, false));
    objs.push(newObj(lit, myLit, false));
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
    if (char == '(') {
      level++;
    }
    if (char == ')') {
      level--;
    }
    if (isOperator(char) && level == 0){
      var left = text.substring(0, i);
      var right = text.substring(i+1, text.length);
      // Set e2 as null first so obj has correct order
      objs.push(newObj("(", null, true));
      express = {e1: createObject(left, counter+1, objs), e2: null, value: null, oper: char, depth: counter};
      objs.push(newObj(char, express, false));
      express.e2 = createObject(right, counter+1, objs);
      objs.push(newObj(")", null, true));
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
  $scope.numPremises = 1;
  $scope.inputs = [{id: 0, str: "", err: ""}, {id: 1, str: "", err: ""}];
  $scope.expressions = [{id: 0, objs: null, exp: null}, {id: 1, objs: null, exp: null}];
  $scope.stepCounter = 0;
  $scope.file = {data: null};
  $scope.modified = false;
  $scope.task = "Validity";
  $scope.contradiction = { e1: null, e2: null, count: 0, linking: false, val: null };

  $scope.addInput = (type) => {
    // If conclusion, push to end
    let idx = $scope.inputs.length;
    // If premise, insert in middle
    if (type == "premise") {
      idx = $scope.numPremises;
      $scope.numPremises++;
    }
    $scope.inputs.splice(idx, 0, {id: null, str: "", err: ""});
    $scope.expressions.splice(idx, 0, {id: null, objs: null, exp: null});
    // Set numerical IDs
    let id;
    for (let i=0; i<$scope.inputs.length; i++) {
      if ($scope.inputs[i].id == null) id = i;
      $scope.inputs[i].id = i;
      $scope.expressions[i].id = i;
    }
    $timeout(() => {
      document.getElementById("input-" + id).focus();
    });
  };

  $scope.enterInput = (e, type) => {
    if (e.key === "Enter") $scope.addInput(type); // On enter, submit input
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

  $scope.deleteInput = (input, type) => {
    let idx = $scope.inputs.indexOf(input);
    idx = $scope.expressions.map(function(exp) { return exp.id; }).indexOf(input.id);
    if ($scope.expressions[idx].objs) cleanStepCounter($scope.expressions[idx].objs);
    $scope.inputs.forEach((i) => {
      if (i.id > input.id) i.id -= 1;
    });
    $scope.idCounter -= 1;
    if (type == "premise") $scope.numPremises -= 1;
    $scope.inputs.splice(idx, 1);
    $scope.expressions.splice(idx, 1);
  };

  function combine(o1, o2) {
    // Increment conclusion IDs to fit inside expressions
    let temp = o2;
    temp.forEach((e) => {
      e.id += o1.length;
    });
    return o1.concat(temp);
  }

  $scope.validateInput = (input, type) => {
    let idx = $scope.expressions.map(function(exp) { return exp.id; }).indexOf(input.id);
    input.err = validateInput(input.str);
    // If valid, add to expressions
    if (input.err == "") {
      let objs = [];
      let expression = createObject(input.str, 0, objs);
      // Remove extra parens around expressions
      if (objs.length > 2) objs = objs.slice(1, objs.length-1);
      if (idx != -1) {
        $scope.expressions[idx].exp = expression;
        $scope.expressions[idx].objs = objs;
        cleanStepCounter($scope.expressions[idx].objs);
      } else {
        console.error("Expression input desync: Fatal error");
      }
    } else if (idx != -1) { // Make invis, if invalidated
      $scope.expressions[idx].exp = null;
      $scope.expressions[idx].objs = null;
    }
  };

  $scope.getValString = (val) => {
    if (val == null) {
      return "";
    } else {
      return (val) ? "T" : "F";
    }
  };

  $scope.processContradiction = () => {
    $scope.contradiction.linking = true;
    $scope.linking = true;
    if ($scope.editing) $scope.editing.edit = false;
  };

  $scope.connect = (obj) => {
    if (obj.intangible && !$scope.linking) return; // If intangible, exit

    if ($scope.contradiction.linking) {
      if ($scope.contradiction.count == 0){
        $scope.contradiction.e1 = obj.exp;
        $scope.contradiction.count++;
      }
      else if ($scope.contradiction.count == 1) {
        $scope.contradiction.e2 = obj.exp;
        $scope.contradiction.count++;
      }
      if ($scope.contradiction.count == 2){
        $scope.contradiction.val = showContradiction($scope.contradiction.e1, $scope.contradiction.e2);
        $scope.contradiction.count = 0;
        $scope.contradiction.e1 = null;
        $scope.contradiction.e2 = null;
        $scope.contradiction.linking = false;
        $scope.linking = false;
      }
    } else {
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
    }
  };

  // Disconnect from object, if click on canvas
  $scope.disconnect = (e) => {
    // Iterate over parent elements and if one is expressions, we aren't clicking on canvas
    let element = e.target;
    while (element != null) {
      if (element.classList.contains("connectable")) return;
      element = element.parentElement;
    }
    // Set edit to false
    if ($scope.editing) $scope.editing.edit = false;
    e.stopPropagation();
  };

  $scope.setObjVal = (obj, val) => {
    // Check to see if value is different
    if (obj.exp.value && val == "T" || obj.exp.value === false && val == "F" || obj.exp.value == null && val == null) {
      return;
    }
    // Reset to default values
    obj.val.rule = "";
    obj.val.link = null;
    obj.val.valid = null;
    // If setting to null, work steps backwards
    if (obj.exp.value != null && !val) {
      $scope.expressions.forEach((e) => {
        if (e.objs) {
          e.objs.forEach((o) => {
            if (o.val.num > obj.val.num) o.val.num -= 1;
          });
        }
      });
      $scope.stepCounter--;
    } else if (obj.exp.value == null && val) {
      $scope.stepCounter++;
    }
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
    // Find dependent steps and re-eval rule
    $scope.expressions.forEach((e) => {
      if (e.objs) {
        e.objs.forEach((o) => {
          if (o.val.link == obj) {
            $scope.linking = true;
            $scope.verifyRule(o);
          }
        });
      }
    });
  };

  $scope.initValues = () => {
    for (let i=0; i<$scope.expressions.length; i++) {
      let e = $scope.expressions[i];
      if (e.exp) {
        e.exp.value = (i<$scope.numPremises) ? true : false;
        e.objs.forEach((o) => {
          if (o.exp == e.exp) {
            o.intangible = true;
            o.val.valid = true;
          } else {
            o.intangible = false;
          }
        });
      }
    }
  };

  function showContradiction(express1, express2) {
    //TODO contradiction checking
    if (express1 == null || express2 == null){
      return false;
    }
    var e1isLit = isLiteral(express1), e2isLit = isLiteral(express2);
    if (!e1isLit && !e2isLit){
      return showContradiction(express1.e1, express2) || showContradiction(express1.e2, express2) || showContradiction(express1, express2.e1) || showContradiction(express1, express2.e2);
    }
    else if (!e1isLit){
      return showContradiction(express1.e1, express2) || showContradiction(express1.e2, express2);
    }
    else if (!e2isLit){
      return showContradiction(express1, express2.e1) || showContradiction(express1, express2.e2);
    }
    var sameLit = express1.e1 == express2.e1;
    if (!sameLit){
      return false;
    }
    if (sameLit && express1.value != express2.value) {
      return true;
    }
    else{
      return false;
    }
  };

  $scope.verifyRule = (obj) => {
    if (!$scope.linking) {
      $scope.linking = obj;
      obj.val.valid = null;
      obj.val.link = null;
    } else {
      if (!obj.val.link.val.valid) return false;
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
          obj.val.valid = negation(obj.val.link.exp);
          break;
        case "andOp":
          obj.val.valid = andOperator(obj.val.link.exp);
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
      premises: $scope.premises,
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
    $scope.premises = json.inputs;
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
