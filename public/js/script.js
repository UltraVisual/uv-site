var ULTRAVISUAL = ULTRAVISUAL || {};

ULTRAVISUAL.twitterFeed = function(e) {
    if (e != undefined) {
        e.preventDefault();
    }
    var $container = $('#tweets');
    $container.fadeOut(1000);
    $.getJSON("http://ultravisual.co.uk/tweets/index.php",
                function(data) {
                    var html = "<br />";
                    $.each(data, function(key, val) {
                        html += "<p class='tweet'><strong>Tweeted about ";
                        var then = new Date(val.created_at);
                        var now = new Date();
                        var diff = (now - then) / 3600000;
                        var diffText = " hours ago";
                        if (diff < 1) {
                            diff *= 60;
                            diffText = " minutes ago";
                        }
                        else if (diff > 23) {
                            diff /= 24;
                            if(Math.floor(diff) == 0 || Math.floor(diff) == 1){
                                diff = 1;
                                diffText = " day ago";
                            }
                            else
                            {
                                diffText = " days ago";
                            }
                        }
                        var withlinks = val.text.replace(/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a target="_blank" href="$1">$1</a>');
                        var withpeeps = withlinks.replace(/@([A-Z_0-9]*)/gi, '<a target="_blank" href="http://twitter.com/$1">@$1</a>');
                        var withsearches = withpeeps.replace(/#([A-Z_0-9]*)/gi, '<a target="_blank" href="http://twitter.com/#!/search/$1">#$1</a>');

                        html += (Math.floor(diff) + diffText + "</strong><br />");
                        html += (withsearches);
                        html += "</p>";
                    });
                    html += "<br /><span style='float: right; cursor: pointer' id='refreshBtn' onclick='ULTRAVISUAL.twitterFeed()'>Refresh</span>";
                    $container.empty();
                    $container.hide();
                    $container.append(html);
                    $container.fadeIn(1000);
                })
};
