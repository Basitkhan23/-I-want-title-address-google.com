const RSVP = require('rsvp');
const cheerio = require('cheerio');
const superAgent = require('superagent');

exports.listTitle = (req,res) => {
    

    let urls = req.query.address.toString().split(',');
    
    let promises = urls.map(url =>{
        return request(url);
    });

    RSVP.all(promises).then(function(titlesList) {
        //responses contains an array of results for the given promises
        res.render('index',{titlesList:titlesList});//Returning HTML Response
    }).catch(err => {
        console.log(err);
    });

};

const request = (url) => {

    let result = {};
    let promise =new RSVP.Promise((resolve,reject)=>{

        //making request with superagent
        superAgent.get(url).end((err, res) => {

            if(!err && res.status===200){
                //extracting title using cheerio
                let $ = cheerio.load(res.text);
                title = $("title").text();
                result = {"url":url, "title":title};
                resolve(result);
            }

            else if(err){
                result = {"url":url, "title":'No Response'};
                resolve(result);
            }

            else{
                reject('Some error exist');
            }

        });

    });

    return promise;

};