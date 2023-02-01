const router = require('express').Router();
const { Pet, User } = require('../models');
const withAuth = require('../utils/auth');
module.exports = router;

router.get('/', withAuth, async (req, res) => {
    try {
        const petData = await Pet.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const pets = petData.map((pet) => pet.get({ plain: true}));
   res.render('homepage', {
    pets,
    logged_in: req.session.logged_in
   });
   
   
   
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/homepage');
      return;
    }
  
    res.render('signup');
  });
  
  