

var User = require('../models/users');
exports.user_create = function(req, res, next) {
if (req.body) {
let items = req.body
User.create(items, function(err, newUsers){
if(err) return res.json({ error: err });
var usuario = newUsers;
            //res.json(newUsers);
            res.render('validar', { nombreUsuario: usuario.name });
});
} else {
res.json({status: 'ERROR', message: 'Debe completar todos loscampos'}); //opcional mandar un mensaje de error
}
}


exports.lista_usuarios = function (req, res, next) {

    User.find({}, function (err, usuarios) {
        if (err) return handleError(err);

        usuarios = usuarios.sort();
        usuarios = reemplazar_nombres(usuarios);
        res.render('registro', {usuarios: usuarios});
    });
} 

function reemplazar_nombres(arreglo) {
    arreglo.map(function (arreglo) {

        if (arreglo.name.includes('\u00f1')) {
            let nombre = arreglo.name;
            arreglo.name = nombre.replace(new RegExp("\u00f1", 'gi'), "nn");
        }
        if (arreglo.lastname.includes('\u00f1')) {
            let apellido = arreglo.lastname;
            arreglo.lastname = apellido.replace(new RegExp("\u00f1", 'gi'), "nn");

        }
    });
    return arreglo;
}
 