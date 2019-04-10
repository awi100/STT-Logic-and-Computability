/* Cyrillic Virtual (on-screen) keyboard - JavaScript file
   Copyright (c) 2013  Paul Gorodyansky

  Implementation: http://Kbd.WinRus.com (http://WinRus.com/onscreen.htm)
     or Russian interface version:
  http://WinRus.com/klava.htm (http://porusski.net)

  Author's site - "Cyrillic (Russian): instructions for Windows and Internet":
  http://WinRus.com/


 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE.
 *
 *      This JavaScript code is for
 *
 *      Virtual Cyrillic Keyboard - with standard and phonetic layouts -
 *
 *      Supported browsers and detailed description: http://winrus.com/onsreen.htm
 *
 *
 *      Mode: 'as at home with MS Word' - input/edit text normally using
 *      physical keyboard.
 *      In addition, one can use a mouse with a layout picture to place a
 *      letter into needed position.
 *
 *
 *  This is the first Vurtual Keyboard (that provides physical keyboard input)
 *  with a programming code suitable for all three browser brands:
 *  Internet Explorer, Opera and Mozilla - and now WebKit-based Chrome, Safari
 *
 *  That is, this code for such "on-the-fly" input/editing is *original* -
 *  both keyboard-based and mouse-based parts -
 *  I could not use any code of older Virtual Keyboards because their programming
 *  code was working only under Internet Explorer.
 *  Also older mouse-based Keyboards were not suitable for normal text input/editing -
 *  they placed a new letter only at the end of the text, thus no text
 *  editing/correction was possible.
 *
 */



var Netscape=false, MSIE=false, MSIE11=false, Opera=false, Unknown, NN1, NN2, Ffox=false;
var Win, Mac, Other;
var NetscapeVer=0, MSIEVer=0, OperaVer=0, NetscapeOK=false, AlertMsg;
var strOperaPos;
var WebKit, WebKitOK;
WebKit=false; WebKitOK=false;

var Br = "1";

// detect browser
// IE 11 say "Netscape" as appName

function isIE() { return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))); }

if (isIE())
{
        MSIE = true;
        if (navigator.appName == 'Netscape') // MS IE 11 and up
        {
                   MSIEVer = 11;
                   MSIE11=true;
        }

        //n = navigator.userAgent;
//  MSIEVer = n.substr(n.indexOf("MSIE ")+("MSIE ").length, 4);
//  MSIEVer = parseFloat(MSIEVer);
  // converts it into a floatint point number
}
else
{
Netscape = navigator.appName == "Netscape";
//MSIE = navigator.appName == "Microsoft Internet Explorer";
Opera = navigator.userAgent.indexOf("Opera") > -1;
}


Unknown = !(Netscape || MSIE || Opera);

NetscapeOK = false;

// detect platform
var n;
Win = navigator.userAgent.indexOf("Win") > -1;
Mac = navigator.userAgent.indexOf("Mac") > -1;
Other = !(Win || Mac);

// now extract version numbers

if(Netscape)
{
  NetscapeVer = parseFloat(navigator.appVersion);
  if (NetscapeVer>4)
  {
    n = navigator.userAgent;

    if (n.indexOf("Netscape/") != -1)
    {
       NN1 = n.substr(n.indexOf("Netscape/")+9);
       NN1 = parseFloat(NN1);
    }
    else
     if (n.indexOf("Mozilla") != -1) // Mozilla, Firefox, WebKit-based Chrome, Safari,...
     {
       if (n.indexOf("rv:") != -1)  // Mozilla, Firefox
       {
         NN1 = n.substr(n.indexOf("rv:")+3);
         NN1 = parseFloat(NN1);
         if (NN1 >= "1.3") NetscapeOK = true;
       }
       else  //WebKit - Chrome, Safari?
       {
         if (n.indexOf("WebKit") != -1)
         {
            NN1 = n.substr(n.indexOf("WebKit")+7);
            WebKit = true;
            NN1 = parseFloat(NN1);
            if (NN1 >= 525) WebKitOK= true;
         }
       }
      } // Mozilla
  }

  if (NetscapeOK || WebKitOK)
  {
      Br="NN";
      if (n.indexOf("Firefox") != -1) Ffox = true;
  }
}
else if(MSIE) // if Opera shows itself as MS IE
{
  n = navigator.userAgent;
//  MSIEVer = n.substr(n.indexOf("MSIE ")+("MSIE ").length, 4);
//  MSIEVer = parseFloat(MSIEVer);
  // converts it into a floatint point number

  if(Opera)
  {
     strOperaPos = n.indexOf("Opera/"); // "Opera " or "Opera/"
     if (strOperaPos == -1)
       OperaVer = n.substr(n.indexOf("Opera ")+("Opera ").length, 4);
     else
       OperaVer = n.substr(strOperaPos + ("Opera/").length, 4);

     OperaVer = parseFloat(OperaVer);
  }
  else
  {
       // if (MSIEVer > 10) Br="NN"; else
	       Br = "IE";
  }
}
else if(Opera)  // Opera does not identify itself as MSIE
{
  n = navigator.userAgent;
  strOperaPos = n.indexOf("Opera/"); // "Opera " or "Opera/"

  if (strOperaPos == -1)
      OperaVer = n.substr(n.indexOf("Opera ")+("Opera ").length, 4);
  else
      OperaVer = n.substr(strOperaPos + ("Opera/").length, 4);

  OperaVer = parseFloat(OperaVer);
}


