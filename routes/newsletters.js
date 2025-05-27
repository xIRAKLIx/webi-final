const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const nodemailer = require('nodemailer');

// GET route
router.get('/', async function (req, res) {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.render('newsletters', {
            title: 'Newsletter',
            email: req.session.user.email,
            blogs: blogs
        });
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).send('Internal Server Error');
    }
});

// POST route
router.post('/', async function (req, res) {
    const email = req.body.email;

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '', //
            pass: ''
        }
    });

    const mailOptions = {
        from: '',
        to: email,
        subject: 'Subscription Confirmed!',
        text: `Thank you for subscribing to our newsletter!`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send(' Subscription successful. Confirmation email sent.');
    } catch (error) {
        console.error(' Failed to send email:', error);
        res.status(500).send('Failed to send confirmation email.');
    }
});

module.exports = router;