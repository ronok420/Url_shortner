const  express = require('express');
const router = express.Router();
const Url = require('../models/url');

const { handleCreateShortUrl,
     handleGetShortUrl,
    handleGetAnalytics
 } = require('../controllers/url');

// Create a new short URL
router.post('/', handleCreateShortUrl);
// router.get('/test', async (req, res) => {
//    try{
//          const urls = await Url.find({});
//          res.status(200).render('home',{
//             urls
//          })
       

//    }
//    catch (error) {
//        console.error(error);
//        res.status(500).json({ error: 'Failed to retrieve URLs' });
//    }  
// })

router.get('/:shortId', handleGetShortUrl);
router.get('/:shortId/analytics', handleGetAnalytics);


module.exports = router;