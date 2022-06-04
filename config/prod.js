const atlas = require('./password')

module.exports = {
  dbURL: `mongodb+srv://UpBeat:${atlas.password}@cluster0.oyhrofd.mongodb.net/?retryWrites=true&w=majority`,
}
