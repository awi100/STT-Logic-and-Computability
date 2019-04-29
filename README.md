# STT Validator
## Authors
2019:
Andrew Imrie, Maya Tung

## About
https://github.com/awi100/STT-Logic-and-Computability

HTML/Javascript App for making short truth tables

This idea was created by Bram van Heuveln for his various logic classes.

The goal of this project is to have a working app that can save/load data, grade students' work, and give hints on how to make a short truth table.

## Instructions
  Input premises and conclusions on the Input tab

  Go to the Table tab to solve the truth table

  Premises will automatically be set to true and the conclusions set to false

  Click on literals and operators to assign them a boolean value

  Your object is now PURPLE meaning it does not have a rule assigned to it

  Click on a rule to verify your step

  If assigning a value to an operator, choose the rule that has the operator type followed by "Operator"

  Your object may now be BLUE meaning you need to select an additional reason for your rule

  If you are linking, select a new object to complete the rule verification

  Your initial object will now be GREEN if your rule and value are correct - but RED if they are incorrect

  To finish, click Show Contradiction and link 2 objects that contradict each other

## Formatting Rules
  Literals must be characters from English alphabet

  Literals must be one character

  Literals must be separated by an operator

  There must be the same amount of open and closed parentheses

  You must input at least one conclusion

  If you create an expression with multiple top-level operators, we will parse them as separated boolean operators

## Plans For the Future
  Consistency and other goals have not been implemented

  Export to .bram

  Intercept keyboard event to directly type logical unicode

  Create batch file checker for grading

  When linking, highlight recommended / valid targets

  You have to click once to finish loading a file (unsure if Angular vendor bug?)

  Saves can sometimes corrupt and the rules will break (this is the error we saw in the demo)
