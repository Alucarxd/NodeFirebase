const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');

var serviceAccount =require("../../node-firebase-24d5f-firebase-adminsdk-tatza-833e6d2cc2.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://node-firebase-24d5f.firebaseio.com/'
});



const db = admin.database();

router.get('/', (req, res) => {
    db.ref('contacts').once('value', (snapshot) => {
        const data = snapshot.val()
        res.render('index', { newContact: data});
    });
    res.render('index');
});

router.post('/new-contact', (req, res) => {
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phont: req.body.phone
    };
    db.ref('contacts').push(newContact);
    res.redirect('/')
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
})

module.exports = router;