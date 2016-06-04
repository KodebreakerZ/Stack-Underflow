module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'stackdb_db'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }
}