const supertest = require('supertest') 
const app = require('../app')
require('../models')

let directorstId
test("POST -> '/api/v1/directors', should return status code 201", async()=>{
    const directors = {
        firstName: "James",
        lastName: "Wan",
        nationality: "Malasia",
        image: "imagen05",
        birthday: "26-02-1977"
    }

    const res = await supertest(app)
        .post('/api/v1/directors')
        .send(directors)
        
        console.log(res.body)
        directorstId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(directors.firstName)
})
 
test("GET -> '/api/v1/directors', should return status code 200", async()=>{

    const res = await supertest(app).get('/api/v1/directors')

    expect(res.status).toBe(200)
})

test("GET One-> '/api/v1/directors', should return status code 200, and res.body.firstName", async()=>{

    const res = await supertest(app)
        .get(`/api/v1/directors/${directorstId}`)

    console.log(res.body)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("James")
})

test("PUT -> '/api/v1/directors/:id' should return status 200 and res.body.firstName", async()=>{
    const directors = {
        firstName: "Justin",
        lastName: "Lin",
        nationality: "Taiwán",
        image: "imagen06",
        birthday: "11-10-1971"
    }

    const res = await supertest(app)
        .put(`/api/v1/directors/${directorstId}`)
        .send(directors)

    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(directors.firstName)
})

test("DELETE -> '/api/v1/directors/:id' should return status 204", async ()=>{
    const res = await supertest(app).delete(`/api/v1/movies/${directorstId}`)
    expect(res.status).toBe(204)
})