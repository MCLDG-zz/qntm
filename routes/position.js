var express = require('express');
var router = express.Router();

/*
 * GET position list.
 */
router.get('/', function(req, res) {
    res.render('position', {
        title: 'Position'
    });
    console.log('In position.js processing / ');

});

/*
 * GET aggregated position list.
 */
router.get('/positionlist', function(req, res) {
    var db = req.db;

    console.log('In position.js processing /positionlist - about to aggregate');


    db.collection('deals').aggregate([{
        $group: {
            _id: '$Symbol',
            count: {
                $sum: 1
            },
            "Total_Price": {
                $sum: {$multiply:["$OpenPrice", "$Volume"]}
            }
        }
    }], function(err, result) {
        
            res.json(result);
        
    });
});

/*
 * GET all deals for a specific symbol
 */
router.get('/dealsforsymbol', function(req, res) {
    var db = req.db;
    var qury = req.query;
    
    db.collection('deals').find(qury).toArray(function(err, items) {
        res.json(items);
    });
});


module.exports = router;