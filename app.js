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
  $scope.inputMode = true;
  $scope.inputs = [{str: "", id: 0}];
  $scope.idCounter = 0;
  $scope.expressions = [];

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
    var removeIndex = $scope.inputs.indexOf(input);
    $scope.inputs.splice(removeIndex, 1);
  };

  $scope.validateInput = (input) => {
    // Validate input
    // If valid, add to expressions
  };
}]);
