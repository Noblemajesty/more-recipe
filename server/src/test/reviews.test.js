import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../app';
import models from '../models';
import fakeUsers from './faker/users.faker';
import fakeReviews from './faker/reviews.faker';

// const helper = new passwordHelper.default();
const expect = chai.expect;
chai.use(chaiHttp);
let userToken;

describe('Test for', () => {
  after((done) => {
    models.Review.destroy({ where: { id: { $notIn: [1] } } });
    done();
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(fakeUsers.validLogin)
      .end((err, res) => {
        userToken = res.body.Token;
        done();
      });
  });

  describe('Review endpoints should', () => {
    it('not allow unauthenticated users add reviews to recipes', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/review')
        .send(fakeReviews.validReview)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('not allow users add reviews to recipes that don`t exist', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/100/review')
        .set('x-access-token', userToken)
        .send(fakeReviews.validReview)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('not allow users add empty review content', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/100/review')
        .set('x-access-token', userToken)
        .send(fakeReviews.invalidReview)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('allow authenticated users with valid review content add reviews to recipes', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/review')
        .set('x-access-token', userToken)
        .send(fakeReviews.validReview)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });
});