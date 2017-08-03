$(".foot").hide();
var tbody = $("#twitch-body");
var thead = $("#twitch-head");

var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var myurl = "https://wind-bow.gomix.me/twitch-api/users/";
var newurl = "";
let i;
for (i = 0; i < 8; i++) {
    newurl = myurl + users[i];
    $.ajax({
        url: newurl,
        dataType: "jsonp",
        success: function(data) {
            var content = $("<li class='offs'></li>");
            if(data == null) {
                content.append("404 not found");
                return;
            }
            if (data.logo == null)
                content.append("<img src='https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png' alt='User logo' class='col-xs-4'>");
            else
                content.append("<img src='" + data.logo + "' alt='User logo' class='col-xs-4'>");
            content.append("<span class='col-xs-8 user-details'> <a href='https://www.twitch.tv/" + data.name + "' target='_blank'>" + data.display_name + " </a> <br> <span id='" + data.name + "' class='text-right'></span> </span>");
            content.addClass("twitch-user twitch-border-all row");
            content.addClass(data.display_name);
            tbody.append(content);
        }
        
    });
    $(".foot").show();
}

var myurl = "https://wind-bow.gomix.me/twitch-api/streams/";
newurl = "";
for (i = 0; i < 8; i++) {
    newurl = myurl + users[i];
    $.ajax({
        url: newurl,
        dataType: "jsonp",
        success: function(data) {
            var stream = data.stream;
            if (stream != null) {
                var name = stream.channel.name;
                var id = $("#" + name);
                id.append(stream.channel.game);
                id.addClass("stream");
                var par = id.parent();
                par.removeClass("user-details");
                var par_html = par.html();
                par.html("<span class='online-circle'>&#9679;</span>" + par_html);
                var grand = par.parent();
                grand.removeClass("offs");
                grand.addClass("ons");
            }
        }
    });
}

//console.log(tbody);
var all = $("#all");
var on = $("#on");
var off = $("#off");

on.click(function() {
    all.removeClass("btn-danger");
    all.addClass("bg-danger");
    off.removeClass("btn-warning");
    off.addClass("bg-warning");
    on.removeClass("bg-success");
    on.addClass("btn-success");

    tbody.removeClass("bg-danger bg-warning");
    tbody.addClass("bg-success");

    $("a").css("color", "green");

    $(".twitch-user").removeClass("twitch-border-all");
    $(".twitch-user").removeClass("twitch-border-off");
    $(".twitch-user").addClass("twitch-border-on");
    
    $(".offs").hide();
    $(".ons").show();
});

all.click(function() {
    all.removeClass("bg-danger");
    all.addClass("btn-danger");
    off.removeClass("btn-warning");
    off.addClass("bg-warning");
    on.removeClass("btn-success");
    on.addClass("bg-success");

    tbody.removeClass("bg-success bg-warning");
    tbody.addClass("bg-danger");

    $("a").css("color", "brown");

    $(".twitch-user").removeClass("twitch-border-on");
    $(".twitch-user").removeClass("twitch-border-off");
    $(".twitch-user").addClass("twitch-border-all");
    
    $(".offs").show();
    $(".ons").show();    
});

off.click(function() {
    all.removeClass("btn-danger");
    all.addClass("bg-danger");
    off.removeClass("bg-warning");
    off.addClass("btn-warning");
    on.removeClass("btn-success");
    on.addClass("bg-success");

    tbody.removeClass("bg-danger bg-success");
    tbody.addClass("bg-warning");

    $("a").css("color", "darkgoldenrod");

    $(".twitch-user").removeClass("twitch-border-all");
    $(".twitch-user").removeClass("twitch-border-on");
    $(".twitch-user").addClass("twitch-border-off");
    
    $(".offs").show();
    $(".ons").hide();
});

var inp = $("input");
inp.keypress(function (key) {    
    var names = ["ESL_SC2", "OgamingSC2", "storbeck", "cretetion", "FreeCodeCamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
    var text = inp.val().toLowerCase();
    for(i = 0; i < 8; i++) {
        var temp = $("." + names[i]);
        if((temp[0].innerText.toLowerCase()).search(text) === -1) {
            //console.log(text);
            temp.hide();
        }
    }
});

inp.keyup(function(key) {
    if(key.keyCode == 8 || key.keyCode == 46) {
        $("input").val("");
        all.click();
    }
});
