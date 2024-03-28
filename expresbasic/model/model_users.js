const connection = require('../config/db');

class Model_users{
    static async getAll(){
        return new Promise((resolve, reject) =>{
            connection.query('select *from users order by id_user desc', (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    }
    static async getId(id){
        return new Promise((resolve, reject) =>{
            connection.query('select * from users WHERE id_user = ' + id , (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    }


    static async Login(email){
        return new Promise((resolve, reject) =>{
            connection.query('select * from users where email = ?', [email], function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }
    static async Store(Data){
        return new Promise((resolve, reject) =>{
            connection.query('insert into users set ?',Data, function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }
    static async Update(id,Data){
        return new Promise((resolve,reject) =>{
            connection.query('update users set ? where id_user ='+ id, Data, function (err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }
    static async Delete(id){
        return new Promise((resolve, reject) =>{
            connection.query('delete from users where id_user = '+ id, function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }
}
module.exports = Model_users;