////////////////////////


                                 // YaZHert
  var KbdVariant1 = {
    "~": "Ю",
    "!": "!",
    "@": "ъ",
    "#": "Ъ",
    "$": "$",
    "%": "%",
    "^": "ё",
    "&": "Ё",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "Ь",

    "`": "ю",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "ь",

    "Q": "Я",
    "W": "Ж",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "Ы",
    "U": "У",
    "I": "И",
    "O": "О",
    "P": "П",
    "{": "Ш",
    "}": "Щ",
    "|": "Э",

    "q": "я",
    "w": "ж",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "ы",
    "u": "у",
    "i": "и",
    "o": "о",
    "p": "п",
    "[": "ш",
    "]": "щ",
    "\\": "э",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Ч",
    "J": "Й",
    "K": "К",
    "L": "Л",
    ":": ":",
    "\"": "\"",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "ч",
    "j": "й",
    "k": "к",
    "l": "л",
    ";": ";",
    "'": "'",

    "Z": "З",
    "X": "Х",
    "C": "Ц",
    "V": "В",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": "<",
    ">": ">",
    "?": "?",

    "z": "з",
    "x": "х",
    "c": "ц",
    "v": "в",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": ",",
    ".": ".",
    "/": "/"
  };

                   // YaWert
  var KbdVariant2 = {
    "~": "Ю",
    "!": "!",
    "@": "ъ",
    "#": "Ъ",
    "$": "$",
    "%": "%",
    "^": "ё",
    "&": "Ё",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "Ь",

    "`": "ю",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "ь",

    "Q": "Я",
    "W": "В",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "Ы",
    "U": "У",
    "I": "И",
    "O": "О",
    "P": "П",
    "{": "Ш",
    "}": "Щ",
    "|": "Э",

    "q": "я",
    "w": "в",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "ы",
    "u": "у",
    "i": "и",
    "o": "о",
    "p": "п",
    "[": "ш",
    "]": "щ",
    "\\": "э",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Ч",
    "J": "Й",
    "K": "К",
    "L": "Л",
    ":": ":",
    "\"": "\"",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "ч",
    "j": "й",
    "k": "к",
    "l": "л",
    ";": ";",
    "'": "'",

    "Z": "З",
    "X": "Х",
    "C": "Ц",
    "V": "Ж",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": "<",
    ">": ">",
    "?": "?",

    "z": "з",
    "x": "х",
    "c": "ц",
    "v": "ж",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": ",",
    ".": ".",
    "/": "/"
  };
 // Copyright (c) 2013 Paul Gorodyansky - http://WinRus.com
 // http://Klava.WinRus.com

                           // YaSHert
  var KbdVariant3 = {
    "~": "Ю",
    "!": "!",
    "@": "ъ",
    "#": "Ъ",
    "$": "$",
    "%": "%",
    "^": "ё",
    "&": "Ё",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "Ь",

    "`": "ю",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "ь",

    "Q": "Я",
    "W": "Ш",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "Ы",
    "U": "У",
    "I": "И",
    "O": "О",
    "P": "П",
    "{": "Ж",
    "}": "Щ",
    "|": "Э",

    "q": "я",
    "w": "ш",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "ы",
    "u": "у",
    "i": "и",
    "o": "о",
    "p": "п",
    "[": "ж",
    "]": "щ",
    "\\": "э",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Ч",
    "J": "Й",
    "K": "К",
    "L": "Л",
    ":": ":",
    "\"": "\"",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "ч",
    "j": "й",
    "k": "к",
    "l": "л",
    ";": ";",
    "'": "'",

    "Z": "З",
    "X": "Х",
    "C": "Ц",
    "V": "В",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": "<",
    ">": ">",
    "?": "?",

    "z": "з",
    "x": "х",
    "c": "ц",
    "v": "в",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": ",",
    ".": ".",
    "/": "/"
  };

                     // YaSCHert
  var KbdVariant4 = {
    "~": "Ю",
    "!": "!",
    "@": "ъ",
    "#": "Ъ",
    "$": "Ь",
    "%": "%",
    "^": "ё",
    "&": "Ё",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "+",

    "`": "ю",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "=",

    "Q": "Я",
    "W": "Щ",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "Ы",
    "U": "У",
    "I": "И",
    "O": "О",
    "P": "П",
    "{": "Ж",
    "}": "Ш",
    "|": "Э",

    "q": "я",
    "w": "щ",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "ы",
    "u": "у",
    "i": "и",
    "o": "о",
    "p": "п",
    "[": "ж",
    "]": "ш",
    "\\": "э",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Ч",
    "J": "Й",
    "K": "К",
    "L": "Л",
    ":": ":",
    "\"": "\"",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "ч",
    "j": "й",
    "k": "к",
    "l": "л",
    ";": ";",
    "'": "ь",

    "Z": "З",
    "X": "Х",
    "C": "Ц",
    "V": "В",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": "<",
    ">": ">",
    "?": "?",

    "z": "з",
    "x": "х",
    "c": "ц",
    "v": "в",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": ",",
    ".": ".",
    "/": "/"
  };

                          // AATSEEL Student
  var KbdVariant5 = {
    "~": "Ё",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "\"",
    "%": ":",
    "^": "^",
    "&": "&",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "Ъ",

    "`": "ё",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "ъ",

    "Q": "Я",
    "W": "Ш",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "Ы",
    "U": "У",
    "I": "И",
    "O": "О",
    "P": "П",
    "{": "Ю",
    "}": "Щ",
    "|": "Э",

    "q": "я",
    "w": "ш",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "ы",
    "u": "у",
    "i": "и",
    "o": "о",
    "p": "п",
    "[": "ю",
    "]": "щ",
    "\\": "э",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Ч",
    "J": "Й",
    "K": "К",
    "L": "Л",
    ":": "Ь",
    "\"": "Ж",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "ч",
    "j": "й",
    "k": "к",
    "l": "л",
    ";": "ь",
    "'": "ж",

    "Z": "З",
    "X": "Х",
    "C": "Ц",
    "V": "В",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": "<",
    ">": ">",
    "?": "?",

    "z": "з",
    "x": "х",
    "c": "ц",
    "v": "в",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": ",",
    ".": ".",
    "/": "/"
  };

                           // Mac
    var KbdVariant6 = {
    "~": "Щ",
    "!": "!",
    "@": "\"",
    "#": "#",
    "$": "?",
    "%": "%",
    "^": "ё",
    "&": "Ё",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "Ь",
    "+": "Ъ",

    "`": "щ",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "ь",
    "=": "ъ",

    "Q": "Я",
    "W": "Ш",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "Ы",
    "U": "У",
    "I": "И",
    "O": "О",
    "P": "П",
    "{": "Ю",
    "}": "Ж",
    "|": "Э",

    "q": "я",
    "w": "ш",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "ы",
    "u": "у",
    "i": "и",
    "o": "о",
    "p": "п",
    "[": "ю",
    "]": "ж",
    "\\": "э",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Ч",
    "J": "Й",
    "K": "К",
    "L": "Л",
    ":": ":",
    "\"": "\"",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "ч",
    "j": "й",
    "k": "к",
    "l": "л",
    ";": ";",
    "'": "'",

    "Z": "З",
    "X": "Х",
    "C": "Ц",
    "V": "В",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": "<",
    ">": ">",
    "?": "?",

    "z": "з",
    "x": "х",
    "c": "ц",
    "v": "в",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": ",",
    ".": ".",
    "/": "/"
  };



                   // YaWert2              - Maslov
  var KbdVariant7 = {
    "~": "Ю",
    "!": "!",
    "@": "@",
    "#": "ъ",
    "$": "Ъ",
    "%": "%",
    "^": "ё",
    "&": "Ё",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "Ч",

    "`": "ю",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "ч",

    "Q": "Я",
    "W": "В",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "Ы",
    "U": "У",
    "I": "И",
    "O": "О",
    "P": "П",
    "{": "Ш",
    "}": "Щ",
    "|": "Э",

    "q": "я",
    "w": "в",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "ы",
    "u": "у",
    "i": "и",
    "o": "о",
    "p": "п",
    "[": "ш",
    "]": "щ",
    "\\": "э",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Х",
    "J": "Й",
    "K": "К",
    "L": "Л",
    ":": ":",
    "\"": "\"",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "х",
    "j": "й",
    "k": "к",
    "l": "л",
    ";": ";",
    "'": "'",

    "Z": "З",
    "X": "Ь",
    "C": "Ц",
    "V": "Ж",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": "<",
    ">": ">",
    "?": "?",

    "z": "з",
    "x": "ь",
    "c": "ц",
    "v": "ж",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": ",",
    ".": ".",
    "/": "/"
  };

             // YaSHert2
  var KbdVariant8 = {
    "~": "Ё",
    "!": "!",
    "@": "-",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "Э",
    "+": "Щ",

    "`": "ё",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "э",
    "=": "щ",

    "Q": "Я",
    "W": "Ш",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "Ы",
    "U": "У",
    "I": "И",
    "O": "О",
    "P": "П",
    "{": "Ю",
    "}": "Ъ",
    "|": "Ё",

    "q": "я",
    "w": "ш",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "ы",
    "u": "у",
    "i": "и",
    "o": "о",
    "p": "п",
    "[": "ю",
    "]": "ъ",
    "\\": "ё",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Х",
    "J": "Й",
    "K": "К",
    "L": "Л",
    ":": "Ч",
    "\"": "Ж",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "х",
    "j": "й",
    "k": "к",
    "l": "л",
    ";": "ч",
    "'": "ж",

    "Z": "З",
    "X": "Ь",
    "C": "Ц",
    "V": "В",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": "<",
    ">": ">",
    "?": "?",

    "z": "з",
    "x": "ь",
    "c": "ц",
    "v": "в",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": ",",
    ".": ".",
    "/": "/"
  };

               // YaSHert3
  var KbdVariant9 = {
    "~": "Ъ",
    "!": "!",
    "@": "\"",
    "#": "№",
    "$": "=",
    "%": "%",
    "^": "'",
    "&": "+",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "Щ",

    "`": "ъ",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "щ",

    "Q": "Я",
    "W": "Ш",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "Ы",
    "U": "У",
    "I": "И",
    "O": "О",
    "P": "П",
    "{": "Ю",
    "}": "Э",
    "|": "Ё",

    "q": "я",
    "w": "ш",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "ы",
    "u": "у",
    "i": "и",
    "o": "о",
    "p": "п",
    "[": "ю",
    "]": "э",
    "\\": "ё",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Х",
    "J": "Й",
    "K": "К",
    "L": "Л",
    ":": "Ч",
    "\"": "Ь",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "х",
    "j": "й",
    "k": "к",
    "l": "л",
    ";": "ч",
    "'": "ь",

    "Z": "З",
    "X": "Ж",
    "C": "Ц",
    "V": "В",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": ";",
    ">": ":",
    "?": "?",

    "z": "з",
    "x": "ж",
    "c": "ц",
    "v": "в",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": ",",
    ".": ".",
    "/": "/"
  };

                              // YaZHert2 = Maslov with 'zh' and 'v' changed
    var KbdVariant10 = {
    "~": "Ю",
    "!": "!",
    "@": "@",
    "#": "ъ",
    "$": "Ъ",
    "%": "%",
    "^": "ё",
    "&": "Ё",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "Ч",

    "`": "ю",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "ч",

    "Q": "Я",
    "W": "Ж",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "Ы",
    "U": "У",
    "I": "И",
    "O": "О",
    "P": "П",
    "{": "Ш",
    "}": "Щ",
    "|": "Э",

    "q": "я",
    "w": "ж",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "ы",
    "u": "у",
    "i": "и",
    "o": "о",
    "p": "п",
    "[": "ш",
    "]": "щ",
    "\\": "э",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Х",
    "J": "Й",
    "K": "К",
    "L": "Л",
    ":": ":",
    "\"": "\"",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "х",
    "j": "й",
    "k": "к",
    "l": "л",
    ";": ";",
    "'": "'",

    "Z": "З",
    "X": "Ь",
    "C": "Ц",
    "V": "В",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": "<",
    ">": ">",
    "?": "?",

    "z": "з",
    "x": "ь",
    "c": "ц",
    "v": "в",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": ",",
    ".": ".",
    "/": "/"
  };
                             // YaZHert3  ~ orig. of SoftCorp.
    var KbdVariant11 = {
    "~": "Ю",
    "!": "!",
    "@": "\"",
    "#": "#",
    "$": "?",
    "%": "%",
    "^": "\\",
    "&": "/",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "Ъ",

    "`": "ю",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "ъ",

    "Q": "Я",
    "W": "Ж",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "Ы",
    "U": "У",
    "I": "И",
    "O": "О",
    "P": "П",
    "{": "Ш",
    "}": "Щ",
    "|": "Э",

    "q": "я",
    "w": "ж",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "ы",
    "u": "у",
    "i": "и",
    "o": "о",
    "p": "п",
    "[": "ш",
    "]": "щ",
    "\\": "э",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Х",
    "J": "Й",
    "K": "К",
    "L": "Л",
    ":": "Ч",
    "\"": "Ё",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "х",
    "j": "й",
    "k": "к",
    "l": "л",
    ";": "ч",
    "'": "ё",

    "Z": "З",
    "X": "Ь",
    "C": "Ц",
    "V": "В",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": ";",
    ">": ":",
    "?": "Ъ",

    "z": "з",
    "x": "ь",
    "c": "ц",
    "v": "в",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": ",",
    ".": ".",
    "/": "ъ"
  };



                     // YaYuertj
  var KbdVariant12 = {
    "~": "Ё",
    "!": "!",
    "@": "\"",
    "#": "#",
    "$": ";",
    "%": "%",
    "^": ":",
    "&": "?",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "+",

    "`": "ё",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "=",

    "Q": "Я",
    "W": "Ю",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "Й",
    "U": "У",
    "I": "И",
    "O": "О",
    "P": "П",
    "{": "Ы",
    "}": "Ъ",
    "|": "|",

    "q": "я",
    "w": "ю",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "й",
    "u": "у",
    "i": "и",
    "o": "о",
    "p": "п",
    "[": "ы",
    "]": "ъ",
    "\\": "/",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Х",
    "J": "Ж",
    "K": "К",
    "L": "Л",
    ":": "Ч",
    "\"": "Ц",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "х",
    "j": "ж",
    "k": "к",
    "l": "л",
    ";": "ч",
    "'": "ц",

    "Z": "З",
    "X": "Щ",
    "C": "Ш",
    "V": "В",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": "Ь",
    ">": ",",
    "?": "Э",

    "z": "з",
    "x": "щ",
    "c": "ш",
    "v": "в",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": "ь",
    ".": ".",
    "/": "э"
  };


  var KbdVariant13 = {  // Plato YaSHert - http://web.archive.org/web/20020205161623/http:/www.suba.com/~pete/cyrillic.htm
    "~": "~",
    "!": "!",
    "@": "Щ",
    "#": "Э",
    "$": "Ё",
    "%": "Ъ",
    "^": "Ь",
    "&": "Ю",
    "*": "Й",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "+",

    "`": "#",
    "1": "$",
    "2": "щ",
    "3": "э",
    "4": "ё",
    "5": "ъ",
    "6": "ь",
    "7": "ю",
    "8": "й",
    "9": "*",
    "0": "%",
    "-": "-",
    "=": "=",

    "Q": "Я",
    "W": "Ш",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "Ы",
    "U": "У",
    "I": "И",
    "O": "О",
    "P": "П",
    "{": "&",
    "}": "@",
    "|": "№",

    "q": "я",
    "w": "ш",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "ы",
    "u": "у",
    "i": "и",
    "o": "о",
    "p": "п",
    "[": "[",
    "]": "]",
    "\\": "\\",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Ч",
    "J": "Ж",
    "K": "К",
    "L": "Л",
    ":": ":",
    "\"": "\"",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "ч",
    "j": "ж",
    "k": "к",
    "l": "л",
    ";": ";",
    "'": "'",

    "Z": "З",
    "X": "Х",
    "C": "Ц",
    "V": "В",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": "<",
    ">": ">",
    "?": "?",

    "z": "з",
    "x": "х",
    "c": "ц",
    "v": "в",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": ",",
    ".": ".",
    "/": "/"
  };


                                 // YaZHert - Ukrainian
  var KbdVariant14 = {
    "~": "Ю",
    "!": "!",
    "@": "ї",
    "#": "Ї",
    "$": "$",
    "%": "%",
    "^": "ґ",
    "&": "Ґ",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "Ь",

    "`": "ю",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "ь",

    "Q": "Я",
    "W": "Ж",
    "E": "Е",
    "R": "Р",
    "T": "Т",
    "Y": "И",
    "U": "У",
    "I": "І",
    "O": "О",
    "P": "П",
    "{": "Ш",
    "}": "Щ",
    "|": "Є",

    "q": "я",
    "w": "ж",
    "e": "е",
    "r": "р",
    "t": "т",
    "y": "и",
    "u": "у",
    "i": "і",
    "o": "о",
    "p": "п",
    "[": "ш",
    "]": "щ",
    "\\": "є",

    "A": "А",
    "S": "С",
    "D": "Д",
    "F": "Ф",
    "G": "Г",
    "H": "Ч",
    "J": "Й",
    "K": "К",
    "L": "Л",
    ":": ":",
    "\"": "\"",

    "a": "а",
    "s": "с",
    "d": "д",
    "f": "ф",
    "g": "г",
    "h": "ч",
    "j": "й",
    "k": "к",
    "l": "л",
    ";": ";",
    "'": "'",

    "Z": "З",
    "X": "Х",
    "C": "Ц",
    "V": "В",
    "B": "Б",
    "N": "Н",
    "M": "М",
    "<": "<",
    ">": ">",
    "?": "?",

    "z": "з",
    "x": "х",
    "c": "ц",
    "v": "в",
    "b": "б",
    "n": "н",
    "m": "м",
    ",": ",",
    ".": ".",
    "/": "/"
  };

