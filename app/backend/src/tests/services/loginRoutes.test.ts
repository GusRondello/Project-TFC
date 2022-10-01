import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';
import { app } from '../../app';
import { loginMocked } from '../data';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test login routes', () => {
    let chaiHttpResponse: Response;

    describe('/login valid user', () => {
        before(async () => {
            chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send(loginMocked)
        });

        it('Returns status code 200', async () => {
            expect(chaiHttpResponse).to.have.status(200);
        });
        it('Returns a token', async () => {
            expect(chaiHttpResponse.body).to.have.property('token');
        });
    });
});