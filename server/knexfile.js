require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'taskuser',
      password: process.env.DB_PASSWORD || 'taskpass',
      database: process.env.DB_NAME || 'taskdb'
    },
    migrations: {
      directory: __dirname + '/migrations'
    }
  }
};
