const supertest = require('supertest') 
const app = require('../app')
require('../models')

//Se declara una variable actorstId para almacenar el ID del actor creado en la prueba anterior.
let actorstId

  
test("POST -> '/api/v1/actors', should return status code 201", async()=>{
    // Se define el objeto que representa los datos del actor
    const actors = {
        firstName: "Dwayne",
        lastName: "Johnson",
        nationality: "Estados Unidos",
        image: "lorem01",
        birthday: "05-02-+1972"
    }
    // Se envía la solicitud POST al endpoint
    const res = await supertest(app)
        .post('/api/v1/actors')
        .send(actors)
   console.log(res.body)

   // Se guarda el ID del actor para usarlo en pruebas posteriores
    actorstId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(actors.firstName)
})




//Se define otro test para obtener todos los actores con una solicitud GET a la ruta '/api/v1/actors'.
test("GET -> '/api/v1/actors', should return status code 200", async()=>{
    const res = await supertest(app).get('/api/v1/actors')
    console.log(res.body)
    expect(res.status).toBe(200)
})

//Se define un test para obtener un actor específico utilizando su ID con una solicitud GET a la ruta '/api/v1/actors/:id'.
test("GET One-> '/api/v1/actors', should return status code 200, and res.body.firstName' ", async()=>{
    const res = await supertest(app)
        .get(`/api/v1/actors/${actorstId}`)

    console.log(res.body)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Walter")
})


//Se define un test para actualizar un actor existente con una solicitud PUT a la ruta '/api/v1/actors/:id'.
test("PUT -> '/api/v1/actors/:id' should return status 200 and res.body.firstName", async()=>{
    const actors = {
        firstName: "Vin",
        lastName: "Diesel",
        nationality: "Estados Unidos",
        image: "image02",
        birthday: "18-02-1982"
    }
       
    const res = await supertest(app)
        .put(`/api/v1/actors/${actorstId}`)
        .send(actors)
  
    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(actors.firstName)
})


//Se define un test para eliminar un actor con una solicitud DELETE a la ruta '/api/v1
test("DELETE -> '/api/v1/actors/:id' should return status 204", async ()=>{
    const res = await supertest(app).delete(`/api/v1/movies/${actorstId}`)
    expect(res.status).toBe(204)
})