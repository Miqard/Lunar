// agradb, a mockup database for prototyping app

const fs = require('fs');
const path = require('path');

class AgraDatabase {
  constructor(filename) {
    this.filename = filename;
    this.data = this.loadData();
  }

  loadData() {
    try {
      const data = fs.readFileSync(this.filename, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      // If the file doesn't exist or is invalid JSON, initialize as emptyd
      return {}; 
    }
  }

  saveData() {
    fs.writeFileSync(this.filename, JSON.stringify(this.data, null, 2));
  }

  // CRUD operations

  get(key) {
    this.data = this.loadData();
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
    this.saveData();
  }

  delete(key) {
    delete this.data[key];
    this.saveData();
  }

  getAll() {
    this.data = this.loadData();
    const reversedData = Object.fromEntries(
      Object.entries(this.data).reverse()
    );

    return reversedData;
  }
}

module.exports = AgraDatabase;