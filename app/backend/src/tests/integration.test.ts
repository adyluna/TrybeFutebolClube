import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/UserModel';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { 
  validToken,
  validUser,
  validLogin,
  loginWithoutEmail,
  loginWithoutPassword,
  incorrectLoginEmail,
  incorrectLoginPassword,
  teamsMock,
  validTeam,
  matchesMock,
  inProgressMatches
} from './mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('User Integration Tests', () => {

  beforeEach(() => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(validUser as UserModel);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('should return the user token when the login is valid', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send(validLogin);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.own.property('token');
  });


  it('should return failed login message when the login dont have an email', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send(loginWithoutEmail);

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.deep.equal('All fields must be filled');
  });

  it('should return failed login message when the login dont have a password', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send(loginWithoutPassword);

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.deep.equal('All fields must be filled');
  });

  it('should return failed login message when the login have an invalid email', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send(incorrectLoginEmail);
    
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.deep.equal('Incorrect email or password');
  });

  it('should return failed login message when the login have a invalid password', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send(incorrectLoginPassword);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.deep.equal('Incorrect email or password');
  });

  it('should return the user role if the token is valid', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', validToken);
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'admin' });
  })
});

describe('Teams Integration Tests', () => {

  beforeEach(() => {
    sinon
      .stub(TeamsModel, "findAll")
      .resolves(teamsMock as unknown as TeamsModel[]);

    sinon
    .stub(TeamsModel, "findByPk")
    .resolves(validTeam as unknown as TeamsModel);
  });

  afterEach(()=>{
    (TeamsModel.findAll as sinon.SinonStub).restore();
    (TeamsModel.findByPk as sinon.SinonStub).restore();
  });

  it('should return all registred teams', async () => {
    const chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock);
  });

  it('should return a specific id', async () => {
    const chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(validTeam);
  });
});

describe('Matches Integration Tests', () => {

  beforeEach(() => {
    sinon
      .stub(MatchesModel, "findAll")
      .resolves(matchesMock as unknown as MatchesModel[]);
  });

  afterEach(()=>{
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });

  it('should return all registred matches', async () => {
    const chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock);
  });
});
