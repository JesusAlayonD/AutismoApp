require("dotenv").config();

const { Test } = require("../models/index");

class TestController {
  async searchByQuery(fields) {
    try {
      return await Test.find(fields);
    } catch (error) {
      return error;
    }
  }

  async create(fields) {
    try {
      return await Test.create(fields);
    } catch (error) {
      return error;
    }
  }

  async update(id, fields) {
    try {
      return await Test.updateOne({ _id: id }, { $set: fields });
    } catch (error) {
      return error;
    }
  }

  async addAnswer(id, fields) {
    try {
      return await Test.updateOne(
        { _id: id },
        { $push: { answers: fields.answer } }
      );
    } catch (error) {
      return error;
    }
  }

  async delete(id) {
    try {
      return await Test.deleteOne({ _id: id });
    } catch (error) {
      return error;
    }
  }
}
module.exports = new TestController();
