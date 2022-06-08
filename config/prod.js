let atlas
if (process.env.NODE_ENV !== 'production') {
  let atlas = require('./password')
}else atlas = {password:process.env.PASSWORD}

module.exports = {
  dbURL: `mongodb+srv://UpBeat:${atlas.password}@cluster0.wlxkri6.mongodb.net/?retryWrites=true&w=majority`,
}