//////////////////////////////////////////////////////////

                   // MS Standard йцукен
  var KbdVariant30 = {
    "~": "Ё",
    "!": "!",
    "@": "\"",
    "#": "№",
    "$": ";",
    "%": "%",
    "^": ":",
    "&": "?",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "+",

    "`": "ё",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "=",

    "Q": "Й",
    "W": "Ц",
    "E": "У",
    "R": "К",
    "T": "Е",
    "Y": "Н",
    "U": "Г",
    "I": "Ш",
    "O": "Щ",
    "P": "З",
    "{": "Х",
    "}": "Ъ",
    "|": "/",

    "q": "й",
    "w": "ц",
    "e": "у",
    "r": "к",
    "t": "е",
    "y": "н",
    "u": "г",
    "i": "ш",
    "o": "щ",
    "p": "з",
    "[": "х",
    "]": "ъ",
    "\\": "\\",

    "A": "Ф",
    "S": "Ы",
    "D": "В",
    "F": "А",
    "G": "П",
    "H": "Р",
    "J": "О",
    "K": "Л",
    "L": "Д",
    ":": "Ж",
    "\"": "Э",

    "a": "ф",
    "s": "ы",
    "d": "в",
    "f": "а",
    "g": "п",
    "h": "р",
    "j": "о",
    "k": "л",
    "l": "д",
    ";": "ж",
    "'": "э",

    "Z": "Я",
    "X": "Ч",
    "C": "С",
    "V": "М",
    "B": "И",
    "N": "Т",
    "M": "Ь",
    "<": "Б",
    ">": "Ю",
    "?": ",",

    "z": "я",
    "x": "ч",
    "c": "с",
    "v": "м",
    "b": "и",
    "n": "т",
    "m": "ь",
    ",": "б",
    ".": "ю",
    "/": "."
  };

                   // MS Typewriter йцукен
  var KbdVariant31 = {
    "~": "+",
    "!": "1",
    "@": "2",
    "#": "3",
    "$": "4",
    "%": "5",
    "^": "6",
    "&": "7",
    "*": "8",
    "(": "9",
    ")": "0",
    "_": "=",
    "+": "\\",

    "`": "|",
    "1": "№",
    "2": "-",
    "3": "/",
    "4": "\"",
    "5": ":",
    "6": ",",
    "7": ".",
    "8": "_",
    "9": "?",
    "0": "%",
    "-": "!",
    "=": ";",

    "Q": "Й",
    "W": "Ц",
    "E": "У",
    "R": "К",
    "T": "Е",
    "Y": "Н",
    "U": "Г",
    "I": "Ш",
    "O": "Щ",
    "P": "З",
    "{": "Х",
    "}": "Ъ",
    "|": "(",

    "q": "й",
    "w": "ц",
    "e": "у",
    "r": "к",
    "t": "е",
    "y": "н",
    "u": "г",
    "i": "ш",
    "o": "щ",
    "p": "з",
    "[": "х",
    "]": "ъ",
    "\\": ")",

    "A": "Ф",
    "S": "Ы",
    "D": "В",
    "F": "А",
    "G": "П",
    "H": "Р",
    "J": "О",
    "K": "Л",
    "L": "Д",
    ":": "Ж",
    "\"": "Э",

    "a": "ф",
    "s": "ы",
    "d": "в",
    "f": "а",
    "g": "п",
    "h": "р",
    "j": "о",
    "k": "л",
    "l": "д",
    ";": "ж",
    "'": "э",

    "Z": "Я",
    "X": "Ч",
    "C": "С",
    "V": "М",
    "B": "И",
    "N": "Т",
    "M": "Ь",
    "<": "Б",
    ">": "Ю",
    "?": "Ё",

    "z": "я",
    "x": "ч",
    "c": "с",
    "v": "м",
    "b": "и",
    "n": "т",
    "m": "ь",
    ",": "б",
    ".": "ю",
    "/": "ё"
  };

                     // Alphabet order
  var KbdVariant32 = {
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "+",

    "`": "`",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "=",

    "Q": "А",
    "W": "Б",
    "E": "В",
    "R": "Г",
    "T": "Д",
    "Y": "Е",
    "U": "Ё",
    "I": "Ж",
    "O": "З",
    "P": "И",
    "{": "И",
    "}": "К",
    "|": "|",

    "q": "а",
    "w": "б",
    "e": "в",
    "r": "г",
    "t": "д",
    "y": "е",
    "u": "ё",
    "i": "ж",
    "o": "з",
    "p": "и",
    "[": "й",
    "]": "к",
    "\\": "\\",

    "A": "Л",
    "S": "М",
    "D": "Н",
    "F": "О",
    "G": "П",
    "H": "Р",
    "J": "С",
    "K": "Т",
    "L": "У",
    ":": "Ф",
    "\"": "Х",

    "a": "л",
    "s": "м",
    "d": "н",
    "f": "о",
    "g": "п",
    "h": "р",
    "j": "с",
    "k": "т",
    "l": "у",
    ";": "ф",
    "'": "х",

    "Z": "Ц",
    "X": "Ч",
    "C": "Ш",
    "V": "Щ",
    "B": "Ъ",
    "N": "Ы",
    "M": "Ь",
    "<": "Э",
    ">": "Ю",
    "?": "Я",

    "z": "ц",
    "x": "ч",
    "c": "ш",
    "v": "щ",
    "b": "ъ",
    "n": "ы",
    "m": "ь",
    ",": "э",
    ".": "ю",
    "/": "я"
  };

                     // MS Standard йцукен - Ukrainian. Украинская стандартная - см.
                     // http://www.microsoft.com/globaldev/reference/keyboards.aspx

  var KbdVariant33 = {
    "~": "Ё",
    "!": "!",
    "@": "\"",
    "#": "№",
    "$": ";",
    "%": "%",
    "^": ":",
    "&": "?",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "Ґ",

    "`": "ё",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "ґ",

    "Q": "Й",
    "W": "Ц",
    "E": "У",
    "R": "К",
    "T": "Е",
    "Y": "Н",
    "U": "Г",
    "I": "Ш",
    "O": "Щ",
    "P": "З",
    "{": "Х",
    "}": "Ї",
    "|": "/",

    "q": "й",
    "w": "ц",
    "e": "у",
    "r": "к",
    "t": "е",
    "y": "н",
    "u": "г",
    "i": "ш",
    "o": "щ",
    "p": "з",
    "[": "х",
    "]": "ї",
    "\\": "\\",

    "A": "Ф",
    "S": "І",
    "D": "В",
    "F": "А",
    "G": "П",
    "H": "Р",
    "J": "О",
    "K": "Л",
    "L": "Д",
    ":": "Ж",
    "\"": "Є",

    "a": "ф",
    "s": "і",
    "d": "в",
    "f": "а",
    "g": "п",
    "h": "р",
    "j": "о",
    "k": "л",
    "l": "д",
    ";": "ж",
    "'": "є",

    "Z": "Я",
    "X": "Ч",
    "C": "С",
    "V": "М",
    "B": "И",
    "N": "Т",
    "M": "Ь",
    "<": "Б",
    ">": "Ю",
    "?": ",",

    "z": "я",
    "x": "ч",
    "c": "с",
    "v": "м",
    "b": "и",
    "n": "т",
    "m": "ь",
    ",": "б",
    ".": "ю",
    "/": "."
  };



    var KbdVariant888 = {   // To Translit
    "~": "~",
    "!": "!",
    "@": "@",
    "#": "#",
    "$": "$",
    "%": "%",
    "^": "^",
    "&": "&",
    "*": "*",
    "(": "(",
    ")": ")",
    "_": "_",
    "+": "+",

    "`": "`",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "-": "-",
    "=": "=",

    "{": "{",
    "}": "}",
    "|": "|",
    "[": "[",
    "]": "]",
    "\\": "\\",

    ":": ":",
    "\"": "\"",
    ";": ";",
    "'": "'",

    "<": "<",
    ">": ">",
    "?": "?",
    ",": ",",
    ".": ".",
    "/": "/",

    "А": "A",
    "Б": "B",
    "В": "V",
    "Г": "G",
    "Д": "D",
    "Е": "E",
    "Ё": "Yo",
    "Ж": "Zh",
    "З": "Z",
    "И": "I",
    "Й": "J",
    "К": "K",
    "Л": "L",
    "М": "M",
    "Н": "N",
    "О": "O",
    "П": "P",
    "Р": "R",
    "С": "S",
    "Т": "T",
    "У": "U",
    "Ф": "F",
    "Х": "X",
    "Ц": "Ts",
    "Ч": "Ch",
    "Ш": "Sh",
    "Щ": "Sch",
    "Ъ": "\"",
    "Ы": "Y",
    "Ь": "'",
    "Э": "E",
    "Ю": "Yu",
    "Я": "Ya",

    "а": "a",     // 0
    "б": "b",     // 1
    "в": "v",     // 2
    "г": "g",     // 3
    "д": "d",     // 4
    "е": "e",     // 5
    "ё": "yo",    // 6
    "ж": "zh",    // 7
    "з": "z",     // 8
    "и": "i",     // 9
    "й": "j",     // 10
    "к": "k",     // 11
    "л": "l",     // 12
    "м": "m",     // 13
    "н": "n",     // 14
    "о": "o",     // 15
    "п": "p",     // 16
    "р": "r",     // 17
    "с": "s",     // 18
    "т": "t",     // 19
    "у": "u",     // 20
    "ф": "f",     // 21
    "х": "x",     // 22
    "ц": "ts",    // 23
    "ч": "ch",    // 24
    "ш": "sh",    // 25
    "щ": "sch",  // 26
    "ъ": "\"",    // 27
    "ы": "y",     // 28
    "ь": "'",     // 29
    "э": "e",     // 30
    "ю": "yu",    // 31
    "я": "ya"     // 32

  };


  var Pictures = {
    '1': 'kbd/yazhert.png',
    '2': 'kbd/yawert.png',
    '3': 'kbd/yashert.png',
    '4': 'kbd/yaschert.png',
    '5': 'kbd/student.png',  // AATSEEL Student
    '6': 'kbd/macintosh.png',
    '7': 'kbd/yawert2.png',
    '8': 'kbd/yashert2.png',
    '9': 'kbd/yashert3.png',
   '10': 'kbd/yazhert2.png',
   '11': 'kbd/yazhert3.png',
   '12': 'kbd/yayuertj.png',
   '13': 'kbd/plato.png',
   '14': 'kbd/yazh_ukr.png',
   '30': 'kbd/std_ru.png',
   '31': 'kbd/std_rutw.png',
   '32': 'kbd/alphabet.png',
   '33': 'kbd/std_ukr.png',
  '888': 'kbd/cyr-lat.png'
  };


  var vkb_layoutTypeArrayNonUS = {
  '41':  'Slayouts',
  '61':  'Flayouts',
  '62':  'Flayouts',
  '42':  'Slayouts',
  '71':  'Flayouts',
  '72':  'Flayouts',
  '73':  'Flayouts',
  '43':  'Slayouts',
  '81':  'Flayouts',
  '44':  'Slayouts',
  '91':  'Flayouts',
  '45':  'Slayouts',
  '101': 'Flayouts',
  '46':  'Slayouts',
  '111': 'Flayouts',
  '112': 'Flayouts',
  '47':  'Slayouts',
  '121': 'Flayouts',
  '122': 'Flayouts',
  '48':  'Slayouts',
  '131': 'Flayouts'
  };

