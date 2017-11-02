function parseCookies(req) {
    var parsedCookies = {},
        reqCookies = req.headers.cookie;

    reqCookies && reqCookies.split(';').forEach(function(cookie) {
        var parts = cookie.split('=');
        parsedCookies[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return parsedCookies;
}

export default (req, res, next) => {
    req.parsedCookies = parseCookies(req);
    console.dir(req.parsedCookies)
    next();
};