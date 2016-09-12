'use strict';

var request = require("supertest"), 
    app = require("../index.js").getApp;

    describe('GET /', function(){
        it('expects HTTP response 200', function(done){
            request(app)
            .get('/')
            .expect(200, done);
        });
    });
