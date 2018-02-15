const request = require('request');
const { log } = console;

const oauth = {
  consumer_key: 'DWxdms9FGQGXDcukonCAJA',
  consumer_secret: 'LmyMM1VxNPim4N3SN8D6h3FBozbunz0LAr8QU0lAg',
  token: '17864642-xlVvJNMZ6Lp1j2PG5IDSjBkWWxjzUjRcQjimJAdpB',
  token_secret: 'vHlSbyJKr7XGwIjyCUUQ0153TjyUzrwzkmQXyVTCI'
};
 
const qs = { screen_name: 'ultravisual', count: '2' };
const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json'

const getTweets = (res) => {
    request({ url, oauth, qs, json: true }, function (error, response, body) {
        if (error) res.error('Error getting tweets');
        
        res.send(body);
    });
}

module.exports = getTweets;
