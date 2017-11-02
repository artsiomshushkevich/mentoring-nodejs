import queryStringParser from 'querystring';
import url from 'url';

export default (req, res, next) => {   
    req.parsedQuery = req.query;
    delete req.query;
    
    next();
};