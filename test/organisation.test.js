const DB = require('../model/db.js');
const orgModel = require('../model/organisation.js');

describe("test model organisation", () => {
    afterAll((done) => {
        DB.end(done);
    });

    test("read organisation", (done) => {
        orgModel.read('000000000', (err, result) => {
            if (err) return done(err); 
            expect(result).toBeDefined(); 
            expect(result.nom).toBe('TestOrg'); 
            done(); 
        });
    });
    test("read organisation ERREUR", (done) => {
        orgModel.read(null, (err, result) => {
            expect(err).toBeDefined();  
            expect(result).toBeUndefined(); 
            done();
        });
    });
    
    test("read all organisations", (done) => {
        orgModel.readall((err, results) => {
            if (err) return done(err); 
            expect(results).toBeDefined();
            done(); 
        });
    });
    test("create organisation", (done) => {
        const newOrg = {
            siren: '999999999',
            nom: 'TestOrgCreate',
            type_entreprise: 'TestType',
            siege_social: '123 Rue Test, Testville'
        };
    
        orgModel.create(newOrg.siren, newOrg.nom, newOrg.type_entreprise, newOrg.siege_social, (err) => {
            expect(err).toBeNull();

            orgModel.read(newOrg.siren, (err, result) => {
                expect(err).toBeNull();
                expect(result).toBeDefined();
                expect(result.nom).toBe(newOrg.nom);
                done();
            });
        });
    });
    test("delete organisation", (done) => {
        const sirenToDelete = '999999999'; 
    
        orgModel.delete(sirenToDelete, (err) => {
            expect(err).toBeNull();
    
            orgModel.read(sirenToDelete, (err, result) => {
                expect(err).toBeNull();
                done();
            });
        });
    });
        
});
