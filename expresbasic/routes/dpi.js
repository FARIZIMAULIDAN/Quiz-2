var express = require('express');
var router = express.Router();
const Model_dpi = require('../model/model_dpi.js');

router.get('/',async function(req,res,next){
    let rows = await Model_dpi.getAll();
    res.render('dpi/index',{
        data:rows
    });
})

router.get('/create', function(req, res, next){
    res.render('dpi/create',{
        nama_dpi: '',
        luas: ''
    });
});

router.post('/store',async function(req,res,next){
    try{
        let {nama_dpi,luas} = req.body;
        let Data ={
            nama_dpi,
            luas
        }
        await Model_dpi.Store(Data);
        req.flash('succes','Berhasil menyimpan data yeay');
        res.redirect('/dpi')
    }catch{
        req.flash('error','gagal menyimpan data');
        res.redirect('/dpi')
    }
})

router.get('/edit/(:id)',async function(req,res,next){
    let id = req.params.id;
    let rows = await Model_dpi.getId(id);
    res.render('dpi/edit',{
        id :                    rows[0].id_dpi,
        nama_dpi:          rows[0].nama_dpi,
        luas:          rows[0].luas,
    })
})


router.post('/update/(:id)',async function(req,res,next){
    try{
        let id = req.params.id;
        let {nama_dpi,luas} = req.body;
        let Data = {
            nama_dpi,
            luas
        }
        await Model_dpi.Update(id,Data);
        req.flash('success','Berhasil update data');
        res.redirect('/dpi')
    }catch{
        req.flash('error','gagal menyimapan data');
        res.redirect('/dpi')
    }
})


router.get('/delete/(:id)',async function(req,res,next){
    let id = req.params.id;
    await Model_dpi.Delete(id);
    req.flash('success','Berhasil menghapus data');
    res.redirect('/dpi')
})

module.exports = router;
