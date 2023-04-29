require("dotenv").config();
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");
const datetime = require("../utils/datetime");

const { User, Token } = require("../models/index");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

class UserController {
  async signin(fields) {
    console.log("---");
    console.log(fields);
    console.log("---");
    let response = {};
    try {
      const profile = await User.findOne({
        email: fields.email,
        is_active: true,
      });
      console.log(profile);
      if (profile.id) {
        if (fields.password === profile.password) {
          let create = new Date();
          let expiration = await datetime.addHoursToDate(
            create,
            JWT_EXPIRES_IN.replace("h", "")
          );

          const info = {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            last_name: profile.last_name,
            profile_img: profile.profile_img,
          };

          const token = jwt.sign(info, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
          });

          const refresh = randtoken.uid(256);

          const session = await Token.create({
            refresh: refresh,
            token: token,
            user: profile.id,
            create: create,
            expiration: expiration,
          });

          response = {
            info,
            session,
          };
        }
      }
      return response;
    } catch (err) {
      console.log(err.message);
      return err;
    }
  }
}

module.exports = new UserController();
