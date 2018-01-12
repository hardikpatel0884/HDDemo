/**
 * auth.js
 * expose config directly to applciation using module.exports
 * CreatedAt: 06/01/2018 08:32 PM
 * Author: Hardik Patel
 */

module.exports = {
    googleAuth: {
        clientID: '777986656305-m5podj3bvou2g9i9hq9ad89jk1ermvu9.apps.googleusercontent.com',
        clientSecret: 'fzK9G1eLMRO1YaHsHD2jeE1J',
        callbackURL: 'https://localhost:3000/auth/google/callback'
    }

    /*
    * googleAuth: {
        clientID: '777986656305-cd4s9dnhtjr7l4vqcq6e0t0bjj1m2dbf.apps.googleusercontent.com',
        clientSecret: '5DUhRjhLob44-ctYrTtvF6rC',
        callbackURL: 'localhost:3000/auth/google/callback'
    }
    * */
}