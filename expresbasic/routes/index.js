var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

var Model_users = require('../model/model_users');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
router.get('/register', function (req, res, next) {
    res.render('auth/register');
});
router.get('/login', function (req, res, next) {
    res.render('auth/login');
});

router.post('/saveusers', async (req, res) => {
    let {email,passwd} = req.body;
    let enkripsi = await bcrypt.hash(passwd, 10);
    let Data = {
        email,
        passwd: enkripsi
    };
    await Model_users.Store(Data);
    req.flash('success', 'Berhasil Login');
    res.redirect('/login');
});

router.post('/log', async (req, res) => {
    let {
        email,
        passwd
    } = req.body;
    try {
        let Data = await Model_users.Login(email);
        if (Data.length > 0) {
            let enkripsi = Data[0].passwd;
            let cek = await bcrypt.compare(passwd, enkripsi);
            if (cek) {
                req.session.userId = Data[0].id_user;
                req.flash('success', 'Berhasil Login');
                res.redirect('/users');
            } else {
                req.flash('error', 'Email atau password salah');
                res.redirect('/login');
            }
        } else {
            req.flash('error', 'Account Not Found');
            res.redirect('/login');
        }
    } catch (err) {
        res.redirect('/login');
        req.flash('error', 'Error pada fungsi');
    }
});

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/login');
        }
    });
});

module.exports = router;