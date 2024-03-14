let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kapal',
});
connection.connect(function(error){
    if(!!error){
        console.log(error)
    }else{
        console.log('Connect berhasil')
    }
})

module.exports = connection