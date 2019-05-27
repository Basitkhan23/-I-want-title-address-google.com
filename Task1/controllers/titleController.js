const cheerio = require('cheerio');
const superAgent = require('superagent');

exports.listTitle = (req,res) => {
    titlesList=[];

    let urls = req.query.address.toString().split(',');
    requestCount=0;
    urls.forEach(element => {
        
        request(element, (err,title) => {

            requestCount++;

            if(err){
                titlesList.unshift({"url": element, "title": 'No Response'})
            }
            else if(title){
                titlesList.unshift({"url": element, "title": title});
               // console.log(titlesList);
            }
            if(requestCount === urls.length){
                res.render('index',{titlesList:titlesList});          
            }
        })
        
    });
};

const request = (url, callback) => {

    let title = '';

    //making request with superagent
    superAgent.get(url).end((err, res) => {

        if(!err && res.status===200){
            //extracting title using cheerio
            console.log(res.text);
            let $ = cheerio.load(res.text);
            title = $("title").text();// can use 'p', 'metacontent' and many others
            console.log(title);
            callback(null,title);
        }

        else if(err){
            callback('Does not exist', null);
        }
    })

};