const express = require('express');
const series = require('../data/series.json')
const app =  express();

const PORT = 3000;

app.use(express.json())   

app.get('/series',(req, res)=>{
    res.status(200).json(series)
})

app.get('/series/:id',(req,res)=>{                              // para consultar una serie
        const id = req.params.id                                
        const serie = series.find( serie => serie.id == id)
        if (serie)
          res.status(200).json(serie)
        else 
          res.status(404).json({
               mensaje: `El id ${id} no se encuentra`})
})    

app.delete('/series/:id',(req,res)=>{
    const id = req.params.id
    const serie = series.findIndex(serie => serie.id == id)
    if (serie != -1){
        series.splice(serie,1)                               // id , cantidad de elem a eliminar
        res.status(200).json(id)                             // lo que quiero q meimprima la pag en texto
    }
    else 
        res.status(404).json({
            mensaje: `El id ${id} no se encuentra`})
        
        
})

app.post('/series',(req,res)=>{
    //console.log(req.body)
    const {nombre, plataforma} = req.body
    const serie ={
        id : series.reduce((max,serie) => serie.id > max ? serie.id : max,0) +1,
        nombre,
        plataforma,
        disponible : false
    }
    series.push(serie)
    //res.status(201).json(series[series.length-1]) cuado quiero devolver el ultimo
    res.status(201).json(serie)
})

app.listen(PORT,() =>{
    console.log (`Aplicacion lista escuchando en ${PORT}`)
})
