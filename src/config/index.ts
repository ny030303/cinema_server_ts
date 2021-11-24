import * as dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  // databaseURL: process.env.MONGODB_URI,
  mysqlDB: {
    host: process.env.DB_MYSQL_HOST || "localhost",
    port: parseInt(process.env.DB_MYSQL_PORT, 10) || 54000,
    user: process.env.DB_MYSQL_USER || "root",
    password: process.env.DB_MYSQL_PASSPORT,
    database: process.env.DB_MYSQL_DATABASE
  },
  sequealize: {
    production: {
      username: process.env.DB_MYSQL_USER || "root",
      password: process.env.DB_MYSQL_PASSPORT,
      database: process.env.DB_MYSQL_DATABASE,
      options: {
        host: process.env.DB_MYSQL_HOST || "localhost",
        port: parseInt(process.env.DB_MYSQL_PORT, 10) || 54000,
        dialect: 'mysql',
        define: {
          paranoid: true,
          timestamp: true,
          freezeTableName: true,
          underscored: false
        }
      }
    },
    development: {
      username: process.env.DB_MYSQL_USER || "root",
      password: process.env.DB_MYSQL_PASSPORT,
      database: process.env.DB_MYSQL_DATABASE,
      options: {
        host: process.env.DB_MYSQL_HOST,
        port: parseInt(process.env.DB_MYSQL_PORT, 10),
        dialect: 'mysql'
      }
    },
    test: {
      username: process.env.DB_MYSQL_USER || "root",
      password: process.env.DB_MYSQL_PASSPORT,
      database: process.env.DB_MYSQL_DATABASE,
      host: process.env.DB_MYSQL_HOST || "localhost",
      port: parseInt(process.env.DB_MYSQL_PORT, 10) || 54000,
      dialect: 'mysql'
    }
  },
  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,
  /**
     * Agendash config
     */
  agendash: {
    user: 'agendash',
    password: '123456'
  },
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  /**
   * Mailgun email credentials
   */
  emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    apiUsername: process.env.MAILGUN_USERNAME,
    domain: process.env.MAILGUN_DOMAIN
  }
};