var vkb_optionArrayNonUS = {
'41':  1,
'61':  1,
'62':  2,
'42':  1,
'71':  1,
'72':  2,
'73':  3,
'43':  1,
'81':  1,
'44':  1,
'91':  1,
'45':  1,
'101': 1,
'46':  1,
'111': 1,
'112': 2,
'47':  1,
'121': 1,
'122': 2,
'48':  1,
'131': 1
};


var vkb_optionKbdArrayNonUS = {
'DE':  1,
'SV':  2,
'FR':  3,
'IT':  4,
'ES':  5,
'IL':  6,
'UK':  7,
'NO':  8
};



//////////////////////////////////////////////////////////

var ListName;

var RUSymbols = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя";

var Show_ToLatin = false;
if (typeof ToLatin != 'undefined')
{
  if (ToLatin)
  {
    Show_ToLatin = true;
  }
}


if (Opera)
 if (OperaVer >= 8) Br = "NN"; // Opera 8 works as Mozilla

//if (MSIE)
 //  if (MSIEVer > 10) Br = "NN"; // MS IE 11 and up works as Mozilla

/*
 * Mozilla did not let me use arrow buttons, Home/End, Fx buttons, etc.
 * The solution was for Mozilla do NOT use event.keyCode, use just event.charCode
 * or to issue
 *     if (evt.ctrlKey)		// Separate pressing 'c' from Ctrl/c
 *        return true;
 * and
 *     if (evt.which == 0)      // To have arrows, etc. work
 *         return true;


the third argument to changeKey should be a function
   function exampleKeyChecker (keyCode, CurrentKey)
which returns an object
  { cancelKey: boolean, replaceKey: boolean, newKeyCode: number, newKey:
    string }
Not all properties need to be present, if cancelKey is set to true the
other properties are not needed.
If replaceKey is set to true then at least newKeyCode needs to be set.

Newly found:
Gecko browsers (and many others) have boolean properties of the event
object:-

event.altKey
event.ctrlKey
event.metaKey
event.shiftKey

adding .metaKey fixes Copy/Paste non-working problem on Mac computer
*/

