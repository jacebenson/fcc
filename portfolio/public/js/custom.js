$(document).ready(function () {

    $("#about-link").click(function () {
        $('html, body').animate({
            scrollTop: ($("#about-me").offset().top) - 200
        }, 'slow');
        $("#contact-link").parent().removeClass("active");
        $("#about-link").parent().addClass("active");
        $("#projects-link").parent().removeClass("active");
    });
    $("#contact-link").click(function () {
        $('html, body').animate({
            scrollTop: $("#contact-me").offset().top
        }, 'slow');
        $("#contact-link").parent().addClass("active");
        $("#about-link").parent().removeClass("active");
        $("#projects-link").parent().removeClass("active");
    });
    $("#projects-link").click(function () {
        $('html, body').animate({
            scrollTop: ($("#projects").offset().top) - 85
        }, 'slow');
        $("#contact-link").parent().removeClass("active");
        $("#about-link").parent().removeClass("active");
        $("#projects-link").parent().addClass("active");
    });
});