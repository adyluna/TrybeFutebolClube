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

describe('Seu teste', () => {

  let chaiHttpResponse: Response;

  const userMock = {
    username: 'Baleno',
    role: 'user',
    email: 'baleno@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
  };

  before(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(userMock as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('should return the user information', async () => {
    const chaiHttpResponse = await chai.request(app).post('/user').send(userMock);

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(userMock);
  });

});
