const DB = require("../model/db.js");
const model = require("../model/user.js");

describe("Model Tests", () => {


    beforeAll(() => {
        console.log("model.user.test()");
        // des instructions à exécuter avant le lancement de cette suite de tests
    });

    afterAll((done) => {
        afterAll((done) => {
            DB.end(done);
        });
    });


        test("read all user", (done) => {
            model.readall((err, results) => {
                if (err) return done(err);
                expect(results).toBeDefined();
                done();
            });
        });

        // test("read user", async () => {
        //     nom = null;
        //     function cbRead(resultat) {
        //         console.log(resultat);
        //         nom = resultat.nom;
        //         expect(nom).toBe("test");
        //     }
        //     let res = await model.read("user.test@testmail.com", cbRead);
        // });
    });