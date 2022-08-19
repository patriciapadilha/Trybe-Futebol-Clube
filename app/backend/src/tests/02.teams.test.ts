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

describe('Teams', () => {
    let chaiHttpResponse: Response;
    it('Endpoint /teams - o avaliador verificará que é possível realizar uma req com sucesso', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams');
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.have.equal(mocks.teams);
    });

    it('Endpoint /teams/:id - o avaliador verificará que é possível realizar uma req com sucesso', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/1');
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.have.equal(mocks.team);
    });
});
