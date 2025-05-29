const  express = require('express');
const router = express.Router();
const { hadnleUserSignup,
    handleUserLogin,
    
} = require('../controllers/user');

router.post('/', hadnleUserSignup);
router.post('/login', handleUserLogin);

module.exports = router;