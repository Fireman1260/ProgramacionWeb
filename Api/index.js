const express = require('express')
const mongo = require('mongodb').MongoClient;
const app = express()
var assert = require('assert')

var url = 'mongodb://40.114.73.18:27017'

app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE")
    next();
  });
  

app.get('/api/heroes', (req, res) => {
    listado  = []
    mongo.connect(url, function(err, db){
        assert.equal(null, err);
        const HeroDatabase = db.db('HeroDatabase')
        var cursor = HeroDatabase.collection('Heroes').find();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            listado.push(doc)
        },
        function(){
            res.status(200).send(listado);
        });
        db.close()
    })

    
});

app.get('/api/heroes/:id', (req, res) => {
    mongo.connect(url, function(err, db){
        const HeroDatabase = db.db('HeroDatabase')
        var cursor = HeroDatabase.collection('Heroes').find({id: parseInt(req.params.id)});
        cursor.next(function(err, doc) {
            if (doc) {
                res.status(200).send(doc);
            }
            else{
                res.status(404).send('El heroe con el ID brindado no se encontro')
            }
        });
    })
});


var newID = 0
app.post('/api/heroes', (req, res) => {

    if(!req.body.name){
        res.status(400).send("Se requiere que el campo 'name' exista y lleve algun valor");
        return;
    }
    if(!req.body.hero_type){
        res.status(400).send("Se requiere que el campo 'hero_type' exista y lleve algun valor");
        return;
    }
    if(!req.body.alter_ego){
        res.status(400).send("Se requiere que el campo 'alter_ego' exista y lleve algun valor");
        return;
    }
    if(!req.body.species){
        res.status(400).send("Se requiere que el campo 'species' exista y lleve algun valor");
        return;
    }
    if(!req.body.src){
        res.status(400).send("Se requiere que el campo 'src' exista y lleve algun valor");
        return;
    }
        
    mongo.connect(url, function(err, db){
        const HeroDatabase = db.db('HeroDatabase')
        console.log("Conecto a la base de datos")
        var cursor = HeroDatabase.collection('Heroes').find().sort({id: -1});
        cursor.next(function(err, doc) {
            if (doc === null){
                const newHero = {
                    id: 1,
                    name: req.body.name,
                    hero_type: req.body.hero_type,
                    alter_ego: req.body.alter_ego,
                    species: req.body.species,
                    src: req.body.src
                }
                HeroDatabase.collection('Heroes').insertOne(newHero, function(err, result){
                    res.status(201).send("Heroe insertado exitosamente");
                    db.close();
                })
            }
            if (doc) {
                const newHero = {
                    id: doc.id + 1,
                    name: req.body.name,
                    hero_type: req.body.hero_type,
                    alter_ego: req.body.alter_ego,
                    species: req.body.species,
                    src: req.body.src
                }
                HeroDatabase.collection('Heroes').insertOne(newHero, function(err, result){
                    res.status(201).send("Heroe insertado exitosamente");
                    db.close();
                })
                
            }
        });
    })
    
});


app.put('/api/heroes/:id', (req, res) => {
    
    if(!req.body.name){
        res.status(400).send("Se requiere que el campo 'name' exista y lleve algun valor");
        return;
    }
    if(!req.body.hero_type){
        res.status(400).send("Se requiere que el campo 'hero_type' exista y lleve algun valor");
        return;
    }
    if(!req.body.alter_ego){
        res.status(400).send("Se requiere que el campo 'alter_ego' exista y lleve algun valor");
        return;
    }
    if(!req.body.species){
        res.status(400).send("Se requiere que el campo 'species' exista y lleve algun valor");
        return;
    }
    if(!req.body.src){
        res.status(400).send("Se requiere que el campo 'src' exista y lleve algun valor");
        return;
    }
    

    mongo.connect(url, function(err, db){
        const HeroDatabase = db.db('HeroDatabase');
        var cursor = HeroDatabase.collection('Heroes').find({id: parseInt(req.params.id)});
        cursor.next(function(err, doc) {
            if (doc) {
                HeroDatabase.collection('Heroes').updateOne({id: parseInt(req.params.id)}, { $set:{
                    name: req.body.name,
                    hero_type: req.body.hero_type,
                    alter_ego: req.body.alter_ego,
                    species: req.body.species,
                    src: req.body.src
                }})

                res.status(204).send("Heroe Actualizado exitosamente")
            }
            else{
                res.status(404).send('El heroe con el ID brindado no se encontro')
            }
        });
        
    });

    
});

app.delete('/api/heroes/:id', (req, res) => {
    // const heroe = listado.find(h => h.id === parseInt(req.params.id))
    // if(!heroe) {
    //     res.status(404).send('El heroe con el ID brindado no se encontro')
    //     return;
    // }

    // const index = listado.indexOf(heroe);
    // listado.splice(index, 1);

    mongo.connect(url, function(err, db){
        const HeroDatabase = db.db('HeroDatabase');
        var cursor = HeroDatabase.collection('Heroes').find({id: parseInt(req.params.id)});
        cursor.next(function(err, doc) {
            if (doc) {
                HeroDatabase.collection('Heroes').deleteOne({id: parseInt(req.params.id)})
                res.status(204).send("Heroe Eliminado exitosamente")
            }
            else{
                res.status(404).send('El heroe con el ID brindado no se encontro')
            }
        });
        
    });

});



app.listen(3001, () => console.log('Escuchando en el puerto 3001...'))