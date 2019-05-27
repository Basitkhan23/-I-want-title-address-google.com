const async = require('async');
const cheerio = require('cheerio');
const superAgent = require('superagent');

exports.listTitle = (req,res) => {
    titlesList=[];

    let urls = req.query.address.toString().split(',');
    
    async.each(urls,(url, callback) => {
        
        request(url, (err,title) => {

            if(err){
                titlesList.unshift({"url": url, "title": 'No Response'})
            }
            else if(title){
                titlesList.unshift({"url": url, "title": title});
               // console.log(titlesList);
            }
            callback();
        });
        //console.log(element);
    },function(err){
        //Success
        if(!err) {
            //Returning HTML Response
            res.render('index',{titlesList:titlesList}); 
        }
    });
    
};

const request = (url, callback) => {

    let title = '';

    //making request with superagent
    superAgent.get(url).end((err, res) => {

        if(!err && res.status===200){
            //extracting title using cheerio
            let $ = cheerio.load(res.text);
            title = $("title").text();
            callback(null,title);
        }

        else if(err){
            callback('Does not exist', null);
        }
    })

};