var dotReplacement=null;

function changeKey (textControl, evt, keyChecker1)
{

   if (CyrFromKbd == 'Off' && KbdVariant != '888')  // regular latin editing
     return true;

   if (evt.ctrlKey || evt.metaKey || evt.altKey) // no "|| evt.shiftKey" - bad for Shift+letter typing
     return true;

  var keyChecker = eval(keyChecker1); // function name

  var keyCode = void 0;

  keyCode = evt.keyCode ? evt.keyCode :
               evt.charCode ? evt.charCode :
               evt.which ? evt.which : void 0;

  if (evt.which == 0)
     return true;

  var CurrentKey;

  if (keyCode)
     CurrentKey = String.fromCharCode(keyCode);


  var keyCheck = keyChecker(keyCode, CurrentKey);




  if ( (keyCode && window.event && !window.opera && !WebKitOK)  && !MSIE11 && !Ffox)   // IE before ver 11
  {

    if (keyCheck.cancelKey)
      return false;
    else if (keyCheck.replaceKey)
    {
      window.event.keyCode = keyCheck.newKeyCode;
      if (window.event.preventDefault)
          window.event.preventDefault();
      return true;
    }
    else
      return true;
  }
  else if (typeof textControl.setSelectionRange != 'undefined') // NN
  {

    if (keyCheck.cancelKey)
    {
      if (evt.preventDefault)
         evt.preventDefault();
      return false;
    }
    else if (keyCheck.replaceKey)
    {

      var oldSelectionStart = textControl.selectionStart;
      var oldSelectionEnd = textControl.selectionEnd;
      var selectedText = textControl.value.substring(oldSelectionStart, oldSelectionEnd);
      var newText = typeof keyCheck.newKey != 'undefined' ?
                    keyCheck.newKey : String.fromCharCode(keyCheck.newKeyCode);

      if ( Opera && (OperaVer >= 9) && (keyCode == 46 || keyCode == 35 || keyCode == 36) )
      {
          dotReplacement = newText;  // dot/Del or Home/# or End/$
          return true;
      }
      else dotReplacement = null;


      // cancel the key event and insert the newKey for the current selection
      if (evt.preventDefault)
         evt.preventDefault();


      var scrollTop, scrollLeft;
      if (textControl.type == 'textarea' && typeof textControl.scrollTop != 'undefined')
      {
         scrollTop  = textControl.scrollTop;
         scrollLeft = textControl.scrollLeft;
      }
      textControl.value =
               textControl.value.substring(0, oldSelectionStart) +
               newText +
               textControl.value.substring(oldSelectionEnd);

      if (typeof scrollTop != 'undefined')
      {
         textControl.scrollTop  = scrollTop;
         textControl.scrollLeft = scrollLeft;
      }
      textControl.setSelectionRange(oldSelectionStart + newText.length,
                                    oldSelectionStart + newText.length);
      return false;
    }
    else
      return true;
  }          // Other browser:
  else if (keyCheck.cancelKey)
  {
    if (evt.preventDefault)
        evt.preventDefault();
    return false;
  }
  else
   return true;
}


function fIE (keyCode, CurrentKey) {

  if (KbdVariant == '888')  // To Translit
  {

      if (RUSymbols.indexOf(CurrentKey) != -1)
      {
         if ( txtControl.isTextEdit )
         {

             var newString = KbdVariant888[CurrentKey];
             insertAtCaret(txtControl, newString);
         }
         return { cancelKey: true };
      }
      else
         return { cancelKey: false };
  }
  else       // Regular
  {
   if (CyrFromKbd == 'On')
   {
       var newKeyOut = eval("KbdVariant" + KbdVariant)[CurrentKey];
       if (newKeyOut)
         return { replaceKey: true, newKeyCode: newKeyOut.charCodeAt(), newKey: newKeyOut };
       else
         return { cancelKey: false };
   }
   else
      return { cancelKey: false };
  }
}
  // Copyright (c) 2013  Paul Gorodyansky http://WinRus.com http://Klava.WinRus.com
function fNN (keyCode, CurrentKey) {

  if (KbdVariant == '888')  // To Translit
  {
      if (RUSymbols.indexOf(CurrentKey) != -1)
      {
          return { replaceKey: true, newKeyCode: keyCode, newKey:
                   KbdVariant888[CurrentKey] };
      }
      else
         return { cancelKey: false };
  }
  else
  {
   if (CyrFromKbd == 'On')
   {
       var newKeyOut = eval("KbdVariant" + KbdVariant)[CurrentKey];

       if (newKeyOut)
         return { replaceKey: true, newKeyCode: keyCode, newKey: newKeyOut };
       else
         return { cancelKey: false };
   }
   else
      return { cancelKey: false };
  }
}

function fOther (keyCode, CurrentKey) {

  if (KbdVariant == '888')  // To Translit
  {
      if (RUSymbols.indexOf(CurrentKey) != -1)
      {
         var newString = KbdVariant888[CurrentKey];
         txtControl.value += newString;
         return { cancelKey: true };
      }
      else
         return { cancelKey: false };
  }
  else
  {
   if (CyrFromKbd == 'On')
   {
      var newKeyOut = eval("KbdVariant" + KbdVariant)[CurrentKey];
      if (newKeyOut)
      {
         txtControl.value += newKeyOut;
         return { cancelKey: true };
      }
      else
         return { cancelKey: false };
   }
   else
      return { cancelKey: false };
  }
}



/************ End of main, typing related code *************************************/

function Kbd_OnOff(form,ev)
{
   var mKey = ModeSwitchKeyPressed(ev);

   var swKeyPressed = false;

 if (WebKit) { if (mKey == 27) swKeyPressed = true; } // only Esc
 else
 {
   if (Opera)
   {
     if (OperaVer < 8) {if (mKey == 27) swKeyPressed = true;}
     else {if (mKey == 117) swKeyPressed = true;}
   }
   else {if (mKey == 27 || mKey == 123) swKeyPressed = true;}

 }


   if (swKeyPressed)
   {
      if (typeof UseVirtKbd != 'undefined')
      {
         if (UseVirtKbd)
             switchMode(form);
      }
      else
         switchMode(form);

      if (Br == "IE")
         ev.returnValue=false;
   }
}
                        // 17 - Ctrl, 123 - F12, 117 - F6, ESC - 27
                        // IE - standard behavior for TEXTAREA -
                        // remove all text if press Esc. Can be overridden, unlike Firefox and Opera 9:
                        // Firefox does the same, but only in <input type='text' and not in <textarea
                        // Opera - since ver 9 - Esc: a) "deselect all" b) input field looses focus
                        // Opera 7 - can not use F6. So in Opera 7 - use Esc, then from ver 8 - F6
                        // Google Chrome (WebKit) - only Esc as F12 and F6 are used by the browser

function ModeSwitchKeyPressed(ev)
{
  if (window.event) return window.event.keyCode
  else if (ev) return ev.which
       else return null;
}


function switchMode(form)
{
  if (CyrFromKbd == 'Off')
  {
    CyrFromKbd = 'On';
    form.fromKbd[0].checked = true; // "On"
  }
  else
  {
    CyrFromKbd = 'Off';
    form.fromKbd[1].checked = true;  // "Off"
  }
  txtControl.focus();
}

function NewKbdPic(name,picture)
{
  if (KbdVariant == "888" && interfaceLanguage == 'E')
      picture = 'kbd/cyr-late.png';

  if (window.document.images) window.document.images[name].src = picture;
}

