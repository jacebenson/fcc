/*global $, console*/
var global = window;
global.turnState = {
    pressCount: 0
};
global.gameState = {
    turnCount: 0,
    turn: 'computer',
    on: false,
    winConditions: []
};
global.gameSettings = {
    strictMode: false,
    colors: [{
        code: '#4CAF50',
        name: 'green'
    }, {
        name: 'red',
        code: '#F44336'
    }, {
        name: 'yellow',
        code: '#FFEB3B'
    }, {
        name: 'blue',
        code: '#2196F3'
    }],
    colorOn: 'green',
    colorOff: 'red',
    timeToHold: 1000
};
global.logs = [];
var fx = {
    log: function(msg) {
        var d = new Date();
        var str = fx.paddedLen(d.getHours()) + ':' + fx.paddedLen(d.getMinutes()) + ':' + fx.paddedLen(d.getSeconds());
        console.log(str + ' ' + msg);
        global.logs.push(str + ' ' + msg);
    },
    randomColor: function() {
        'use strict';
        var min = 0;
        var max = 3;
        min = Math.ceil(min);
        max = Math.floor(max);
        var number = Math.floor(Math.random() * (max - min)) + min;
        return global.gameSettings.colors[number].name;
    },
    setWinConditions: function() {
        global.gameState.winConditions = [];
        for (var x = 0; x < 20; x++) {
            global.gameState.winConditions.push(fx.randomColor());
        }
    },
    paddedLen: function(n) {
        if (n.toString().length < 2) {
            return '0' + n;
        } else {
            return n;
        }
    },
    press: function(element) {
        //global.turnState.pressCount++;
        $(element).addClass('pressed');
        var audio = new Audio($(element).attr('data-sound'));
        audio.play();
        setTimeout(function() {
            $(element).removeClass('pressed');
            if (global.turnState.pressCount === global.gameState.turnCount) {
                fx.endTurn();
            } else {
                global.turnState.pressCount++;
            }
        }, global.gameSettings.timeToHold);
    },
    on: function() {
        fx.log('turning on');
        fx.setWinConditions();
        fx.computerTurn();
    },
    off: function() {
        fx.log('turning off');
    },
    loaded: function() {
        $('.upper-left').css('background-color', global.gameSettings.colors[0].code);
        $('.upper-right').css('background-color', global.gameSettings.colors[1].code);
        $('.lower-left').css('background-color', global.gameSettings.colors[2].code);
        $('.lower-right').css('background-color', global.gameSettings.colors[3].code);
        $('.strictmode').css('background-color', global.gameSettings.colorOff);
        $('.start').css('background-color', global.gameSettings.colorOff);
    },
    pressButton: function(player, button) {

        fx.log(player + ': ' + button);
        fx.press($('#' + button));
    },
    computerTurn: function() {
        fx.log('starting computer turn');
        for (var x = 0; x <= global.gameState.turnCount; x++) {
            setTimeout(function() {
                fx.pressButton('computer', global.gameState.winConditions[x]);
            }, global.gameSettings.timeToHold);
        }
        global.gameState.turnCount++;
        $('.value').html(global.gameState.turnCount);
    },
    endTurn: function() {
        fx.log('ending turn for ' + global.gameState.turn);
        global.gameState.turn = global.gameState.turn === 'computer' ? 'player' : 'computer';
        global.turnState = {};
        setTimeout(function() {
            if (global.gameState.turn === 'computer') {
                fx.computerTurn();
            }
        }, global.gameSettings.timeToHold);
    }
};

$(function() {
    'use strict';
    fx.loaded();
    $('.strictmode').click(function() {
        global.gameSettings.strictMode = global.gameSettings.strictMode ? false : true;
        if (global.gameSettings.strictMode) {
            $(this).css('background-color', global.gameSettings.colorOn);
        } else {
            $(this).css('background-color', global.gameSettings.colorOff);
        }
    });
    $('.start').click(function() {
        global.gameState.on = global.gameState.on ? false : true;
        if (global.gameState.on) {
            $(this).css('background-color', global.gameSettings.colorOn);
            fx.on();
        } else {
            $(this).css('background-color', global.gameSettings.colorOff);
            fx.off();
        }
    });
    $('.button').click(function() {
        if (global.gameState.turn === 'player') {
            fx.pressButton('player', this.id);
        }
    });
});
