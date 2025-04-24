import mariadb from 'mariadb';

export const pool = mariadb.createPool({
  host: 'db1.circlelink.eu',
  user: 'backend',
  password: 'n*mKEzv9xdHe&5^};"?24#+=M<uU8CNQaA3S_FbJGT-',
  database: 'admin-backend',
  connectionLimit: 5
});
