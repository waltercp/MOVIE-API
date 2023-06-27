const supertest = require('supertest') 
const app = require('../app')
require('../models')

let moviestId
test("POST -> '/api/v1/movies', should return status code 201", async()=>{
    const movies = {
        name: "Rapidos y Furiosos 5",
        image: "image03",
        synopsis: "resumen Rapidos y Furiosos",
        releaseYear: "2011"
    }

    const res = await supertest(app)
        .post('/api/v1/movies')
        .send(movies)
   
    moviestId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(movies.name)
})

test("GET -> '/api/v1/movies', should return status code 200", async()=>{

    const res = await supertest(app).get('/api/v1/movies')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0]).toBeDefined()
})

test("GET One-> '/api/v1/movies', should return status code 200, and res.body.firstName" , async()=>{

    const res = await supertest(app)
        .get(`/api/v1/movies/${moviestId}`)

    console.log(res.body)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Rapidos y Furiosos")
})

test("PUT -> '/api/v1/movies/:id' should return status 200 and res.body.firstName", async()=>{
    const movies = {
        name: "Rapidos y Furiosos 7",
        image: "imagen04",
        synopsis: "resumen Rapidos y Furiosos 7",
        releaseYear: "2015"
    }

    const res = await supertest(app)
        .put(`/api/v1/movies/${moviestId}`)
        .send(movies)

    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movies.name)
})

test("DELETE -> '/api/v1/movies/:id' should return status 204", async ()=>{
    const res = await supertest(app).delete(`/api/v1/movies/${moviestId}`)
    expect(res.status).toBe(204)
})