function SetVariant(myForm, sName, variant, PicTagName)
{
  var pic;
  if (variant.value == "0") {variant.value = KbdVariant; // txtControl.focus();
                             return false;}

  variant.selected = true;  KbdVariant = variant.value;  // txtControl.focus();

  if (KbdPhysical != "EN") // non-US
  {
     if (typeof JSnonUSwasLoaded != 'undefined')
     {
       if (JSnonUSwasLoaded)
       {
         nonUS_SetVariant(myForm, KbdVariant, PicTagName);
         storeIntelligentCookie(cookieName,KbdVariant);
       }
     }
  }
  else
  {
     pic = Pictures[KbdVariant];
     NewKbdPic(PicTagName, pic);

     // if (sName != "Latin")
         storeIntelligentCookie(cookieName,KbdVariant);
     //else storeIntelligentCookie(cookieName,"888");
  }

  if (sName == "Slayouts")
  {
     myForm.Flayouts.options[0].selected = true;
     if (Show_ToLatin)
     {
        myForm.Latin.options[0].selected = true;
        if (myLatinForm != null)
           myLatinForm.Latin2.options[0].selected = true;
     }
  }
  else if (sName == "Flayouts")
  {
     myForm.Slayouts.options[0].selected = true;
     if (Show_ToLatin)
     {
      myForm.Latin.options[0].selected = true;
      if (myLatinForm != null)
          myLatinForm.Latin2.options[0].selected = true;
     }
  }
  else
  {
        // "Latin" then:
        myForm.Flayouts.options[0].selected = true;
        myForm.Slayouts.options[0].selected = true;
  }

}

function KbdPhysicalCalculate(num)  // non-US keyboard modes
{
  if (num < 60) // Standard
  {
    switch (num)
    {
      case 41:   KbdPhysical = "DE"; vkb_curImage = "kbd/std_de.png"; break;
      case 42:   KbdPhysical = "SV"; vkb_curImage = "kbd/std_sv.png"; break;
      case 43:   KbdPhysical = "FR"; vkb_curImage = "kbd/std_fr.png"; break;
      case 44:   KbdPhysical = "IT"; vkb_curImage = "kbd/std_it.png"; break;
      case 45:   KbdPhysical = "ES"; vkb_curImage = "kbd/std_es.png"; break;
      case 46:   KbdPhysical = "UK"; vkb_curImage = "kbd/std_uk.png"; break;
      case 47:   KbdPhysical = "IL"; vkb_curImage = "kbd/std_il.png"; break;
      case 48:   KbdPhysical = "NO"; vkb_curImage = "kbd/std_no.png"; break;
      default: break;
    }
  }
  else
  {
    if (num < 70) {KbdPhysical = "DE"; if (num==61) vkb_curImage="kbd/german1.png"; else vkb_curImage="kbd/german2.png";}
    else if (num < 80) {KbdPhysical = "SV"; if (num==71) vkb_curImage="kbd/swedish1.png"; else if (num==72) vkb_curImage="kbd/swedish2.png"; else vkb_curImage="kbd/swedish3.png";}
         else if (num < 90) {KbdPhysical = "FR"; vkb_curImage="kbd/french1.png";}
              else if (num < 100) {KbdPhysical = "IT"; vkb_curImage="kbd/italian1.png";}
                   else if (num < 110) {KbdPhysical = "ES"; vkb_curImage="kbd/spanish1.png";}
                        else if (num < 120) {KbdPhysical = "UK"; if (num==111) vkb_curImage="kbd/british1.png"; else vkb_curImage="kbd/brit1ukr.png";}
                             else if (num < 130) {KbdPhysical = "IL"; if (num==121) vkb_curImage="kbd/hebrew1.png"; else vkb_curImage="kbd/hebrew2.png";}
                                  else if (num < 140) {KbdPhysical = "NO"; if (num==131) vkb_curImage="kbd/norwegian.png";}
  }

}


function UseCookie()
{
 vkb_KbdVariantNonDefault = true;
 vkb_KbdVariantNumber = parseFloat(KbdVariant);
 var vkb_tmpNum;

   if (vkb_KbdVariantNumber > 39 && vkb_KbdVariantNumber != 888)
   {
       vkb_tmpNum = vkb_layoutTypeArrayNonUS[KbdVariant];
       if (typeof vkb_tmpNum == 'undefined') vkb_KbdVariantNonDefault = false; // erroneous; set back
       else
       {
        if (!JSnonUSwasLoaded) vkb_KbdVariantNonDefault = false;
        else
        {
          if (interfaceLanguage == 'E' && !JSnon_EwasLoaded) vkb_KbdVariantNonDefault = false;
          else KbdPhysicalCalculate(vkb_KbdVariantNumber); // sets KbdPhysical and vkb_curImage
        }
       }
   }
   else
   {
     vkb_tmpNum = Pictures[KbdVariant];
     if (typeof vkb_tmpNum == 'undefined') vkb_KbdVariantNonDefault = false; // erroneous; set back
     else vkb_curImage = vkb_tmpNum;
   }


 if (!vkb_KbdVariantNonDefault) // erroneous; set back
    { KbdVariant = "0"; vkb_KbdVariantNumber = 0;}

}


function SetupPerCookie()
{
 var tmp_Keyboard,  tmp_ItemNumber, tmp_Layout;

    if (vkb_KbdVariantNumber > 39)
    {
      tmp_Keyboard = vkb_optionKbdArrayNonUS[KbdPhysical];
      myForm.Keyboards.options[tmp_Keyboard].selected=true;

      tmp_ItemNumber = vkb_optionArrayNonUS[KbdVariant];

      tmp_Layout = vkb_layoutTypeArrayNonUS[KbdVariant];

      if (interfaceLanguage == 'E' && JSnon_EwasLoaded) nonUSsetMenusE(KbdPhysical);
      else nonUSsetMenus(KbdPhysical);
    }
    else if (vkb_KbdVariantNumber > 29) { tmp_Layout="Slayouts"; tmp_ItemNumber = vkb_KbdVariantNumber - 30 + 1;}
         else {tmp_Layout="Flayouts"; tmp_ItemNumber = vkb_KbdVariantNumber;}


 if (tmp_Layout == "Slayouts")
 {
   myForm.Flayouts.options[0].selected = true;
   myForm.Slayouts.options[tmp_ItemNumber].selected = true;
 }
 else
 {
   myForm.Slayouts.options[0].selected = true;
   myForm.Flayouts.options[tmp_ItemNumber].selected = true;
 }
}


function CopyText(box, parent_box)
{
   var txt = parent_box.value + box.value;

   parent_box.value = txt;
   // parent_box.focus();
}

function saveCaret(elem)
{

  if ( elem.isTextEdit && !MSIE11)
  {
     elem.caretPos = document.selection.createRange();
   }

  if (Opera && OperaVer >= 9 && dotReplacement != null)
  {
            var oldSelectionStart = elem.selectionStart;
            var oldSelectionEnd = elem.selectionEnd;
            var selectedText = elem.value.substring(oldSelectionStart, oldSelectionEnd);

            var str1 = elem.value.substring(0, oldSelectionStart);
            var sym = str1.substring(str1.length - 1);

            if (sym == "." || sym == "#" || sym == "$")
            {
               elem.value = elem.value.substring(0, oldSelectionStart-1) +
                            dotReplacement +
                            elem.value.substring(oldSelectionEnd);

               elem.setSelectionRange(oldSelectionStart, oldSelectionStart);
            }
            dotReplacement = null;
  }
}

function insertAtCaret(textElement, newText)
{



    if (Br == "NN" || MSIE11)
    {
       if (typeof textElement.setSelectionRange != 'undefined')
       {
         var oldSelectionStart = textElement.selectionStart;
         var oldSelectionEnd = textElement.selectionEnd;
         var selectedText = textElement.value.substring(oldSelectionStart, oldSelectionEnd);

         var scrollTop, scrollLeft;
         if (textElement.type == 'textarea' &&
             typeof textElement.scrollTop != 'undefined')
         {
            scrollTop  = textElement.scrollTop;
            scrollLeft = textElement.scrollLeft;
         }
         textElement.value =
                  textElement.value.substring(0, oldSelectionStart) +
                  newText +
                  textElement.value.substring(oldSelectionEnd);

         if (typeof scrollTop != 'undefined')
         {
            textElement.scrollTop  = scrollTop;
            textElement.scrollLeft = scrollLeft;
         }
         textElement.setSelectionRange(oldSelectionStart + newText.length,
                                      oldSelectionStart + newText.length);
       }
    }
    else if (Br == "IE")
         {
            if ( textElement.isTextEdit )
	    {
				if ( !textElement.caretPos )
				{
					saveCaret(textElement);
				}
				var caretPos = textElement.caretPos;
				caretPos.text = newText;
				caretPos.select();
	   }
         }
         else
            textElement.value += newText;



}

