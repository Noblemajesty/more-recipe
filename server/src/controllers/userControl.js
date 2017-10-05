import jwt from 'jsonwebtoken';
import validate from 'validator';
import models from '../models';
// import validateSignup from '../functions/validateSignup';
// import validateLogin from '../functions/validateLogin';
import * as passwordHelper from '../functions/encrypt';


const helper = new passwordHelper.default();
const user = models.User;
const secret = process.env.SECRET;
/**
 * 
 * 
 * @export
 * @class User
 */
export default class User {
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof User
   */
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof User
   */
  static createUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const confirmPassword = req.body.confirmPassword;

    if (!firstname) {
      return res.status(400).json({ message: 'First name field is empty' });
    }
    if (!lastname) {
      return res.status(400).json({ message: 'Lastname field is empty' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password field is empty' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Passwords should be at leats 6 characters'});
    }
    if (!confirmPassword) {
      return res.status(400).json({ message: 'confirmPassword field is empty' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords don\'t match' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email field is empty' });
    }
    if (typeof email !== 'string') {
      return res.status(400).json({ message: 'Invalid Email' });
    }
    
    user.findOne({
      where: { email: req.body.email }
    })
      .catch(() => res.status(500)
        .json({ message: 'A server error ocurred, Please try again later' }))
      .then((existing) => {
        if (!existing) {
          console.log(req.body.password);
          const Password = helper.hashPassword(req.body.password);
          user.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: Password
          }).then((newUser) => {
            const token = jwt.sign({
              id: newUser.id,
              firstname: newUser.firstname,
              lastname: newUser.lastname,
              email: newUser.email,
              notify: newUser.notify
            }, secret, { expiresIn: 86400 });
              // send user a welcome email
            return res.status(201)
              .json({
                status: 'success',
                token,
                message: 'Account created'
              });
          }).catch(error => res.status(400)
            .json({
              status: 'fail',
              message: error.message
            }));
        } else {
          return res.status(403)
            .json({
              status: 'Fail',
              message: 'User with email already exists'
            });
        }
      });
  }

  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof User
   */
  static userLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (!password) {
      return res.status(400).json({ message: 'Password field is empty' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email field is empty' });
    }
    user.findOne({
      where: { email: req.body.email }
    })
      .then((foundUser) => {
        if (foundUser) {
          const result = helper.decrypt(req.body.password, foundUser.dataValues.password);
          if (result) {
            const token = jwt.sign({
              id: foundUser.dataValues.id,
              firstname: foundUser.dataValues.firstname,
              lastname: foundUser.dataValues.lastname,
              email: foundUser.dataValues.email
            }, secret, { expiresIn: 86400 });
            res.status(200)
              .json({
                status: 'success',
                token,
                message: 'You\'re now logged in'
              });
          } else {
            res.status(401)
              .json({
                status: 'fail',
                message: 'Email and password don\'t match'
              });
          }
        } else {
          res.status(401)
            .json({
              status: 'fail',
              message: 'Email and password don\'t match'
            });
        }
      });
  }
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof User
   */
  /* delete(req, res) {
    const password = req.body.password;
    user.findOne({
      where: {
        id: req.decoded.id
      }
    })
      .then((foundUser) => {
        if (foundUser) {
          const result = helper.decrypt(password, foundUser.dataValues.password);
          if (result) {
            user.destroy({
              where: {
                id: req.decoded.id
              }
            })
              .then(() => res.status(200)
                .json({ message: 'Your account has been deleted successfully.' }))
              .catch(() => {
                res.status(500)
                  .json({ message: 'Unable to delete account now, please try again later' });
              });
          }
        }
      });
    return this;
  } */
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @memberof User
   */
  static updateUser(req, res) {
    // const firstname = req.body.firstname;
    // const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (!validate.isEmail(email)) {
      return res.status(400)
        .json({ message: 'Email is not valid' });
    }
    if (password !== confirmPassword) {
      return res.status(400)
        .json({
          status: 'Fail',
          message: 'Passwords don\'t match'
        });
    }
    user.findOne({
      where: {
        id: req.decoded.id
      }
    })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(401)
            .json({ message: 'Unauthorized!' });
        }
        if (foundUser) {
          const Update = {
            email: email.toLowerCase() || foundUser.dataValues.email,
            password: foundUser.dataValues.password || helper.hashPassword(password)
          };
          foundUser.update(Update)
            .then(() => res.status(200)
              .json({ message: 'Profile update successful' }))
            .catch((error) => {
              console.log(error);
              return res.status(500)
                .json({ message: 'Internal server error. Unable to update profile' });
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500)
          .json({ message: 'Internal server error. Unable to update profile' });
      });
  }
}