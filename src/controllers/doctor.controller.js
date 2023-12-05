require("dotenv").config();

const { Doctor } = require("../models/index");
const JSCrypto = require("../utils/jscrypto");

class DoctorController {
  async searchByQuery(fields) {
    try {
      fields.hasOwnProperty("_id") &&
        (fields._id = new mongoose.Types.ObjectId(fields._id));
      return await Doctor.find(fields);
    } catch (error) {
      return error;
    }
  }

  async signin(fields) {
    let response = {};
    fields.password = await JSCrypto.encrypt(fields.password);
    try {
      let user = await Doctor.findOne({
        email: fields.email,
        is_active: true,
      });
      if (user.id) {
        console.log(JSCrypto.decrypt(user.password));
        if (fields.password === user.password) {
          delete user._doc.password;
          return user;
        }
      }
      return response;
    } catch (err) {
      return err;
    }
  }

  async create(fields) {
    try {
      let user = await this.searchByQuery({ email: fields.email });
      if (user.length == 0) {
        user = await Doctor.create(fields);
      } else {
        user = {};
      }
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id, fields) {
    try {
      return await Doctor.updateOne({ _id: id }, { $set: fields });
    } catch (error) {
      return error;
    }
  }

  async delete(id) {
    try {
      return await Doctor.deleteOne({ _id: id });
    } catch (error) {
      return error;
    }
  }
}
module.exports = new DoctorController();
