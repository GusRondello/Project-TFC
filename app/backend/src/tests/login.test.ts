import * as chai from 'chai';
import { Response } from 'superagent';
import { app } from '../app';
import { validUser } from './mockedData';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('Test login routes', () => {
    let chaiHttpResponse: Response;

    describe('POST: /login valid user', () => {
        before(async () => {
            chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send(validUser)
        });

        it('Returns status code 200', async () => {
            expect(chaiHttpResponse).to.have.status(200);
        });
        it('Returns a token', async () => {
            expect(chaiHttpResponse.body).to.have.property('token');
        });
    });
    describe('POST: /login empty email', () => {
        before(async () => {
            chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send({    email: "",
            password: "secret_user"})
        })
        it('Returns status code 400', async () => {
            expect(chaiHttpResponse.body).to.have.status(400);
        })
        it('Returns a message', async () => {
            expect(chaiHttpResponse.body).to.have.property('message');
        });
    });
    describe('POST: /login empty password', () => {
        before(async () => {
            chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send({    email: "user@user.com",
            password: ""})
        })
        it('Returns status code 400', async () => {
            expect(chaiHttpResponse.body).to.have.status(400);
        })
        it('Returns a message', async () => {
            expect(chaiHttpResponse.body).to.have.property('message');
        });
    });
    describe('POST: /login invalid email', () => {
        before(async () => {
            chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send({    email: "useruser.com",
            password: "secret_user"})
        })
        it('Returns status code 401', async () => {
            expect(chaiHttpResponse.body).to.have.status(401);
        })
        it('Returns a message', async () => {
            expect(chaiHttpResponse.body).to.have.property('message');
        });
    });
    describe('POST: /login invalid password', () => {
        before(async () => {
            chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send({    email: "user@user.com",
            password: "123456"})
        })
        it('Returns status code 401', async () => {
            expect(chaiHttpResponse.body).to.have.status(401);
        })
        it('Returns a message', async () => {
            expect(chaiHttpResponse.body).to.have.property('message');
        });
    });
    describe('POST: /login inexistent user', () => {
        before(async () => {
            chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send({    email: "teste@teste.com",
            password: "secret_user"})
        })
        it('Returns status code 401', async () => {
            expect(chaiHttpResponse.body).to.have.status(401);
        })
        it('Returns a message', async () => {
            expect(chaiHttpResponse.body).to.have.property('message');
        });
    });

    describe('GET: /login/validate valid token', () => {
        before(async () => {
            chaiHttpResponse = await chai
            .request(app)
            .post('/login')
            .send(validUser)
        });
        it('Returns status code 200', async () => {
            let validateResponse = await chai
            .request(app)
            .get('/login/validate')
            .set('authorization', chaiHttpResponse.body.token);

            expect(validateResponse).to.have.status(200);
        });
        it('Returns a role', async () => {
            let validateResponse = await chai
            .request(app)
            .get('/login/validate')
            .set('authorization', chaiHttpResponse.body.token);

            expect(validateResponse).to.have.property('role');
        });
    });
    describe('GET: /login/validate invalid token', () => {
        before(async () => {
            chaiHttpResponse = await chai
            .request(app)
            .get('/login/validate')
            .set('authorization', 'invalidToken')
        });
        it('Returns status code 401', async () => {
            expect(chaiHttpResponse).to.have.status(401);
        });
        it('Returns a message', async () => {
            expect(chaiHttpResponse).to.have.property('message');
        });
    });
});