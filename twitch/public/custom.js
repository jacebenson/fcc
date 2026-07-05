var global = window;
global.client_id = 'client_id=4bgewis13ldtkwl3i5od999y6ubimay';
global.streamers = [
  'gweedorama',
  'wcaasia',
  //'brunofin',
  'nowcommunity',
  'dotastarladder_en',
  'riotgames',
  'noobs2ninjas',
  'robotcaleb',
  'judgeshiny',
  'idraven12',
  'freecodecamp'
];
global.channels = [];
global.streams = [];
global.getChannels = function () {
    var streamers = global.streamers.sort();
    for (var x = 0; x < streamers.length; x++) {
        var html = '';
        html += '<div class="result" id="' + streamers[x] + '"></div>';
        $("#results").append(html);
        var streamer = streamers[x].toString();
        $.ajax({
            url: 'https://api.twitch.tv/kraken/channels/' + streamer + '?' + global.client_id,
            dataType: 'jsonp',
            success: function (channel) {
                var html = '';
                var image = '';
                //console.log(channel);
                if (channel.status === 404) {
                    channel.name = channel.message.split("'")[1];
                    jQuery('#' + channel.name).addClass('inactive');
                    image = '<div class="image">';
                    image += '<i class="fa fa-user-times fa-5x" aria-hidden="true"></i>';
                    image += '</div>';
                    jQuery('#' + channel.name).append(image);
                    jQuery('#' + channel.name).append('<div class="title">' + channel.name + '</div>');
                    jQuery('#' + channel.name).append('<div class="status">' + channel.message + '</div>');
                } else {
                    jQuery('#' + channel.name).addClass('offline');
                    jQuery('#' + channel.name).text(channel.message);
                    html += '<div class="result offline" id="' + channel.display_name + '">';
                    image = '<div class="image"><a href="' + channel.url + '">';
                    if (channel.logo) {
                        image += '<img src="' + channel.logo + '" />';
                    } else {
                        image += '<i class="fa fa-video-camera fa-5x" aria-hidden="true"></i>';
                    }
                    image += '</a></div>';
                    jQuery('#' + channel.name).append(image);
                    jQuery('#' + channel.name).append('<div class="title">' + channel.name + '</div>');
                    jQuery('#' + channel.name).append('<div class="status">' + channel.status + '</div>');
                    jQuery('#' + channel.name).append('<div class="channel">' + JSON.stringify(channel, null, '  ') + '</div>');
                }
            }
        });
        $.ajax({
            url: 'https://api.twitch.tv/kraken/streams/' + streamer + '?' + global.client_id,
            dataType: 'jsonp',
            success: function (stream) {
                if (stream.stream) {
                    $("#" + stream.stream.channel.name).addClass('online');
                    $("#" + stream.stream.channel.name).removeClass('offline');
                    $("#" + stream.stream.channel.name).css('background-image', 'url(' + stream.stream.preview.medium + ')');
                }
            }
        });
    }
};
$(function () {
    global.getChannels();
});