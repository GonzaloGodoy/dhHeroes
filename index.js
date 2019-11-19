const express = require('express')

const fs = require('fs')

const app = express()

app.listen(3030, () => console.log('Server running in 3030 port'));

const heroes = JSON.parse(fs.readFileSync(__dirname + '/data/heroes.json', 'utf-8'));

let saludo = 'Ni Superman, Iron Man o La Mujer Maravilla son tan importantes cómo las y los Heroes de carne y hueso que encontrarás en este sitio. Esperamos que ellas y ellos te sirvan como inspiración para poder cumplir tus objetivos. Recuerda: ¡nunca pares de creer en ti!.'
app.get('/', function(req,res){
    res.send(saludo)
});

// Ruta /heroes ➝ se envía todo el array y Express lo parsea para el browser como JSON :D
app.get('/heroes', (req,res) => {
	res.send(heroes);
});

// Ruta /heroes/n ➝ se envía el nombre y profesión del héroe solicitado
app.get('heroes/detalle/:id', (req,res) => {
	// Acá lo primero será encontrar al héroe que corresponda
    let heroe = heroes.find(heroe => heroe.id === req.params.id);
    if(heroe){
       res.send(`Hola, mi nombre es ${heroes.nombre} y soy ${heroes.profesion}`)
    }else{
        res.send('no se encontro')
    }
	
});


app.get('/heroes/bio/:id/:ok?', (req,res) => {
    let heroe = heroes.find(heroe => heroe.id == req.params.id);
    if(heroe){
        if(req.params.ok == 'ok'){
            res.send(`nombre ${heroe.nombre} resenia ${heroe.resenia}`)
        }else{
            res.send(`nombre ${heroe.nombre} lamento que no quieras saber mas de mi`)
        }
    }else{
        res.send('No encontramos un heroe para mostrarte su biografia')
    }

	
});

app.get('/creditos', (req,res) => {
  res.send(`esta increible pagina fue desarrollada por Gabo Luque y Gonzalo Godoy`)
})


// Ruta... ¿Pára qué sirve esto?
app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
});

