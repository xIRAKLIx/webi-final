const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    res.render('newsletters', {
        title: 'Newsletter',
        email: req.session.user.email
    });
});

router.post('/', function (req, res) {
    const email = req.body.email;
    console.log('Subscribed email:', email);

    res.send('Thanks for subscribing!');
});

module.exports = router;