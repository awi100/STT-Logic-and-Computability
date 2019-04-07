/*
 * Short Truth Table Generator
 * WIP v -2.0 pre-alpha
 * Code by Chris Chappell
 *
 * Github project is at https://github.com/chappc/STT
 * 
 * Unlikely that you will see a lot of updates but hey
 * It's something
 *
 * Also if you want to completely change it, fork or whatever.
 * I don't care
 */

var ERR = -1;
var err_loc = 0;
var err_st = "";
next_id = 0;

// function sets the global error codes
function seterr ( st, loc ) {
  err_loc = loc;
  err_st = st;
  return ERR;
}

// function creates an error banner and inserts it
function printerr () {
  err_st = "<h3>Invalid input near</h3><p class=\"error\">"+"&nbsp;".repeat(err_loc)+"v"+err_st+"<br /></p>";
  $("#err-msg").html(err_st);
  $("#err-msg").css("background-color","red");
}

// function resets error
function clearerr () {
  $("#err-msg").html("");
  $("#err-msg").css("background-color","none");
}

// map of logic symbols to their html codes
var symbols = {
  tautology: "&#8868;",
  contradiction: "&perp;",
  negation: "&not;",
  conjunction: "&and;",
  disjunction: "&or;",
  conditional: "&rarr;",
  biconditional: "&harr;"
};

// map of all valid input characters for logic symbols
var inputs = {
  tautology: ["_","\u22a4"],
  contradiction: ["^", "\u22a5"],
  negation: ["~", "\u00ac"],
  conjunction: ["&", "\u2227"],
  disjunction: ["|", "\u2228"],
  conditional: ["$", "\u2192"],
  biconditional: ["%", "\u2194"]
};



// takes an input token c and outputs the relevant operation
// character to c.
function getOP ( c ) {
  for ( key in symbols ) {
    if ( inputs.hasOwnProperty(key) && inputs[key].indexOf(c) != -1 ) {
      return symbols[key];
    }
  }
  return "";
}

function isBinary ( c ) {
  return c == symbols.conjunction || c == symbols.disjunction || 
         c == symbols.conditional || c == symbols.biconditional;
}


