class TwitterFeed {
    constructor(el) {
        this.el = el;
    }

    _getDiffText(diff) {
        var diffText = " hours ago";
        
        if (diff < 1) {
            diff *= 60;
            diffText = " minutes ago";
        } else if (diff > 23) {
            diff /= 24;
            if(Math.floor(diff) == 0 || Math.floor(diff) == 1){
                diff = 1;
                diffText = " day ago";
            }
            else {
                diffText = " days ago";
            }
        }

        return Math.floor(diff) + diffText + "</strong><br />";
    }

    _formatTweets(data) {
        var html = "<br />";

        data.forEach((tweet) => {
            html += "<p class='tweet'><strong>Tweeted about ";
            var then = new Date(tweet.created_at);
            var now = new Date();
            var diff = (now - then) / 3600000;
            var withlinks = tweet.text.replace(/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a target="_blank" href="$1">$1</a>');
            var withpeeps = withlinks.replace(/@([A-Z_0-9]*)/gi, '<a target="_blank" href="http://twitter.com/$1">@$1</a>');
            var withsearches = withpeeps.replace(/#([A-Z_0-9]*)/gi, '<a target="_blank" href="http://twitter.com/#!/search/$1">#$1</a>');
            
            html += this._getDiffText(diff);
            html += withsearches;
            html += "</p>";
        });
        html += "<br /><span style='float: right; cursor: pointer' id='refreshBtn' onclick='getTwitterFeed()'>Refresh</span>";

        this._render(html);
    }

    _render(html) {
        this.el.innerHTML = html;
        this._fadeIn();
    }

    _fadeIn() {
        this.el.classList.remove('fade-out');
        this.el.classList.add('fade-in');
    }

    _fadeOut() {
        this.el.classList.remove('fade-in');
        this.el.classList.add('fade-out');
    }

    getFeed() {
        this._fadeOut();

        pegasus('/tweets')
            .then((data) => {
                this._formatTweets(data);
            });
    }
}

var tweets = new TwitterFeed(document.querySelector('#tweets'));

tweets.getFeed();

getTwitterFeed = () => { tweets.getFeed(); };
