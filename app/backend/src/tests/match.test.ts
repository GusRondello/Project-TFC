import * as chai from 'chai';
import { Response } from 'superagent';
import { app } from '../app';
import { mockedMatch, validMatch, validToken } from './mockedData';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('Test Matches routes', () => { 
    let chaiHttpResponse: Response;

    describe('GET: /matches returns matches', () => {
        before(async () => {
           chaiHttpResponse = await chai
           .request(app)
           .get('/matches') 
        });

        it('Returns status code 200',async () => {
            expect(chaiHttpResponse).to.have.status(200); 
         });
         it('Returns an array of teams',async () => {
             expect(chaiHttpResponse.body).to.be.an('array');
         });
    });

    describe('POST: /matches create a new match when token valid', () => {  
        before(async () => {
           chaiHttpResponse = await chai
           .request(app)
           .post('/matches')
           .send(validMatch)
           .set('authorization', validToken);
        });
        it('Returns status code 201', async () => {
            expect(chaiHttpResponse).to.have.status(201);
        });
        it('Returns a object', async () => {
            expect(chaiHttpResponse).to.be.a('object');
        });
    });
    describe('PATCH: /matches/:id/finish end a match', () => {  
        before(async () => {
           chaiHttpResponse = await chai
           .request(app)
           .patch('/matches/1/finish')
           .set('authorization', validToken);
        });
        it('Returns status code 200', async () => {
            expect(chaiHttpResponse).to.have.status(200);
        });
        it('Returns a string', async () => {
            expect(chaiHttpResponse.body).to.be.a('string');
        });
    });
    describe('PATCH: /matches/:id update a match', () => {  
        before(async () => {
           chaiHttpResponse = await chai
           .request(app)
           .patch('/matches/1/finish')
           .send(mockedMatch.id)
           .set('authorization', validToken);
        });
        it('Returns status code 200', async () => {
            expect(chaiHttpResponse).to.have.status(200);
        });
        it('Returns a string', async () => {
            expect(chaiHttpResponse.body).to.be.a('string');
        });
    });
 });