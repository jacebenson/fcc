$(document).ready(function () {
  var global = window;
  global.debug = true;
  global.log = function (msg) {
    if (global.debug) {
      console.log(msg);
    }
  };
  global.lcdValue = 0;
  global.setLCD = function(val){
    $('#lcd').val(val);
  };
  global.getLCD = function(){
    return $('#lcd').val();
  };
  global.runningTotal = 0;
  global.equal = function () {
    //Multiplication and Division, and Addition and Subtraction
    global.runningTotal = eval(global.getLCD());
      if(global.runningTotal.toString().length>9){
          var beforeDigit = global.runningTotal.toString().split('.')[0];
          var afterDigit = global.runningTotal.toString().split('.')[1];
          var decimals = 9 - beforeDigit;
          console.log(decimals);
          global.runningTotal = parseFloat(global.runningTotal).toFixed(decimals);
      }
    global.setLCD(global.runningTotal);
  };
  global.clear = function(){
    global.setLCD('');
  };
  $('#lcd').focus();//focus on lcd onload
  $(document).on('click', function () {//focus on lcd on click
    $('#lcd').focus();
  });
  $('#0').on('click',function(){
    global.setLCD(global.getLCD() + '0');
  });
  $('#9').on('click',function(){
    global.setLCD(global.getLCD() + '9');
  });
  $('#8').on('click',function(){
    global.setLCD(global.getLCD() + '8');
  });
  $('#7').on('click',function(){
    global.setLCD(global.getLCD() + '7');
  });
  $('#6').on('click',function(){
    global.setLCD(global.getLCD() + '6');
  });
  $('#5').on('click',function(){
    global.setLCD(global.getLCD() + '5');
  });
  $('#4').on('click',function(){
    global.setLCD(global.getLCD() + '4');
  });
  $('#3').on('click',function(){
    global.setLCD(global.getLCD() + '3');
  });
  $('#2').on('click',function(){
    global.setLCD(global.getLCD() + '2');
  });
  $('#1').on('click',function(){
    global.setLCD(global.getLCD() + '1');
  });
  $('#plus').on('click',function(){
    global.setLCD(global.getLCD() + '+');
  });
  $('#minus').on('click',function(){
    global.setLCD(global.getLCD() + '-');
  });
  $('#times').on('click',function(){
    global.setLCD(global.getLCD() + '*');
  });
  $('#divide').on('click',function(){
    global.setLCD(global.getLCD() + '/');
  });
  $('#equal').on('click',function(){
    global.equal();
  });
  $('#dec').on('click',function(){
    global.setLCD(global.getLCD() + '.');    
  });  
  $('#clear').on('click',function(){
    global.clear();  
  });
  $('#lcd').keypress(function (event) {//on keypress if # or *,+,-,\,/,= append number or run fx

    var key = event.which || event.keyCode; //use event.which if it's truthy, and default to keyCode otherwise
    //console.log(key);
    // Allow: backspace, delete, tab, and enter
    var controlKeys = [
      8,
      9,
      13,//enter
      61, //=
      //42, //*
      //43, //+
      //45, //-
      //47, ///
      //92, //\
      99 //c
    ];
    // Ctrl+ anything or one of the conttrolKeys is valid
    if (key === 61 || key === 13) {
      global.equal();
    }
    if (key === 99) {
      global.clear();
    }
    
  });

  $('#lcd').keyup(function () {//on keyup if #, append it, else dont allow it
    var regex = new RegExp(/[^0-9\.\-\+\*\\\/]/g);
    var containsNonNumeric = this.value.match(regex);
    if (containsNonNumeric)
      this.value = this.value.replace(regex, '');
  });
});