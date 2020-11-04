//=================
// puerto
//=================

process.env.PORT = process.env.PORT || 3000;


//=================
// entorno
//=================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=================
// database
//=================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGOURI;
}

process.env.URLDB = urlDB;


//=================
// vencimiento del token
//=================
//60 minutos
//60 segundos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;



//=================
// SEED de autenticacion
//=================
//
process.env.SEED = process.env.SEED || 'secret-este-es';