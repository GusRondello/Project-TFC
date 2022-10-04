import * as chai from 'chai';
import { Response } from 'superagent';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('Test teams routes', () => {
    let chaiHttpResponse: Response;

    describe('GET: /teams returns teams', () => {
        before(async () => {
            chaiHttpResponse = await chai
            .request(app)
            .get('/login')
        });

        it('Returns status code 200',async () => {
           expect(chaiHttpResponse).to.have.status(200); 
        });
        it('Returns an array of teams',async () => {
            expect(chaiHttpResponse.body).to.be.an('array');
        });
    });

    describe('GET: /teams:id returns a team', () =>{ 
        before(async () => {
           chaiHttpResponse = await chai
           .request(app)
           .get('/login/1') 
        });

        
        it('Returns status code 200',async () => {
            expect(chaiHttpResponse).to.have.status(200); 
         });
        it('Returns an object with team name',async () => {
            expect(chaiHttpResponse.body).to.have.property('teamName');
        });
    });
});