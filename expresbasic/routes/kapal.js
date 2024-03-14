var express = require('express');
var router = express.Router();
const Model_kapal = require('../model/model_kapal.js');

router.get('/',async function(req,res,next){
    let rows = await Model_kapal.getAll();
    res.render('kapal/index',{
        data:rows
    });
})

router.get('/create', function(req, res, next){
    res.render('kapal/create',{
        nama_kapal: '',
        id_pemilik: '',
        id_dpi: '',
        id_alat_tangkap: '',
    });
});

router.post('/store',async function(req,res,next){
    try{
        let {nama_kapal,id_pemilik,id_dpi,id_alat_tangkap} = req.body;
        let Data ={
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alat_tangkap,
        }
        await Model_kapal.Store(Data);
        req.flash('succes','Berhasil menyimpan data yeay');
        res.redirect('/kapal')
    }catch{
        req.flash('error','gagal menyimpan data');
        res.redirect('/kapal')
    }
})

router.get('/edit/(:id)',async function(req,res,next){
    let id = req.params.id;
    let rows = await Model_kapal.getId(id);
    res.render('kapal/edit',{
        id :                    rows[0].id_kapal,
        id_pemilik:          rows[0].id_pemilik,
        id_dpi:          rows[0].id_dpi,
        id_alat_tangkap:          rows[0].id_alat_tangkap,
    })
})


router.post('/update/(:id)',async function(req,res,next){
    try{
        let id = req.params.id;
        let {nama_kapal,id_pemilik,id_dpi,id_alat_tangkap} = req.body;
        let Data = {
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alat_tangkap,
        }
        await Model_kapal.Update(id,Data);
        req.flash('success','Berhasil update data');
        res.redirect('/kapal')
    }catch{
        req.flash('error','gagal menyimapan data');
        res.redirect('/kapal')
    }
})


router.get('/delete/(:id)',async function(req,res,next){
    let id = req.params.id;
    await Model_kapal.Delete(id);
    req.flash('success','Berhasil menghapus data');
    res.redirect('/kapal')
})

module.exports = router;
