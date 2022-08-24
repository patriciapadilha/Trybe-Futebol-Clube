import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Match from '../database/models/Match';

import { app } from '../app';

import { Response } from 'superagent';
import mocks from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {

  describe('Leaderboard getAll', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon.stub(Match, 'findAll').resolves(mocks.allFinishedMatches as any);
    });
  
    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });
  
    it('Endpoint leaderboard/home - o avaliador verificará que é possível realizar uma req com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
  
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.deep.equal(mocks.homeLeaderboard);
    });

    it('Endpoint leaderboard/away - o avaliador verificará que é possível realizar uma req com sucesso', async () => {
        chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
    
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.deep.equal(mocks.awayLeaderboard);
    });

    it('Endpoint leaderboard - o avaliador verificará que é possível realizar uma req com sucesso', async () => {
        chaiHttpResponse = await chai.request(app).get('/leaderboard');
    
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse).to.be.json;
        expect(chaiHttpResponse.body).to.deep.equal(mocks.homeAndAwayLeaderboard);
    });
  });
});