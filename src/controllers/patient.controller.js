require("dotenv").config();

const { Patient } = require("../models/index");

class PatientController {
  async searchByQuery(fields) {
    try {
      fields.hasOwnProperty("_id") &&
        (fields._id = new mongoose.Types.ObjectId(fields._id));
      return await Patient.find(fields);
    } catch (error) {
      return error;
    }
  }

  async signin(fields) {
    let response = {};
    try {
      let user = await Patient.findOne({
        email: fields.email,
        is_active: true,
      });
      if (user.id) {
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
        user = await Patient.create(fields);
      } else {
        user = user[0];
      }
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id, fields) {
    try {
      return await Patient.updateOne({ _id: id }, { $set: fields });
    } catch (error) {
      return error;
    }
  }

  async setDoctor(id, idD) {
    try {
      return await Patient.updateOne({ _id: id }, { $set: { doctor: idD } });
    } catch (error) {
      return error;
    }
  }

  async setTest(id, idT) {
    try {
      return await Patient.updateOne({ _id: id }, { $set: { test: idT } });
    } catch (error) {
      return error;
    }
  }

  async delete(id) {
    try {
      return await Patient.deleteOne({ _id: id });
    } catch (error) {
      return error;
    }
  }
}
module.exports = new PatientController();