/*
var rus-eng = {
 "Ё"  :  "~",
 "!"   :  "!",
 "\""  :  "@",
 "№" :  "#",
 ";"   :  "$",
 "%"   :  "%",
 ":"   :  "^",
 "?"   :  "&",
 "*"   :  "*",
 "("   :  "(",
 ")"   :  ")",
 "_"   :  "_",
 "+"   :  "+",

 "ё"  :  "`",
 "1"   :  "1",
 "2"   :  "2",
 "3"   :  "3",
 "4"   :  "4",
 "5"   :  "5",
 "6"   :  "6",
 "7"   :  "7",
 "8"   :  "8",
 "9"   :  "9",
 "0"   :  "0",
 "-"   :  "-",
 "="   :  "=",

 "Й"  :  "Q",
 "Ц"  :  "W",
 "У"  :  "E",
 "К"  :  "R",
 "Е"  :  "T",
 "Н"  :  "Y",
 "Г"  :  "U",
 "Ш"  :  "I",
 "Щ"  :  "O",
 "З"  :  "P",
 "Х"  :  "{",
 "Ъ"  :  "}",
 "/"   :  "|",

 "й"  :  "q",
 "ц"  :  "w",
 "у"  :  "e",
 "к"  :  "r",
 "е"  :  "t",
 "н"  :  "y",
 "г"  :  "u",
 "ш"  :  "i",
 "щ"  :  "o",
 "з"  :  "p",
 "х"  :  "[",
 "ъ"  :  "]",
 "\\"  : "\\",

 "Ф"  :  "A",
 "Ы"  :  "S",
 "В"  :  "D",
 "А"  :  "F",
 "П"  :  "G",
 "Р"  :  "H",
 "О"  :  "J",
 "Л"  :  "K",
 "Д"  :  "L",
 "Ж"  :  ":",
 "Э"  : "\"",

 "ф"  :  "a",
 "ы"  :  "s",
 "в"  :  "d",
 "а"  :  "f",
 "п"  :  "g",
 "р"  :  "h",
 "о"  :  "j",
 "л"  :  "k",
 "д"  :  "l",
 "ж"  :  ";",
 "э"  :  "'",

 "Я"  :  "Z",
 "Ч"  :  "X",
 "С"  :  "C",
 "М"  :  "V",
 "И"   :  "B",
 "Т"  :  "N",
 "Ь"  :  "M",
 "Б"  :  "<",
 "Ю"  :  ">",
 ","   :  "?",

 "я"  :  "z",
 "ч"  :  "x",
 "с"  :  "c",
 "м"  :  "v",
 "и"  :  "b",
 "т"  :  "n",
 "ь"  :  "m",
 "б"  :  ",",
 "ю"  :  ".",
 "."   :  "/"};
 */

var ENSymbols = "~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"/|ZXCVBNM<>?`1234567890-=qwertyuiop[]\\asdfghjkl;'\\\\zxcvbnm,./";
//var ENSymbols = "~!@#$%^&*()_+`1234567890-=QWERTYUIOP{}|qwertyuiop[]\\ASDFGHJKL:\"asdfghjkl;'ZXCVBNM<>?zxcvbnm,./";

var Mouse30 = "Ё!\"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭ/|ЯЧСМИТЬБЮ,ё1234567890-=йцукенгшщзхъ\\фывапролджэ\\\\ячсмитьбю.";
var Mouse31 = "+1234567890=\\ЙЦУКЕНГШЩЗХЪ(ФЫВАПРОЛДЖЭ(|ЯЧСМИТЬБЮЁ|№-/\":,._?%!;йцукенгшщзхъ)фывапролджэ)\\ячсмитьбюё";
var Mouse32 = "~!@#$%^&*()_+АБВГДЕЁЖЗИЙК|ЛМНОПРСТУФХ||ЦЧШЩЪЫЬЭЮЯ`1234567890-=абвгдеёжзийк\\лмнопрстуфх\\\\цчшщъыьэюя";
var Mouse33 = "Ё!\"№;%:?*()_ҐЙЦУКЕНГШЩЗХЇ/ФІВАПРОЛДЖЄ/ҐЯЧСМИТЬБЮ,ё1234567890-ґйцукенгшщзхї\\фівапролджє\\ґячсмитьбю.";
var Mouse34 = "Ё!\"№;%:?*()_+ЙЦУКЕНГШЩЗХЪ/ФЫВАПРОЛДЖЭ/>ЯЧСМИТЬБЮ,ё1234567890-=йцукенгшщзхъ\\фывапролджэ\\<ячсмитьбю.";

var Mouse1  = "Ю!ъЪ$%ёЁ*()_ЬЯЖЕРТЫУИОПШЩЭАСДФГЧЙКЛ:\"Э|ЗХЦВБНМ<>?ю1234567890-ьяжертыуиопшщэасдфгчйкл;'э\\зхцвбнм,./";
var Mouse2  = "Ю!ъЪ$%ёЁ*()_ЬЯВЕРТЫУИОПШЩЭАСДФГЧЙКЛ:\"Э|ЗХЦЖБНМ<>?ю1234567890-ьявертыуиопшщэасдфгчйкл;'э\\зхцжбнм,./";
var Mouse3  = "Ю!ъЪ$%ёЁ*()_ЬЯШЕРТЫУИОПЖЩЭАСДФГЧЙКЛ:\"Э|ЗХЦЖБНМ<>?ю1234567890-ьяшертыуиопжщэасдфгчйкл;'э\\зхцжбнм,./";
var Mouse4  = "Ю!ъЪЬ%ёЁ*()_+ЯЩЕРТЫУИОПЖШЭАСДФГЧЙКЛ:\"Э|ЗХЦВБНМ<>?ю1234567890-=ящертыуиопжшэасдфгчйкл;ьэ\\зхцвбнм,./";
var Mouse5  = "Ё!@#\":^&*()_ЪЯШЕРТЫУИОПЮЩЭАСДФГЧЙКЛЬЖЭ|ЗХЦВБНМ<>?ё1234567890-ъяшертыуиопющэасдфгчйкльжэ\\зхцвбнм,./";
var Mouse6  = "Щ!@#$%ёЁ*()ЬЪЯШЕРТЫУИОПЮЖЭАСДФГЧЙКЛ:\"Э|ЗХЦВБНМ<>?щ1234567890ьъяшертыуиопюжэасдфгчйкл;'э\\зхцвбнм,./";
var Mouse7  = "Ю!@ъЪ%ёЁ*()_ЧЯВЕРТЫУИОПШЩЭАСДФГХЙКЛ:\"Э|ЗЬЦЖБНМ<>?ю1234567890-чявертыуиопшщэасдфгхйкл;'э\\зьцжбнм,./";
var Mouse8  = "Ё!-#$%^&*()ЭЩЯШЕРТЫУИОПЮЪ|АСДФГХЙКЛЧЖ||ЗЬЦВБНМ<>?ё1234567890эщяшертыуиопюъ\\асдфгхйклчж\\\\зьцвбнм,./";
var Mouse9  = "Ъ!\"№=%'+*()_ЩЯШЕРТЫУИОПЮЭЁАСДФГХЙКЛЧЬЁ|ЗЖЦВБНМ;:?ъ1234567890-щяшертыуиопюэёасдфгхйклчьё\\зжцвбнм,./";
var Mouse10 = "Ю!@ъЪ%ёЁ*()_ЧЯЖЕРТЫУИОПШЩЭАСДФГХЙКЛ:\"Э|ЗЬЦВБНМ<>?ю1234567890-чяжертыуиопшщэасдфгхйкл;'э\\зьцвбнм,./";
var Mouse11 = "Ю!\"#?%\\/*()_ЪЯЖЕРТЫУИОПШЩЭАСДФГХЙКЛЧЁЭ|ЗЬЦВБНМ;:Ъю1234567890-ъяжертыуиопшщэасдфгхйклчёэ\\зьцвбнм,.ъ";
var Mouse12 = "Ё!\"#;%:?*()_+ЯЮЕРТЙУИОПЫЪ|АСДФГХЖКЛЧЦ||ЗЩШВБНМЬ,Эё1234567890-=яюертйуиопыъ\\асдфгхжклчц\\\\зщшвбнмь.э";

var Mouse13 = "~!ЩЭЁЪЬЮЙ()_+ЯШЕРТЫУИОП&@№АСДФГЧЖКЛ:\"№|ЗХЦВБНМ<>?#$щэёъьюй*%-=яшертыуиоп[]\\асдфгчжкл;'\\\\зхцвбнм,./";

var Mouse14 = "Ю!їЇ$%ґҐ*()_ЬЯЖЕРТИУІОПШЩЄАСДФГЧЙКЛ:\"Є|ЗХЦВБНМ<>?ю1234567890-ьяжертиуіопшщєасдфгчйкл;'є\\зхцвбнм,./";



function fromAlphabet(LetNumber, evt)
{
  var CurrentKey;
  if (  KbdVariant != 888  )
  {
    var ListName;
    if (KbdVariant < 60 && KbdVariant > 40)  // non-US: std_ru layout for larger physical keyboard is the same for every language
    {
      if (KbdPhysical == "UK")       // |\ on the button in the bottom left
         ListName = Mouse30;
      else                           // <> on the button in the bottom left
         ListName = Mouse34;
    }
    else
     ListName = eval("Mouse" + KbdVariant);

    var ShiftNum = 49;

    if (evt.shiftKey)
        CurrentKey =  ListName.charAt(LetNumber);
    else
        CurrentKey =  ListName.charAt(LetNumber+ShiftNum);

    txtControl.focus();

	insertAtCaret(txtControl,CurrentKey);


   }
}




