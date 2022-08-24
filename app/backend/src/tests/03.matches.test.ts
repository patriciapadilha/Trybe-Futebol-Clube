import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/Match';

import { Response } from 'superagent';

import mocks from './mocks';
import TokenGenerator from '../utils/tokenGenerator';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {

  describe('Matches getAll', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon.stub(Match, 'findAll').resolves(mocks.matches as any);
    });
  
    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Endpoint /matches - o avaliador verificará que é possível realizar uma req get com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.deep.equal(mocks.matches);
    });
  })

  describe('Matches create - sucess', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon.stub(Match, 'create').resolves(mocks.resCreateNewMatch as Match);
    });
  
    after(() => {
      (Match.create as sinon.SinonStub).restore();
    });

    const newToken = TokenGenerator.generateToken(mocks.user);

    it('Endpoint /matches - o avaliador verificará que é possível realizar uma req post com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).post('/matches').send(mocks.bodyCreateNewMatch).set({ authorization: newToken });
      expect(chaiHttpResponse).to.have.headers;
      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.deep.equal(mocks.resCreateNewMatch);
    });
  });

  describe('Matches create - Error - equal teams)', () => {
    let chaiHttpResponse: Response;
    const errorMsg = { message: "It is not possible to create a match with two equal teams" };
    before(async () => {
      sinon.stub(Match, 'create').resolves(errorMsg as any);
    });
  
    after(() => {
      (Match.create as sinon.SinonStub).restore();
    });

    const newToken = TokenGenerator.generateToken(mocks.user);

    it('Endpoint /matches - o avaliador verificará que é possível realizar uma req post com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).post('/matches').send(mocks.bodyCreateNewMatchErrorEqual).set({ authorization: newToken });
      expect(chaiHttpResponse).to.have.headers;
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.deep.equal(errorMsg);
    });
  });

  describe('Matches create - Error - team id not exist)', () => {
    let chaiHttpResponse: Response;
    const errorMsg = { message: "There is no team with such id!" };
    before(async () => {
      sinon.stub(Match, 'create').resolves(errorMsg as any);
    });
  
    after(() => {
      (Match.create as sinon.SinonStub).restore();
    });

    const newToken = TokenGenerator.generateToken(mocks.user);

    it('Endpoint /matches - o avaliador verificará que é possível realizar uma req post com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).post('/matches').send(mocks.bodyCreateNewMatchErrorNotExist).set({ authorization: newToken });
      expect(chaiHttpResponse).to.have.headers;
      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.deep.equal(errorMsg);
    });
  });

  describe('Matches update - finished', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon.stub(Match, 'update').resolves({ message: "Finished" } as any);
    });
  
    after(() => {
      (Match.update as sinon.SinonStub).restore();
    });

    it('Endpoint /matches/:id/finish - o avaliador verificará que é possível realizar uma req patch com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.deep.equal({ message: "Finished" });
    });
  });

  describe('Matches update', () => {
    let chaiHttpResponse: Response;
    before(async () => {
      sinon.stub(Match, 'update').resolves({ message: "Updated" } as any);
    });
  
    after(() => {
      (Match.update as sinon.SinonStub).restore();
    });

    it('Endpoint /matches/:id - o avaliador verificará que é possível realizar uma req patch com sucesso', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/1').send(mocks.bodyUpdateMatch);
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse).to.be.json;
      expect(chaiHttpResponse.body).to.deep.equal({ message: "Updated" });
    });
  });
});