$(document).ready( function() {
  var context = {
    stindex: 0,
    cindex: 0,
    rindex: 0,
    tfindex: 0,
    bramList: [],
    clist: [],
    tflist: []
  };
  // we want to allow people to put in their own inputs
  for ( key in symbols ) {
    if ( symbols.hasOwnProperty(key) ) {
      $("#symbols").append(
        "<li>"+symbols[key] + ": <input id=\""+key+"\" maxlength=\"1\" type=\"text\" name=\"" + key + "\" value=\"" + inputs[key][0] + "\" /></li>"
      );
      $("#"+key).focusout( function() {
        //console.log(this.id);
        inputs[this.id][0] = $(this).val();
      } );
    }
  }

  function setInference ( b ) {
    b.inf = [];
    b.gui = "<div class=\"dropdown\"><div class=\"accordion"+b.selector+"\">";
    // check to see if parent inference possible
    if ( b.parent != null ) {
      //console.log(b.parent);
      var pop = b.parent.op;
      if ( pop == symbols.negation ) {
        b.gui += "<h3><b>"+pop+"</b>("+b.st+")</h3>";
        b.gui += "<table><tr><th>"+pop+"</th>";
        b.gui += "<th><b>"+b.st+"</b></th></tr>\n";
        
        b.gui += "<tr><td class=\"c"+b.parent.selector+"\"></td>";
        b.gui += "<td><input maxlength=\"1\" type=\"text\" /></td></tr>";
      }
      else if ( pop == symbols.conjunction || pop == symbols.disjunction ) {
        b.gui += "<h3><b>"+pop+"</b>("+b.st+")</h3>\n";
        
        b.gui += "<table><tr>";
        //console.log(b.parent);
        for ( var i = 0; i < b.parent.child.length; ++i ) {
          var child = b.parent.child[i];
          //console.log(child);
          if ( i > 0 ) {
            b.gui += "<th>"+pop+"</th>";
          }
          if ( child === b ) {
            b.gui += "<th><b>"+b.st+"</b></th>";
          }
          else {
            b.gui += "<th>"+child.st+"</th>";
          }
        }
        /*for ( i = 1; i < b.parent.child.length; ++i ) {
          b.gui += "<th>"+pop+"</th><th>("+b.parent.child[i].st+")</th>";          
        }*/
        b.gui += "</tr>\n<tr>";
        for ( var i = 0; i < b.parent.child.length; ++i ) {
          var child = b.parent.child[i];
          if ( i > 0 ) {
            b.gui += "<td class=\"c"+b.parent.selector+"\"></td>";
          }
          if ( child === b ) {
            b.gui += "<td><input maxlength=\"1\" type=\"text\" /></td>";
          }
          else {
            b.gui += "<td class=\"c"+child.selector+"\"></td>";
          }
        }
        b.gui += "</tr>";
      }
      else if ( pop == symbols.conditional || pop == symbols.biconditional ) {
        if ( b == b.parent.child[0] ) {
          b.gui += "<h3>("+b.st+")<b>"+pop+"</b>(*)</th></h3>\n";
          b.gui += "<table><tr><th>"+b.st+"</th>";
          b.gui += "<th>"+pop+"</th>";
          b.gui += "<th><b>"+b.parent.child[1].st+"</b></th></tr>\n";
          
          b.gui += "<tr><td><input maxlength=\"1\" type=\"text\" /></td>";
          b.gui += "<td class=\"c"+b.parent.selector+"\"></td>";
          b.gui += "<td class=\"c"+b.parent.child[1].selector+"\"></td></tr>";
        }
        else if ( b == b.parent.child[1] ) {
          b.gui += "<h3>(*)<b>"+pop+"</b>("+b.st+")</h3>\n";
          b.gui += "<table><tr><th>"+b.parent.child[0].st+"</th>";
          b.gui += "<th>"+pop+"</th>";
          b.gui += "<th><b>"+b.st+"</b></th></tr>\n";
          
          b.gui += "<tr><td class=\"c"+b.parent.child[0].selector+"\"></td>";
          b.gui += "<td class=\"c"+b.parent.selector+"\"></td>";
          b.gui += "<td><input maxlength=\"1\" type=\"text\" /></td></tr>";
        }
      }
      else {
        console.log("Invalid Parent. This shouldn't happen. Ever.");
      }
      b.gui += "</table>\n";
    }
    // op's relation with children if any
    if ( b.op == symbols.negation ) {
      b.gui += "<h3><b>"+b.st+"</b></h3>";
      b.gui += "<table><tr><th>"+b.st+"</th>";
      b.gui += "<th><b>"+b.child[0].st+"</b></th></tr>\n";
      
      b.gui += "<tr><td><input maxlength=\"1\" type=\"text\" /></td>";
      b.gui += "<td class=\"c"+b.child[0].selector+"\"></td></tr>";
    }
    else if ( b.op == symbols.conjunction || b.op == symbols.disjunction ) {
      //b.gui += "<tr><th>"+b.parent.child[0].st+"</th>";
      b.gui += "<h3><b>"+b.st+"</b></h3>\n";
      b.gui += "<table>";
      for ( var i = 0; i < b.child.length; ++i ) {
        child = b.child[i];
        if ( i > 0 ) {
          b.gui += "<th><b>"+b.st+"</b></th>";
        }
        b.gui += "<th>"+child.st+"</th>";
      }
      /*for ( i = 1; i < b.parent.child.length; ++i ) {
        b.gui += "<th>"+pop+"</th><th>("+b.parent.child[i].st+")</th>";          
      }*/
      b.gui += "</tr>\n<tr>";
      for ( var i = 0; i < b.child.length; ++i ) {
        child = b.child[i];
        if ( i == 1 ) {
          b.gui += "<td><input maxlength=\"1\" type=\"text\" /></td>";
        }
        if ( i > 1 ) {
          b.gui += "<td></td>";
        }
        b.gui += "<td class=\"c"+child.selector+"\"></td>";
      }
      b.gui += "</tr>";
    }
    else if ( b.op == symbols.conditional || b.op == symbols.biconditional ) {
      b.gui += "<h3><b>"+b.st+"</b></h3>\n";
      b.gui += "<table><tr><th>"+b.child[0].st+"</th>";
      b.gui += "<th><b>"+b.st+"</b></th>";
      b.gui += "<th>"+b.child[1].st+"</th></tr>\n";
      
      b.gui += "<tr><td class=\"c"+b.child[0].selector+"\"></td>";
      b.gui += "<td><input maxlength=\"1\" type=\"text\" /></td>";
      b.gui += "<td class=\"c"+b.child[1].selector+"\"></td></tr>";
    }
    else if ( b.op == "" ) {
      // literal
      b.gui += "<h3><b>"+b.st+"</b></h3>\n";
      b.gui += "<table><tr><td>Enter step #: <input class=\"literal\" type=\"text\" /></td>";
    }
    b.gui += "</table>\n";
    b.gui += "</div>\n";
    b.gui += "<input id=\"subcont"+b.selector+"\" type=\"button\" value=\"Contradiction!\" /></span>";
    b.gui += "<input id=\"subv"+b.selector+"\" type=\"button\" value=\"Done\" /></span>";
    //console.log(b.gui);
  }
  
  // makes a Bram object recursively
  function makeBram ( st, parent ) {
    
    //console.log(st + " " + parent);
    err_st = st;
    var depth = 0;
    var flag = true;
    if( st == "" ) {
      return seterr( "empty text field", 0 );
    }
    for ( var i = 0; i < st.length; ++i ) {
      // parse parentheses, detect depth for producing tree structures
      if ( st[i] == "(" ) {
        ++depth;
      }
      if ( depth == 0 ) {
        flag = false;
      }
      if ( st[i] == ")" ) {
        --depth;
      }
      if ( depth < 0 ) {
        return seterr( st, i-1 );
      }
    }
    // unbalanced parentheses, exit
    if ( depth != 0 ) {
      return seterr( st, i );
    }
    //console.log( st + " " + flag );
    // balanced parentheses and parens are the first and last parts of the string
    // call recursively on the string without the parens
    if ( flag ) {
      return makeBram( st.substring( 1, st.length-1 ), parent );
    }

    var bram = {};
    var op = "";
    var split = [];
    for ( var i = 0; i < st.length; ++i ) {

      var c = st[i]
      if ( c == "(" ) {
        ++depth;
      }
      else if ( c == ")" ) {
        --depth;
      }
      else if ( depth == 0 ) {
        var curr_tok = getOP(c);
        if ( curr_tok.length > 0 ) {
          // biconditional
          if ( curr_tok == symbols.biconditional ) {
            if ( isBinary(op) ) {
              // even though biconditionals are technically associative
              // we want to treat them only as binary operators
              return seterr( st, i );
            }
            else {
              split = [];
              split.push(i);
              op = curr_tok;
            }
          }
          else if ( curr_tok == symbols.conditional ) {
            if ( isBinary(op) ) {
              // conditional is NOT associative, must always have parentheses
              return seterr( st, i );
            }
            else {
              split = [];
              split.push(i);
              op = curr_tok;
            }
          }
          else if ( curr_tok == symbols.disjunction ) {
            if ( op == symbols.disjunction ) {
              split.push(i);
            }
            else if ( isBinary(op) ) {
              return seterr( st, i );
            }
            else {
              split = [];
              split.push(i);
              op = curr_tok;
            }
          }
          else if ( curr_tok == symbols.conjunction ) {
            // We allow the user to use n-ary conjunction expressions
            if ( op == symbols.conjunction ) {
              split.push(i);
            }
            else if ( isBinary(op) ) {
              return seterr( st, i );
            }
            else {
              split = [];
              split.push(i);
              op = curr_tok;
            }
          }
          else if ( curr_tok == symbols.negation ) {
            // We are parsing from the outside inward,
            // only parse the negation if it's the first operation we've encountered
            if ( op.length == 0 ) {
              split.push(i);
              op = curr_tok;
            }
          }
        }
      }
    }
    bram.op = op;
    if ( split.length > 0 ) {
      bram.child = [];
      if ( op == symbols.negation ) {
        if ( split[0] != 0 ) {
          // if the negation of a statement is the only thing we parse
          // the negation sign must be at the beginning of the statment
          return seterr( st, split[0] );
        }
        else {
          bram.child.push( makeBram( st.substring( 1, st.length ), bram ) );
        }
      }
      else if ( op == symbols.conjunction ) {
        if ( split[0] == 0 ) {
          // conjunction is infix
          return seterr( st, split[0] );
        }
        else if ( split[split.length-1] == st.length-1 ) {
          return seterr( st, split[split.length-1] );
        }
        else {
          // split up into n-ary branches
          bram.child.push( makeBram( st.substring( 0, split[0] ), bram ) );
          for ( var i = 0; i < split.length-1; ++i ) {
            bram.child.push( makeBram( st.substring( split[i]+1, split[i+1] ), bram ) );
          }
          bram.child.push( makeBram( st.substring( split[split.length-1]+1, st.length ), bram ) );
        }
      }
      else if ( op == symbols.disjunction ) {
        if ( split[0] <= 0 ) {
          // disjunction is also infix
          return seterr( st, split[0] );
        }
        else if ( split[split.length-1] >= st.length-1 ) {
          return seterr( st, split[split.length-1] );
        }
        else {
          // n-ary branches
          bram.child.push( makeBram( st.substring( 0, split[0] ), bram ) );
          for ( var i = 0; i < split.length-1; ++i ) {
            bram.child.push( makeBram( st.substring( split[i]+1, split[i+1] ), bram ) );
          }
          bram.child.push( makeBram( st.substring( split[split.length-1]+1, st.length ), bram ) );
        }
      }
      else if ( op == symbols.conditional ) {
        if ( split[0] <= 0 ) {
          // infix conditional
          return seterr( st, split[0] );
        }
        else if ( split[split.length-1] >= st.length-1 ) {
          return seterr( st, split[split.length-1] );
        }
        else {
          // conditional is only a binary operator
          bram.child.push( makeBram( st.substring( 0, split[0] ), bram ) );
          bram.child.push( makeBram( st.substring( split[0]+1, st.length ), bram ) );
        }
      }
      else if ( op == symbols.biconditional ) {
        if ( split[0] <= 0 ) {
          // infix
          return seterr( st, split[0] );
        }
        else if ( split[split.length-1] >= st.length-1 ) {
          return seterr( st, split[split.length-1] );
        }
        else {
          // we only do binary biconditionals.  Shoot me.
          bram.child.push( makeBram( st.substring( 0, split[0] ), bram ) );
          bram.child.push( makeBram( st.substring( split[0]+1, st.length ), bram ) );
        }
      }
      else {
        // the heck happened here?
        return seterr( st, 0 );
      }
      for ( var i = 0; i < bram.child.length; ++i ) {
        // checking for error returns from any of the child brams
        if ( bram.child[i] == ERR ) {
          return ERR;
        }
      }
      bram.st = bram.op;
    }
    else {
      // atomic statement
      bram.st = st;
    }
    // bidirectional linkage within our tree structure.
    bram.parent = parent;
    return bram;
  }
  
  // this is for generating the html table of the truth tree.
  function addColumns ( bram ) {
    var st = {h:"", c:"", inc: function (n) {
      this.h += n.h;
      this.c += n.c;
    }};
    if ( isBinary(bram.op) ) {
      //console.log(bram);
      if ( bram.parent != null ) {
        st.inc( makeColumn( "(" ) );
      }
      for ( var i = 0; i < bram.child.length-1; ++i ) {
        //console.log(st);
        st.inc(addColumns( bram.child[i] ));
        //console.log(st)
        st.inc(makeColumn( bram ));
      }
      st.inc(addColumns( bram.child[bram.child.length-1] ));
      if ( bram.parent != null ) {
        st.inc(makeColumn( ")" ));
      }
      //console.log(st);
      return st;
    }
    else if ( bram.op == symbols.negation ) {
      st.inc(makeColumn( bram ));
      st.inc(addColumns( bram.child[0] ));
      return st;
    }
    else {
      return makeColumn( bram );
    }
  }
  
  function makeColumn ( b ) {
    var st = {h:"",c:""};
    //console.log(b);
    if ( b.hasOwnProperty("op") ) {
      st.h += "style=\"width:1.2em;\">" + b.st;
      st.c += "<span style=\"width:1em\"></span><sub></sub>";
      if ( !b.hasOwnProperty("selector") ) {
        context.clist.push(b);
        b.selector = context.cindex;
        context.cindex++;
      }
    }
    else if ( b == "" ) {
      st.h += "style=\"width:2em;\">";
    }
    else {
      st.h += ">" + b;
    }
    st.h = "<th class=\"h" + b.selector + "\"" + st.h + "</th>\n";
    st.c = "<td class=\"c" + b.selector + "\">" + st.c + "</td>\n";
    return st;
  }


  function shade( b, color ) {
    if ( b.op == "" ) {
      for ( c in context.clist ) {
        if ( c.st == b.st ) {
          $(".h"+c.selector).css("background-color: "+color+";");
          $(".c"+c.selector).css("background-color: "+color+";");          
        }
      }
    }
    else {
      $(".h"+b.selector).css("background-color: "+color+";");
      $(".c"+b.selector).css("background-color: "+color+";");
    }
  }
  
  /*==================================SETV============================*/
  function setv( b, val, op, reason ) {
    if ( val < 0 && b.hasOwnProperty("index") ) {
      b.val = val;
      var in_str = "<span style=\"width:1em\">X</span><sub>"+context.tflist.length+"</sub>";
      in_str += "<div class=\"reason\">"+op+" "+reason.join()+"</div>";
      $(".c"+b.selector).append(in_str);
    }
    else {
      b.val = val;
      if ( !b.hasOwnProperty("index") ) {
        b.index = context.tflist.length;
        context.tflist.push(b);
      }
      var in_str = "<span style=\"width:1em\">"+(val? "T":"F")+"</span><sub>"+b.index+"</sub>";
      in_str += "<div class=\"reason\">"+op+" "+reason.join()+"</div>";
      $(".c"+b.selector).html(in_str);
    }    
  }

  $("#adds").click( function () {
    
    var html = "<li><input class=\"s\" type=\"text\" name=\"statement";
    html += (++context.stindex).toString();
    html += "\"></li>";
    
    $("ul.ins").append( html );
    
  } );
  
  $("#dels").click( function () {
    
    if ( context.stindex > 0 ) {
      --context.stindex;
      $("ul.ins li:last").remove();
    }
    
  } );
  
  // What happens when you press submit
  $("#subs").click( function () {
    context.bramList.length = 0;
    var flag = true;
    clearerr();
    $("input.s").each(function( i ) {
      var instring = $(this).val().replace(/ /g,'');
      var nbram = makeBram( instring, null );
      if ( nbram == ERR ) {
        //console.log("Error: "+err_st);
        printerr();
        flag = false;
      }
      else {
        context.bramList.push(nbram);
        //console.log(nbram);
      }
    } );
    // all rows check out
    if ( flag ) {

      context.cindex = 0;
      context.clist.length = 0;
      context.tflist.length = 0;

      st = addColumns(context.bramList[0])
      for ( var i = 1; i < context.bramList.length; ++i ) {
        st.inc( makeColumn("") );
        st.inc( addColumns(context.bramList[i]) );
      }
      
      //console.log(st);
      $(".tt").html("<tr class=\"stlist\">"+st.h+"</tr>\n<tr class=\"v0\">"+st.c+"</tr>\n");
      // set dropdowns
      var dropdown = "<tr class=\"drops\">";
      var stchildren = $(".stlist").children();
      for ( var i = 0; i < stchildren.length; ++i ) {
        var index = parseInt($(stchildren[i]).attr('class').substring(1));
        if ( !isNaN(index) && !context.clist[index].hasOwnProperty("gui") ) {
          dropdown += "<td class=\"d"+index+"\">";
          var b = context.clist[index];
          setInference(b);
          dropdown += b.gui;
        }
        else {
          dropdown += "<td>";
        }
        dropdown += "</td>\n";
      }
      dropdown += "</tr>";
      $(".tt").append(dropdown);

      // setup for callback on each item in the row
      for ( var i = 0; i < context.cindex; ++i ) {
        var next = context.clist[i];
        if ( next.hasOwnProperty("selector") ) {
          // add JQuery UI accordion to all accordions
          $(".accordion"+next.selector).accordion({
            header: "h3"
          });
          
          /*if ( next.op == "" ) {
            $(".h"+next.selector).focus( next, function(e) {
              for ( var k = 0; k < context.bramList.length; ++k ) {
                shadeAtomic( context.bramList[k], e.data.st, "#efefef" );
              }
            } );
          }*/
          // dropdown when you click on an item
          $(".h"+next.selector).click( next, function(e) {
            // set callback for editing
            var index = parseInt($(this).attr('class').substring(1));
            var sub = $("c"+index).find("sub");
            
            $(".dropdown").hide();
            $(".d"+index+" .dropdown").toggle();
            
            $("#subv"+index).click(function(){
              var input = $(".d"+index+" .ui-accordion-content-active input");
              var val = input.val();
              $(".d"+index+" .dropdown").hide();
              //console.log(val);
              if ( input.hasClass("literal") ) {
                if ( !isNaN(val) && val > 0 && val < context.tflist.length &&
                     context.tflist[val].st == context.clist[index].st ) {
                  //console.log(val);
                  setv( context.clist[index], context.tflist[val].val, context.clist[index].st, [val] );
                }
              }
              else if ( val.toUpperCase() == "T" || val.toUpperCase() == "F" ) {
                //console.log(val);
                // TODO: add checking for validity
                var vals = [];
                $(".d"+index+" .ui-accordion-content-active td[class]").each(function(){
                  var bval = context.clist[$(this).attr("class").substring(1)];
                  if ( bval && bval.hasOwnProperty("index") && $.inArray(bval.index, vals) < 0 ) {
                    vals.push(bval.index);
                  }
                });
                var op = $(".d"+index+" .ui-accordion-header-active b").html();
                setv( context.clist[index], val.toUpperCase() == "T", op, vals );
              }
            });
            
            $("#subcont"+index).click(function(){
              var input = $(".d"+index+" .ui-accordion-content-active input");
              var val = input.val();
              $(".d"+index+" .dropdown").hide();
              if ( input.hasClass("literal") ) {
                if ( !isNaN(val) && val > 0 && val < context.tflist.length &&
                     context.tflist[val].st == context.clist[index].st ) {
                  //console.log(val);
                  if ( context.clist[index].hasOwnProperty("val") && 
                       context.tflist[val].val == !(context.clist[index].val) ) {
                    //console.log(val);
                    setv( context.clist[index], -1, context.clist[index].st, [val] );                    
                  }
                }
              }
              else if ( val.toUpperCase() == "T" || val.toUpperCase() == "F" ) {
                //console.log(val);
                // TODO: add checking for validity
                var vals = [];
                $(".d"+index+" .ui-accordion-content-active td[class]").each(function(){
                  var bval = context.clist[$(this).attr("class").substring(1)];
                  if ( bval && bval.hasOwnProperty("index") && $.inArray(bval.index, vals) < 0 ) {
                    vals.push(bval.index);
                  }
                });
                var op = $(".d"+index+" .ui-accordion-header-active b").html();
                if ( context.clist[index].hasOwnProperty("val") && context.clist[index].val == (val.toUpperCase() == "F") ) {
                  setv( context.clist[index], -1, op, vals );
                }
              }
            });
            /*
            var index = parseInt($(this).attr('class').substring(1));
            var sub = $(this).find("sub");
            var val = $("input",this).val()
            if ( val == "T" || val == "F" ) {
              //console.log($("sub", this));
              if ( sub.html() == "" ) {
                context.tflist.push(e.data);
                $(".c"+index+" sub").html(context.tflist.length);
              }
              // set the same for all versions
              $(".c"+index+" input").val(val);
            }
            else {
              var loc = sub.html();
              //console.log(loc);
              if ( loc != "" ) {
                sub.html("");
                //console.log(loc);
                for ( var k = loc; k < context.tflist.length; ++k ) {
                  //console.log(context.tflist);
                  sel = context.tflist[k];
                  //console.log(sel);
                  //console.log($(".c"+sel.selector[l]+" sub"));
                  $(".c"+sel.selector+" input").val("");
                  $(".c"+sel.selector+" sub").html("");
                  sel.val = "";
                }
                context.tflist.length = loc;
              }
            }
            */
          } );
        }
      }
    }
    
    for ( var i = 0; i < context.bramList.length; ++i ) {
      setv( context.bramList[i], i != context.bramList.length-1, "", [] );
    }

    $("#subs").val("Resubmit");
  } );
  
  $("#getc").click( function() {

    console.log($("#get-code").html());
    if ( $("#get-code").html() == "" ) {
      seen = [];

      strstff = JSON.stringify( context, function(key, val) {
        if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) {
            return seen.indexOf(val);
          }
          seen.push(val);
          val.cid = seen.indexOf(val);
        }
        return val;
      });

      $("#get-code").html("<code>"+strstff+"</code>");
      $("#getc").val("Hide Table Data");
    }
    else {
      $("#get-code").html("");
      $("#getc").val("Get Table Data");
    }
    $("#get-code").toggle();

  } );

  $("#setc").click( function() {

    console.log($("#set-code").html());
    if ( $("#set-code").html() == "" ) {
      $("#set-code").html("<input type=\"textarea\"/><br/>")
      $("#set-code").after("<input id=\"loadc\" value=\"Load data\"/>")

      $("#loadc").click( function () {
        // actually need do this

      } );

    }
    $("show-code").toggle();

  } );
  
  
  console.log("page loaded");
  
} );