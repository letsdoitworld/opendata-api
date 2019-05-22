'use strict';
/*global describe*/
/*global it*/
/*eslint no-unused-vars: "off"*/
var should = require('chai').should();
var supertest = require('supertest');

var trashoutUrl="https://api.trashout.ngo/v1"

var api = supertest(trashoutUrl);
var chai = require("chai");
chai.should();
chai.use(require('chai-things'));

var authenticatedToken = 'a0c84fe524f970d1a404fb3ccf985f71';
describe('Connector with Trashout API', function () {

    it('should return Trashpoints from Trashout API TrashPoints', function (done) {
        api.get('/trash/?attributesNeeded=size,gpsFull')
            .set('x-api-key',authenticatedToken)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {''
                if (err) {
                    return done(err);
                }
                res.body.should.be.instanceof(Array).and.all.have.property('size');
                var parsedString=JSON.stringify(res.body);
                var parsedReports=JSON.parse(parsedString);
                console.log('sucess!'+(parsedReports[1].size));
                done();
            });
    });

});

