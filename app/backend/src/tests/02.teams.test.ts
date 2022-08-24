import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/Team';

import { app } from '../app';

import { Response } from 'superagent';
import mocks from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team', () => {

  describe('Teams getAll', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon.stub(Team, 'findAll').resolves(mocks.teams as Team[]);
    });
  
    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    });
  
    it('Endpoint /teams - o avaliador verificará que é possível realizar uma req com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');
  
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.deep.equal(mocks.teams);
    });
  });
  
  describe('Teams getById', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon.stub(Team, 'findOne').resolves(mocks.team as Team);
    });
  
    after(() => {
      (Team.findOne as sinon.SinonStub).restore();
    });
  
    it('Endpoint /teams/:id - o avaliador verificará que é possível realizar uma req com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/1');
      
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.deep.equal(mocks.team);
    });
  });
});

