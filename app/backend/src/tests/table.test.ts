import * as chai from 'chai';
import { Response } from 'superagent';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;


describe('Test Leaderboard routes', () => {
    let chaiHttpResponse: Response;

    describe('GET: /leaderboard returns leaderboard', () => {
        before(async () => {
           chaiHttpResponse = await chai
           .request(app)
           .get('/leaderboard') 
        });

        it('Returns status code 200',async () => {
            expect(chaiHttpResponse).to.have.status(200); 
         });
         it('Returns an array as a Leaderboard',async () => {
             expect(chaiHttpResponse.body).to.be.an('array');
         });
    });

    describe('GET: /leaderboard/home returns home leaderboard', () => {
        before(async () => {
           chaiHttpResponse = await chai
           .request(app)
           .get('/leaderboard/home') 
        });

        it('Returns status code 200',async () => {
            expect(chaiHttpResponse).to.have.status(200); 
         });
         it('Returns an array as a home Leaderboard',async () => {
             expect(chaiHttpResponse.body).to.be.an('array');
         });
    });

    describe('GET: /leaderboard/away returns home leaderboard', () => {
        before(async () => {
           chaiHttpResponse = await chai
           .request(app)
           .get('/leaderboard/away') 
        });

        it('Returns status code 200',async () => {
            expect(chaiHttpResponse).to.have.status(200); 
         });
         it('Returns an array as a away Leaderboard',async () => {
             expect(chaiHttpResponse.body).to.be.an('array');
         });
    });
});