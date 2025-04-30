const DB = require("../model/db.js");
const model = require("../model/user.js");

describe("Model Tests", () => {


    beforeAll(() => {
        console.log("model.user.test()");
        // des instructions à exécuter avant le lancement de cette suite de tests
    });
        afterAll((done) => {
        function callback(err) {
            if (err) done(err);
            else done();
        }
        DB.end(callback);
        
    });
        test("read user", async () => {
        nom = null;
        function cbRead(resultat) {
            console.log(resultat);
            nom = resultat.nom;
            expect(nom).toBe("test");
        }
        let res = await model.read("test@test.fr", cbRead);
    });
});