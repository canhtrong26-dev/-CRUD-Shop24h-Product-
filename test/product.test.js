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
describe("POST create Product", function() {
    it("should create a new Product", function(done) {

        // Bước 1: Tạo ProductType trước để lấy _id làm type
        chai.request(app)
            .post('/product-types')
            .send({ name: "Type For Product " + Date.now() })
            .end(function(err, res) {

                const productTypeId = res.body._id;

                // Bước 2: Tạo Product với type là productTypeId
                chai.request(app)
                    .post('/products')
                    .send({
                        name: "Product " + Date.now(),
                        description: "Mô tả product test",
                        type: productTypeId,
                        imageUrl: "http://test.com/image.jpg",
                        buyPrice: 100000,
                        promotionPrice: 90000,
                        amount: 10
                    })
                    .end(function(err2, res2) {
                        res2.should.have.status(201);
                        res2.body.should.be.an('object');
                        res2.body.should.have.property('_id');
                        res2.body.should.have.property('name');
                        res2.body.should.have.property('buyPrice');
                        done();
                    });
            });
    });
});

// SubTask 4
describe("GET all Product", function() {
    it("should get all Product of database", function(done) {
        chai.request(app)
            .get('/products')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.an('array');
                done();
            });
    });
});

// SubTask 5
describe("GET Product by Id", function() {
    it("should get a Product by valid ID", function(done) {
        chai.request(app)
            .post('/product-types')
            .send({ name: "Type GET " + Date.now() })
            .end(function(err, res) {
                const productTypeId = res.body._id;
                chai.request(app)
                    .post('/products')
                    .send({
                        name: "Product GET " + Date.now(),
                        type: productTypeId,
                        imageUrl: "http://test.com/image.jpg",
                        buyPrice: 100000,
                        promotionPrice: 90000
                    })
                    .end(function(err2, res2) {
                        const validId = res2.body._id;
                        chai.request(app)
                            .get(`/products/${validId}`)
                            .end(function(err3, res3) {
                                res3.should.have.status(200);
                                res3.body.should.be.an('object');
                                res3.body.should.have.property('_id').equal(validId);
                                done();
                            });
                    });
            });
    });
});

// SubTask 6
describe("PUT Product by Id", function() {
    it("should update a Product by valid ID", function(done) {
        chai.request(app)
            .post('/product-types')
            .send({ name: "Type PUT " + Date.now() })
            .end(function(err, res) {
                const productTypeId = res.body._id;
                chai.request(app)
                    .post('/products')
                    .send({
                        name: "Product PUT " + Date.now(),
                        type: productTypeId,
                        imageUrl: "http://test.com/image.jpg",
                        buyPrice: 100000,
                        promotionPrice: 90000
                    })
                    .end(function(err2, res2) {
                        const validId = res2.body._id;
                        chai.request(app)
                            .put(`/products/${validId}`)
                            .send({ buyPrice: 200000, promotionPrice: 180000 })
                            .end(function(err3, res3) {
                                res3.should.have.status(200);
                                res3.body.should.be.an('object');
                                res3.body.should.have.property('buyPrice').equal(200000);
                                done();
                            });
                    });
            });
    });
});

// SubTask 7
describe("DELETE Product by Id", function() {
    it("should delete a Product by valid ID", function(done) {
        chai.request(app)
            .post('/product-types')
            .send({ name: "Type DELETE " + Date.now() })
            .end(function(err, res) {
                const productTypeId = res.body._id;
                chai.request(app)
                    .post('/products')
                    .send({
                        name: "Product DELETE " + Date.now(),
                        type: productTypeId,
                        imageUrl: "http://test.com/image.jpg",
                        buyPrice: 100000,
                        promotionPrice: 90000
                    })
                    .end(function(err2, res2) {
                        const validId = res2.body._id;
                        chai.request(app)
                            .delete(`/products/${validId}`)
                            .end(function(err3, res3) {
                                res3.should.have.status(204);
                                res3.body.should.be.an('object');
                                done();
                            });
                    });
            });
    });
});