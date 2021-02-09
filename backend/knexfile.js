// Update with your config settings.

module.exports = {

  staging: {
    client: 'postgresql',
    connection: {
      database: 'todoapp',
      user:     'shamoon',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'todoapp',
      user:     'shamoon',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
