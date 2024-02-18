import mongoose from "mongoose";

class MongoContainer {
  constructor({ collection, schema }) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    return await this.collection.find({});
  }

  async getById(id) {
    try {
      return await this.collection.findById(id);
    } catch (error) {
      return error;
    }
  }

  async save(obj) {
    return await this.collection.create(obj);
  }

  async updateById(id, data) {
    try {
      const response = await this.collection.findByIdAndUpdate(id, data, {
        new: true,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const response = await this.collection.findByIdAndDelete(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { MongoContainer };