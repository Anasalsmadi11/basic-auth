// const request = require('supertest');
// const app = require('../src/server'); 
// const bcrypt = require('bcrypt');
// const { db } = require('../src/auth/models/index');

const supertest= require('supertest')
const {userModel} = require('../src/auth/models/index');
const { app } = require('../src/server');
const mockServerMethods = supertest(app);
const bcrypt = require('bcrypt');

const { db } = require('../src/auth/models/index'); 

// beforeAll(async () => {
//   // Connect to the database before running the tests
//   await db.authenticate();
// });


describe('userModel Routes', () => {

    const anas= {
        username:"sdsssedafdrrrresdddddsds",
        password:"test1213"
    }
    it('should create a new user and return 201 status code', async () => {
    //   const username = 'test';
    //   const password = 'test122';

      const response = await mockServerMethods.post('/signup').send(anas);
// console.log(response.users.dataValues)
      expect(response.status).toBe(201);
    //   expect(response.body.username).toBe(username);

      let record= await userModel.destroy({where:{username:anas.username}})

    });
    // it("", async()=>{
    //     const response = await mockServerMethods.post('/signup').send(anas);
    //     const response1 = await mockServerMethods.post('/signin').send(anas);
    //     expect(response1.status).toBe(500)
    // })
    

});

// afterAll(async () => {
//   // Close the database connection after running the tests
//   await db.drop();
// });
