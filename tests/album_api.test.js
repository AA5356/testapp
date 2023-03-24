const mongoose = require("mongoose");
const supertest = require("supertest");
const Album = require("../models/Album");
const testAlbums = require("./data.json");
const app = require("../app");
const api = supertest(app);


beforeEach(async () => {
    await Album.deleteMany({});
    await Album.create(testAlbums);
});


test("albums määrien tarkistus", async () => {
    const response = await api
        .get('/api/albums')
        .expect(200)
        .expect("Content-Type", /application\/json/);
    expect(response.body.data).toHaveLength(testAlbums.length)

});

test('a new album can be added ', async () => {
    const newAlbum = {
      'artist':'XXX',
      'title':'xxx10',
      'year': 2010,
      'genre':'Pop',
      'tracks': 5
    }
  
    await api
      .post('/api/albums')
      .send(newAlbum)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/albums')
    expect(response.body.data).toHaveLength(testAlbums.length + 1)
  })


  test('Onnistuko poisto', async () => {
    const dataAtStart = await api.get('/api/albums')
    const dataToDelete = dataAtStart.body.data[0]
console.log(dataToDelete._id)
    await api
      .delete(`/api/albums/${dataToDelete._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/albums')
    expect(response.body.data).toHaveLength(testAlbums.length - 1)
  })



afterAll(() => {
    mongoose.connection.close();
});
  
  