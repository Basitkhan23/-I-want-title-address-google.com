const axios = require('axios');
const cheerio = require('cheerio');
const rx = require('rx');

exports.listTitle = (req,res) => {
    titlesList=[];

    let urls = req.query.address.toString().split(',');
    
    //Concatenating 'http' with each url if it doesn't exist
    let urlsArr = urls.map(url => {
        if(!url.startsWith('http')){
            url = `http://${url}`;
        }
        return url;
    });

    let myObservable = rx.Observable.from(urlsArr).concatMap(request);

    myObservable.subscribe(
        x => {
            titlesList.push(x);
        },
        err => {
            //err will be handled in request function below
        },
        () => {
            res.render('index', {titlesList:titlesList})
        }
    )

};

const request = (url) => {

    
    return axios.get(url).then(res => {
        let $ = cheerio.load(res.text);
        title = $("title").text();
        return {url:url.replace('http://',''),title:title};
    }).catch(err => {
        if(err){
            return {url:url.replace('http://',''),title:'No Response'};
        }
    })

};