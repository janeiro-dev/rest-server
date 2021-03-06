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
    urlDB = 'mongodb+srv://janeiroleraning:VqJiK5Mo99Wtu0p2@cluster0.rbnj9.mongodb.net/cafe';
}

process.env.URLDB = urlDB;