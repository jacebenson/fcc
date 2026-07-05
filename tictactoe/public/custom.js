/*global $, console*/
var global = window;
global.o = '';
global.x = '';
global.set = '';
global.turn = 'x';
global.type = '';
global.turnCount = 0;
global.gameOver = false;
global.logs = [];
var fx = {
    log: function (msg) {
        //console.log(msg);
        global.logs.push(msg);
    },
    winConditions: [
            ['#1-1', '#1-2', '#1-3'], //top    across
            ['#2-1', '#2-2', '#2-3'], //middle across
            ['#3-1', '#3-2', '#3-3'], //bottom across
            ['#1-1', '#2-1', '#3-1'], //left   up
            ['#1-2', '#2-2', '#3-2'], //middle up
            ['#1-3', '#2-3', '#3-3'], //right  up
            ['#1-1', '#2-2', '#3-3'], //top left  diag
            ['#3-1', '#2-2', '#1-3'], //top right diag
        ],
    random: function (min, max) {
        'use strict';
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    determinePieces: function () {
        'use strict';
        var o = [
                'rebel',
                'apple',
                'circle-o',
                'dot-circle-o',
                'user-circle'
            ],
            x = [
                'empire',
                'windows',
                'times',
                'times-circle',
                'user-times'
            ];
        global.set = this.random(0, o.length);
        global.o = '<i class="fa fa-' + o[global.set] + '" aria-hidden="true"></i>';
        global.x = '<i class="fa fa-' + x[global.set] + '" aria-hidden="true"></i>';
        $('.o-class').html(global.o);
        $('.x-class').html(global.x);
    },
    setType: function (type) {
        'use strict';
        global.type = type;
        $('#dialog-type').toggleClass('hide');
        if (global.type === 'ai') {
            $('#dialog-player').toggleClass('hide');
        } else {
            $('#game').toggleClass('hide');
        }
    },
    assignPlayer: function (piece) {
        'use strict';
        if (piece === 'x') {
            global.computer = 'o';
        } else {
            global.computer = 'x';
            fx.computerTurn();
        }
        global.player = piece;
        $('#dialog-player').toggleClass('hide');
        $('#game').toggleClass('hide');
    },
    endTurn: function () {
        global.turnCount++;
        if (global.turnCount === 9) {
            fx.log('Cats eye!');
            return fx.endGame();
        } else {
            this.won(global.turn);
            if (global.gameOver === false) {
                if (global.turn === 'x') {
                    global.turn = 'o';
                    if (global.type === 'ai') {
                        if (global.computer === 'o') {
                            this.computerTurn();
                        }
                    }
                } else {
                    global.turn = 'x';
                    if (global.type === 'ai') {
                        if (global.computer === 'x') {
                            this.computerTurn();
                        }
                    }
                }
            }
        }
    },
    setRandomTile: function () {
        var col = fx.random(1, 3);
        var row = fx.random(1, 3);
        var availableCells = [];
        if (fx.getTile('#1-1') === ' ') {
            availableCells.push('#1-1');
        }
        if (fx.getTile('#1-2') === ' ') {
            availableCells.push('#1-2');
        }
        if (fx.getTile('#1-3') === ' ') {
            availableCells.push('#1-');
        }
        if (fx.getTile('#2-1') === ' ') {
            availableCells.push('#2-1');
        }
        if (fx.getTile('#2-2') === ' ') {
            availableCells.push('#2-2');
        }
        if (fx.getTile('#2-3') === ' ') {
            availableCells.push('#2-3');
        }
        if (fx.getTile('#3-1') === ' ') {
            availableCells.push('#3-1');
        }
        if (fx.getTile('#3-2') === ' ') {
            availableCells.push('#3-2');
        }
        if (fx.getTile('#3-3') === ' ') {
            availableCells.push('#3-3');
        }
        var location = availableCells[fx.random(0, availableCells.length - 1)];
        if ($(location).attr('data-piece') === ' ') {
            //fx.log('  Rando place: ' + location);
            fx.setTile(location);
            fx.endTurn();
        } else {
            fx.setRandomTile();
        }
    },
    won: function (player) {
        var conditions = this.winConditions;
        for (var c = 0; c < conditions.length; c++) {
            var condition = conditions[c];
            var tile1 = this.getTile(condition[0]);
            var tile2 = this.getTile(condition[1]);
            var tile3 = this.getTile(condition[2]);
            //fx.log([tile1, tile2, tile3]);
            if (tile1 === player && tile2 === player && tile3 === player) {
                fx.log('player ' + player + ' won. ' + condition);
                this.endGame();
            }
        }
    },
    getTile: function (location) {
        return $(location).attr('data-piece');
    },
    getBoardState: function () {
        fx.log('|' + fx.getTile('#1-1') + '|' + fx.getTile('#1-2') + '|' + fx.getTile('#1-3') + '|');
        fx.log('|' + fx.getTile('#2-1') + '|' + fx.getTile('#2-2') + '|' + fx.getTile('#2-3') + '|');
        fx.log('|' + fx.getTile('#3-1') + '|' + fx.getTile('#3-2') + '|' + fx.getTile('#3-3') + '|');
    },
    endGame: function () {
        global.gameOver = true;
        if (global.turnCount === 9) {
            $('#result').html(global.x + ' Tied ' + global.o);
        } else {
            if (global.computer == global.turn) {
                $('#result').html('<i class="fa fa-android" aria-hidden="true"></i> Won.');
            } else {
                $('#result').html(global[global.turn] + ' Won.');
            }
        }
        //$('#game').toggleClass('hide');
        $('#game-end').toggleClass('hide');

    },
    computerTurn: function () {
        setTimeout(function () {
            var tileToSet = '';
            var player = global.player;
            var computer = global.computer;
            var conditions = fx.winConditions;
            for (var r = 0; r < conditions.length; r++) {
                var condition = conditions[r];
                var tile1 = fx.getTile(condition[0]);
                var tile2 = fx.getTile(condition[1]);
                var tile3 = fx.getTile(condition[2]);

                //if ai can win, win
                if (tile1 === computer && tile2 === computer && tile3 === ' ') {
                    tileToSet = condition[2];
                    fx.log('computer winning case 1');
                    break;
                } else if (tile1 === computer && tile2 === ' ' && tile3 === computer) {
                    tileToSet = condition[1];
                    fx.log('computer winning case 2');
                    break;
                } else if (tile1 === ' ' && tile2 === computer && tile3 === computer) {
                    tileToSet = condition[0];
                    fx.log('computer winning case 3');
                    break;
                }
                //if ai cannot win, check if player can win and if so, block
                if (tile1 === player && tile2 === player && tile3 !== computer) {
                    tileToSet = condition[2];
                    fx.log('computer blocking case 1');
                    break;
                } else if (tile1 === player && tile2 !== computer && tile3 === player) {
                    tileToSet = condition[1];
                    fx.log('computer blocking case 2');
                    break;
                } else if (tile1 !== computer && tile2 === player && tile3 === player) {
                    tileToSet = condition[0];
                    fx.log('computer blocking case 3');
                    break;
                }

            }
            /*if ai and player cannot win, check for possible forks
            * c = check this spot
            * x = opponents pieces
            * e = empty
            * o = computer pieces
              o1       02       03       04
            * |c|x|e|  |e|x|c|  | | |e|  |e| | |
            * |x| | |  | | |x|  | | |x|  |x| | |
            * |e| | |  | | |e|  |e|x|c|  |c|x|e|
              05       06       07       08
            * | |x| |  | |x| |  | |e| |  | |e| |
            * |x|c|e|  |e|c|x|  |e|c|x|  |x|c|e|
            * | |e| |  | |e| |  | |x| |  | |x| |
              
              These will result in a win still
              9        10       11       12
            * |c| |o|  |e| |o|  |x| |c|  |x| |e|
            * | |x| |  | |x| |  | |x| |  | |x| |
            * |x| |e|  |x| |c|  |e| |o|  |c| |o|
              13       14       15       16
            * |c| |x|  |e| |x|  |o| |c|  |o| |e|
            * | |x| |  | |x| |  | |x| |  | |x| |
            * |o| |e|  |o| |c|  |e| |x|  |c| |x|
            
            //not valid as computer attempts to fill in 2-2 first
              17       18       19       20
            * |x| |e|  |x| |x|  |e| |x|  |e| |e|
            * | |c| |  | |c| |  | |c| |  | |c| |
            * |x| |e|  |e| |e|  |e| |x|  |x| |x|
            */
            //case 1
            if (fx.getTile('#1-1') === ' ' && fx.getTile('#1-2') === player && fx.getTile('#1-3') === ' ') {
                if (fx.getTile('#2-1') === player && fx.getTile('#3-1') === ' ') {
                    tileToSet = '#1-1';
                    fx.log('computer stopping fork case 1');
                    fx.setTile(tileToSet);
                    return fx.endTurn(global.computer);
                }
            }
            //case 2
            if (fx.getTile('#1-1') === ' ' && fx.getTile('#1-2') === player && fx.getTile('#1-3') === ' ') {
                if (fx.getTile('#2-3') === player && fx.getTile('#3-3') === ' ') {
                    tileToSet = '#1-3';
                    fx.log('computer stopping fork case 2');
                    fx.setTile(tileToSet);
                    return fx.endTurn(global.computer);
                }
            }
            //case 3
            if (fx.getTile('#1-3') === ' ' && fx.getTile('#2-3') === player && fx.getTile('#3-3') === ' ') {
                if (fx.getTile('#3-1') === ' ' && fx.getTile('#3-2') === player) {
                    tileToSet = '#3-3';
                    fx.log('computer stopping fork case 3');
                    fx.setTile(tileToSet);
                    return fx.endTurn(global.computer);
                }
            }
            //case 4
            if (fx.getTile('#1-1') === ' ' && fx.getTile('#2-1') === player && fx.getTile('#3-1') === ' ') {
                if (fx.getTile('#3-2') === player && fx.getTile('#3-3') === ' ') {
                    tileToSet = '#3-1';
                    fx.log('computer stopping fork case 4');
                    fx.setTile(tileToSet);
                    return fx.endTurn(global.computer);
                }
            }

            //case 5 
            if (fx.getTile('#2-1') === player && fx.getTile('#1-2') === player && fx.getTile('#2-2') === ' ') {
                if (fx.getTile('#3-2') === ' ' && fx.getTile('#2-3') === ' ') {
                    tileToSet = '#2-2';
                    fx.log('computer stopping fork case 5');
                    fx.setTile(tileToSet);
                    return fx.endTurn(global.computer);
                }
            }
            //case 6 
            if (fx.getTile('#2-1') === player && fx.getTile('#2-3') === player && fx.getTile('#2-2') === ' ') {
                if (fx.getTile('#2-1') === ' ' && fx.getTile('#3-2') === ' ') {
                    tileToSet = '#2-2';
                    fx.log('computer stopping fork case 6');
                    fx.setTile(tileToSet);
                    return fx.endTurn(global.computer);
                }
            }
            //case 7 
            if (fx.getTile('#3-2') === player && fx.getTile('#2-3') === player && fx.getTile('#2-2') === ' ') {
                if (fx.getTile('#2-1') === ' ' && fx.getTile('#1-2') === ' ') {
                    tileToSet = '#2-2';
                    fx.log('computer stopping fork case 7');
                    fx.setTile(tileToSet);
                    return fx.endTurn(global.computer);
                }
            }
            //case 8 
            if (fx.getTile('#2-1') === player && fx.getTile('#3-2') === player && fx.getTile('#2-2') === ' ') {
                if (fx.getTile('#1-2') === ' ' && fx.getTile('#2-3') === ' ') {
                    tileToSet = '#2-2';
                    fx.log('computer stopping fork case 8');
                    fx.setTile(tileToSet);
                    return fx.endTurn(global.computer);
                }
            }
            if (tileToSet === '') {
                //no forks? try to place in the following order;
                /*
                 * |9|8|6|
                 * |5|1|4|
                 * |2|3|7|
                 */
                if (fx.getTile('#2-2') === ' ') {
                    tileToSet = '#2-2';
                    fx.log('  Preference 1');
                    fx.setTile(tileToSet);
                    return fx.endTurn(global.computer);
                }
                //otherwise get random
                return fx.setRandomTile();
            }
            fx.setTile(tileToSet);
            return fx.endTurn(global.computer);
        }, 1000); // How long do you want the delay to be (in milliseconds)? 
    },
    setTile: function (location) {
        if ($(location).attr('data-piece') === ' ') {
            $(location).removeClass('open-cell');
            if (global.type === 'hotseat') {
                fx.log('Turn: ' + global.turnCount + ' player[' + global.turn + '] set: ' + location);
                $(location).attr('data-piece', global.turn);
                $(location).html(global[global.turn]);
            } else if (global.player == global.turn) {
                fx.log('Turn: ' + global.turnCount + ' player[' + global.turn + '] set: ' + location);
                $(location).attr('data-piece', global.turn);
                $(location).html(global[global.turn]);
            } else {
                fx.log('Turn: ' + global.turnCount + ' computer[' + global.turn + '] set: ' + location);
                $(location).attr('data-piece', global.computer);
                $(location).html(global[global.computer]);
            }
            fx.getBoardState();
        } else {
            fx.log('crap');
        }
    },
    resetGame: function () {
        $("[data-piece='o']").attr('data-piece', ' ');
        $("[data-piece='x']").attr('data-piece', ' ');
        $("[data-piece=' ']").html('&nbsp;');
        $('#game-end').addClass('hide');
        $('#game').addClass('hide');
        $('#dialog-player').addClass('hide');
        $('#dialog-type').removeClass('hide');
        global.o = '';
        global.x = '';
        global.set = '';
        global.turn = 'x';
        global.type = '';
        global.turnCount = 0;
        global.gameOver = false;
        fx.determinePieces();
    }
};

$(function () {
    'use strict';
    fx.determinePieces();
    $('.type .choice').click(function () {
        var type = $(this).attr('type');
        var vs = '';
        if (type == 'ai') {
            vs = '<i class="fa fa-android" aria-hidden="true"></i>';
        } else {
            vs = 'Hotseat';
        }
        fx.setType(type);
        $('#type').html(vs);
    });
    $('.player .choice').click(function () {
        fx.assignPlayer($(this).attr('data-player'));
    });
    $('#reset').click(function () {
        fx.resetGame();
    });
    $('.open-cell').click(function () {
        if ($(this).attr('data-piece') === ' ') {
            //fx.log('Turn[' + global.turnCount + ']' + ' player[' + global.turn + '] setting: #' + $(this).attr('id'));
            if (global.type === 'hotseat') {
                fx.setTile('#' + $(this).attr('id'));
                fx.endTurn();
            } else { //vs ai
                if (global.turn === global.player) {
                    fx.setTile('#' + $(this).attr('id'));
                    fx.endTurn();
                }
            }
        }
    });
});