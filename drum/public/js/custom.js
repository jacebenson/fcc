$(document).ready(function () {
    var sounds = {
        Q: {
            name: "HEATER-1",
            clip: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
        },
        W: {
            name: "HEATER-2",
            clip: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
        },
        E: {
            name: "HEATER-3",
            clip: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
        },
        A: {
            name: "HEATER-4",
            clip: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
        },
        S: {
            name: "CLAP",
            clip: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
        },
        D: {
            name: "OPEN-HH",
            clip: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
        },
        Z: {
            name: "KICK-N-KAT",
            clip: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
        },
        X: {
            name: "KICK",
            clip: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
        },
        C: {
            name: "CLOSED-HH",
            clip: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
        }
    }
    for (var beat in sounds) {
        //create audio and source elements
        //$("#" + beat + "-button").append("<audio id=\""+beat+" \"class=\"hidden\" src=\""+sounds[beat]+"\" />")
        console.log('setting up ' + sounds[beat].name)
        $("#" + sounds[beat].name).click(function () {
            //setting up button presses with mouse
            var letter = $(this).attr("key");
            playSound(letter);
        });
    }

    $("body").bind("keyup", function (e) {
        //setting up key presses with keyboard
        var value = String.fromCharCode(e.keyCode);
        playSound(value);
    });
    function playSound(letter) {
        if (sounds[letter]) {
            console.log("playing " + letter);
            $("#display").text(sounds[letter].name);
            var audio = new Audio(sounds[letter].clip);
            audio.play();
        } else {
            console.log('No sound for ' + letter);
        }
    }
});