function RestoreRussian()
{
    var curTextPrepared="";

    var curText3=txtControl3.value;
    var txtLen = curText3.length;
    var i, currentSym, newKeyOut=null;
    for (i = 0; i < txtLen; i++)
    {
      currentSym =  curText3.charAt(i);
      newKeyOut = KbdVariant30[currentSym];
      if (typeof newKeyOut == 'undefined') curTextPrepared += currentSym;
      else                                 curTextPrepared += newKeyOut;
    }

    txtControl3.value = curTextPrepared;
    txtControl3.focus();

}
function RestoreEnglish()
{
    var curTextPrepared="";



    var curText3=txtControl3.value;
    var txtLen = curText3.length;
    var i, j, currentSym, newKeyOut=null;

    for (i = 0; i < txtLen; i++)
    {
      currentSym =  curText3.charAt(i);

      j = Mouse30.indexOf(currentSym);
      if ( j == -1) newKeyOut = currentSym;
      else newKeyOut = ENSymbols.charAt(j);

      curTextPrepared += newKeyOut;
    }

    txtControl3.value = curTextPrepared;
    txtControl3.focus();

}
JSwasLoaded = true;

function findPosX(obj)
{
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj)
{
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}

/////////////////////////////////////////////////////////////
// Extended Tooltip Javascript:
// copyright 9th August 2002, 3rd July 2005
// by Stephen Chapman, Felgall Pty Ltd
//
// Paul G: Modified, it was no choice: z-index in IE does not work with form's selection elements,
// so if they are under my mapped image, then tooltip's text is behind Selection elements
// Had to show tooltips always at the same position related to my image, where
// there are no Selection elements on the way
var DH = 0;var an = 0;var al = 0;var ai = 0;if (document.getElementById) {ai = 1; DH = 1;}else {if (document.all) {al = 1; DH = 1;} else { browserVersion = parseInt(navigator.appVersion); if ((navigator.appName.indexOf('Netscape') != -1) && (browserVersion == 4)) {an = 1; DH = 1;}}} function fd(oi, wS) {if (ai) return wS ? document.getElementById(oi).style:document.getElementById(oi); if (al) return wS ? document.all[oi].style: document.all[oi]; if (an) return document.layers[oi];}
function pw() {return window.innerWidth != null? window.innerWidth: document.body.clientWidth != null? document.body.clientWidth:null;}
function mouseX(evt) {if (evt.pageX) return evt.pageX; else if (evt.clientX)return evt.clientX + (document.documentElement.scrollLeft ?  document.documentElement.scrollLeft : document.body.scrollLeft); else return null;}
function mouseY(evt) {if (evt.pageY) return evt.pageY; else if (evt.clientY)return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop); else return null;}
function popUp(evt,oi,elID, t,l) {
        if (KbdVariant == '888') return;
        var diff=0;
        if (Br == 'IE' && !Opera) diff=60; else if (Opera) diff=-50; else if(WebKit) diff=20;
        var myObj=document.getElementById(elID);
        var toppos = findPosY(myObj)+ (t) +(diff);
        var leftpos = findPosX(myObj)+ (l);

        if (DH) {var wp = pw(); ds = fd(oi,1); dm = fd(oi,0); st = ds.visibility; if (dm.offsetWidth) ew = dm.offsetWidth; else if (dm.clip.width) ew = dm.clip.width; if (st == "visible" || st == "show") { ds.visibility = "hidden"; } else {tv = toppos + 20; lv = leftpos - (ew/4); if (lv < 2) lv = 2; else if (lv + ew > wp) lv -= ew/2; if (!an) {lv += 'px';tv += 'px';} ds.left = lv; ds.top = tv; ds.visibility = "visible";}}
        // if (DH) {var wp = pw(); ds = fd(oi,1); dm = fd(oi,0); st = ds.visibility; if (dm.offsetWidth) ew = dm.offsetWidth; else if (dm.clip.width) ew = dm.clip.width; if (st == "visible" || st == "show") { ds.visibility = "hidden"; } else {tv = mouseY(evt) + 20; lv = mouseX(evt) - (ew/4); if (lv < 2) lv = 2; else if (lv + ew > wp) lv -= ew/2; if (!an) {lv += 'px';tv += 'px';} ds.left = lv; ds.top = tv; ds.visibility = "visible";}}
}
/////////////////////////////////////////////////////////////


function copy_clip(myText){
// based on example at http://www.webdeveloper.com/forum/showpost.php?p=344728&postcount=10
	if (window.clipboardData)
           window.clipboardData.setData("Text", myText);
	else if (window.netscape){
		netscape.security.PrivilegeManager.enablePrivilege  ('UniversalXPConnect');

		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard  );
		if (!clip) return false;

		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if (!trans) return false;

		trans.addDataFlavor('text/unicode');

		var str = new Object();
		var len = new Object();

		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		var copytext=myText;
		str.data=copytext;
		trans.setTransferData("text/unicode",str,copytext.length*2);
		var clipid=Components.interfaces.nsIClipboard;

		if (!clip) return false;
		clip.setData(trans,null,clipid.kGlobalClipboard);

	}

	return false;
}



function PasteIE()
{
     var range = txtControl.createTextRange();
     range.execCommand("Paste");
}
function CopyIE()
{
     var range = txtControl.createTextRange();
     range.execCommand("Copy");
}
function ClearIE()
{
     var range = txtControl.createTextRange();
     range.execCommand("Delete");
}

function AreaSizeIE(dir)
{
    //var typed = txtControl.value;

    var mDiv1=document.getElementById('ads');
    var curSize=txtControl.rows;
    //var curSizeCol=txtControl.cols;

    if (dir=="more")
    {
      mDiv1.style.display='none';
      if (curSize >= 25) txtControl.rows = curSize + 5; else txtControl.rows = curSize + 15;
      //txtControl.cols = curSizeCol + 5;
    }
    else
    {
         if (curSize > 10) {mDiv1.style.display='none'; txtControl.rows = curSize - 5;}
         //if (curSizeCol > 20) txtControl.cols = curSizeCol - 5;
    }
    txtControl.focus();
    //alert(txtControl.rows + ":" + txtControl.cols);
}

// Privacy filters on proxies http://www.jibbering.com/faq/faq_notes/cookies.html


function Get_Cookie(name)
{

    if(typeof document.cookie == "string")
    {
        var start = document.cookie.indexOf(name+"=");
        var len = start+name.length+1;
        if ((!start)&& (name != document.cookie.substring(0,name.length)))
            return null;

        if (start == -1) return null;
        var end = document.cookie.indexOf(";",len);
        if (end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(len,end));

    }
    else
    {
        /* document.cookie is not a string so return an
           empty string. When tested this will type-convert to
           boolean false (accurately) giving the impression that
           client-side cookies are not available on this system:-
        */
      return "";
    }
}

function Set_Cookie(name,value,expires,path,domain,secure)
{
    if(typeof document.cookie == "string")
    {
       var tmp_new = name + "=" +escape(value) +
            ( (expires) ? ";expires=" + expires.toGMTString() : "") +
            ( (path) ? ";path=" + path : "") +
            ( (domain) ? ";domain=" + domain : "") +
            ( (secure) ? ";secure" : "");

      document.cookie = tmp_new;
    }//else document.cookie is not a string so do not write to it.
}

function Delete_Cookie(name,path,domain)
{
    if (Get_Cookie(name))
       document.cookie = name + "=" +
       ( (path) ? ";path=" + path : "") +
       ( (domain) ? ";domain=" + domain : "") +
       ";expires=Thu, 01-Jan-70 00:00:01 GMT";

}

// IntelligentCookie http://irt.org/articles/js064/index.htm

var expires_date = new Date;     // Create a Date object, with today's information
var oneyear = 31536000000;       // number of milliseconds in one year
expires_date.setTime(expires_date.getTime() + oneyear);


function storeMasterCookie()
{
    if (!Get_Cookie('vkb_MasterCookie'))
        Set_Cookie('vkb_MasterCookie','MasterCookie');
}

function storeIntelligentCookie(name,value)
{
    if (Get_Cookie('vkb_MasterCookie'))
    {
        var IntelligentCookie = Get_Cookie(name);
        if ((!IntelligentCookie) || (IntelligentCookie != value))
        {
            Set_Cookie(name,value,expires_date);
            var IntelligentCookie = Get_Cookie(name);
            if ((!IntelligentCookie) || (IntelligentCookie != value))
                Delete_Cookie('vkb_MasterCookie');
        }
    }
}

JScookieWasLoaded = true;

/* Paul Gorodyansky, author of the site
   "Cyrillic (Russian): instructions for Windows and Internet":
   http://WinRus.com/
*/
