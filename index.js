const express = require('express')
const app = express()
const axios = require('axios')
const port = 3000
const URL="https://api-rest-productos.onrender.com/"
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/productos",(req, res)=>{
    axios.get(URL+'productos/')
        .then((response)=> {
            let MisVentas=[]
            response.data.map(item=>{
                const nuevo=item
                nuevo.proveedor="Mario_Gaytan"
                nuevo.costo=item.costo*10
                MisVentas.push(nuevo)
            })
            res.status(200).json(MisVentas);
        })
        .catch((e)=>{
            res.status(e.response.status).json(e)
    })
})
app.get("/productos/:id",(req, res)=>{
    axios.get(URL+`productos/${req.params.id}`)
        .then((response)=> {
           const nuevo = response.data
           nuevo.proveedor="Mario_Gaytan"
           nuevo.costo=response.data.costo*5
           res.status(200).json(nuevo);
        })
        .catch((e)=>{
            res.status(e.response.status).json(e)
    })
})

app.get("/productos/categoria/:cat", (req, res) => {
    axios.get(URL + 'productos/categoria/' + req.params.cat)
      .then((response) => {
        let MisCategorias = []; 
        response.data.map(item=>{
            const nuevo=item
            nuevo.proveedor="Mario_Gaytan"
            nuevo.costo=item.costo*10
            MisCategorias.push(nuevo)
        })
        res.status(200).json(MisCategorias);
      })
      .catch((e) => {
        // Aquí asegúrate de manejar correctamente el error, e.response puede ser undefined
        res.status(e.response ? e.response.status : 500).json(e.message || e);
      });
  });
  

app.post("/productos",(req, res)=>{
    axios.post(URL+'productos',req.body)
        .then((response)=> {
            res.status(201).json(response.data);
        })
        .catch((e)=>{
            res.status(e.response.status).json(e)
    })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
