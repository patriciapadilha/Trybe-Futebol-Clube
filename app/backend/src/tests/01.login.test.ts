import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

import mocks from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
    let chaiHttpResponse: Response;
    it('Endpoint /login - o avaliador verificará que é possível realizar um login com sucesso', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(mocks.login);
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.have.property('token');
    });

    it('Endpoint /login - o avaliador verificará que não é possível realizar um login com user inválido', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(mocks.loginErr);
        expect(chaiHttpResponse).to.have.status(401);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.have.property('message');
        expect(chaiHttpResponse.body.message).to.equal('Incorrect email or password');
    });
});
