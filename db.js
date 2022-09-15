const Pool = require('pg').Pool;
const pool = new Pool({
    connectionString: "postgres://zuccgakvpdorzo:03d1557cd482976a8223255bb552b433c16af65f7e1d1ac862dbd40aa1e54f56@ec2-52-73-184-24.compute-1.amazonaws.com:5432/db0uoa1gtg1n6s",
    ssl: {
    rejectUnauthorized: false
    }
})

module.exports = pool;;