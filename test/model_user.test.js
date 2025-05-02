const DB = require("../model/db.js");
const model = require("../model/user.js");


const userModel = require("../model/user.js");



const orgModel = require('../model/organisation.js');

describe("test model user", () => {
    afterAll((done) => {
        DB.end(done);
    });



    test("read user", (done) => {
        userModel.read('user.test@testmail.com', (err, result) => {
            if (err) return done(err); 
            expect(result).toBeDefined(); 
            expect(result.nom).toBe('Testeur'); 
            done(); 
        });
    });

        
});
