import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/UserModel';
import { validUser, validLogin, loginWithoutEmail, loginWithoutPassword, wrongLoginEmail, wrongLoginPassword } from './mocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Integration tests', () => {

  before(() => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(validUser as UserModel);
  });

  after(()=>{
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
    const chaiHttpResponse = await chai.request(app).post('/login').send(wrongLoginEmail);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.deep.equal('Incorrect email or password');
  });

  it('should return failed login message when the login have a invalid password', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send(wrongLoginPassword);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.deep.equal('Incorrect email or password');
  });

});
