const mySql = require("mysql");
const util = require("util");

const connection = mySql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const connect = util.promisify(connection.connect.bind(connection));
const execQuery = util.promisify(connection.query.bind(connection));

async function transfer(amount, from, to) {
  const autoCommit = `set autocommit = 0;`;
  const transaction = `start transaction;`;
  const rollback = `rollback;`;
  const commit = `commit;`;

  const deduct = `UPDATE account SET balance = balance - ${amount} WHERE account_number = ${from}`;
  const add = `UPDATE account SET balance = balance + ${amount} WHERE account_number = ${to}`;
  const changes = `insert INTO account_changes value(3, ${from}, ${amount},'2033-03-03','test')`;

  connection.connect();
  try {
    await execQuery(autoCommit);
    await execQuery(transaction);
    await execQuery(deduct);
    await execQuery(add);
    await execQuery(changes);
    await execQuery(commit);

    connection.end();

  } catch (err) {
    execQuery(rollback);
        console.error(error);
    connection.end();
  }
}

transfer(1000, 101, 102);
