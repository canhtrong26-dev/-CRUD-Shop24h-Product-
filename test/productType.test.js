const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
chai.use(chaiHttp);
chai.should();

// SubTask 2
describe("MongoDB Connection Test", function() {
    it("Should connect to MongoDB", function(done) {
        chai.request(app)
            .get('/test/mongo-connection')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('MongoDB connected successfully');
                done();
            });
    });
});

// SubTask 3
describe("POST create ProductType", function() {
    it("should create a new ProductType", function(done) {

        const newProductTypeData = {
            name: "ProductType " + Date.now(), // thêm Date.now() tránh trùng
            description: "Mô tả ProductType test"
        };

        chai.request(app)
            .post('/product-types')
            .send(newProductTypeData)
            .end(function(err, res) {

                res.should.have.status(201);
                res.body.should.be.an('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('name').equal(newProductTypeData.name);
                res.body.should.have.property('description').equal(newProductTypeData.description);

                done();
            });
    });
});

// SubTask 4
describe("GET all ProductType", function() {
    it("should get all ProductType of database", function(done) {

        chai.request(app)
            .get('/product-types')
            .end(function(err, res) {

                res.should.have.status(200);
                res.body.should.be.an('array'); // trả về mảng trực tiếp

                done();
            });
    });
});

// SubTask 5
describe("GET ProductType by Id", function() {
    it("should get a ProductType by valid ID", function(done) {

        // Bước 1: Tạo ProductType trước để lấy _id
        chai.request(app)
            .post('/product-types')
            .send({
                name: "ProductType GET " + Date.now(),
                description: "Mô tả test get by id"
            })
            .end(function(err, res) {

                const validId = res.body._id; // lấy _id trực tiếp từ body

                // Bước 2: GET ProductType theo ID
                chai.request(app)
                    .get(`/product-types/${validId}`)
                    .end(function(err2, res2) {

                        res2.should.have.status(200);
                        res2.body.should.be.an('object');
                        res2.body.should.have.property('_id').equal(validId);
                        res2.body.should.have.property('name');

                        done();
                    });
            });
    });
});

// SubTask 6
describe("PUT ProductType by Id", function() {
    it("should update a ProductType by valid ID", function(done) {

        // Bước 1: Tạo ProductType trước để lấy _id
        chai.request(app)
            .post('/product-types')
            .send({
                name: "ProductType UPDATE " + Date.now(),
                description: "Mô tả test update"
            })
            .end(function(err, res) {

                const validId = res.body._id;

                // Dữ liệu mới để update
                const updatedData = {
                    name: "ProductType UPDATED " + Date.now(),
                    description: "Mô tả đã update"
                };

                // Bước 2: PUT update ProductType theo ID
                chai.request(app)
                    .put(`/product-types/${validId}`)
                    .send(updatedData)
                    .end(function(err2, res2) {

                        res2.should.have.status(200);
                        res2.body.should.be.an('object');
                        res2.body.should.have.property('_id').equal(validId);
                        res2.body.should.have.property('name').equal(updatedData.name);
                        res2.body.should.have.property('description').equal(updatedData.description);

                        done();
                    });
            });
    });
});

// SubTask 7
describe("DELETE ProductType by Id", function() {
    it("should delete a ProductType by valid ID", function(done) {

        // Bước 1: Tạo ProductType trước để lấy _id
        chai.request(app)
            .post('/product-types')
            .send({
                name: "ProductType DELETE " + Date.now(),
                description: "Mô tả test delete"
            })
            .end(function(err, res) {

                const validId = res.body._id;

                // Bước 2: DELETE ProductType theo ID
                chai.request(app)
                    .delete(`/product-types/${validId}`)
                    .end(function(err2, res2) {

                        res2.should.have.status(204);
                        res2.body.should.be.an('object');

                        done();
                    });
            });
    });
});