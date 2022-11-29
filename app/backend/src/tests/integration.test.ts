import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Integration tests', () => {

  const userMock = {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    }

  const loginMock = {
    email: 'admin@admin.com',
    password: 'secret_admin', 
  };

  before(() => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(userMock as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('should return the user token', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send(loginMock);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.own.property('token');
  });

});
