const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

const connect = util.promisify(connection.connect.bind(connection));
const executeQuery = util.promisify(connection.query.bind(connection));

async function Main() {
  const createAccountTable = `CREATE TABLE IF NOT EXISTS account 
     (account_number INT PRIMARY KEY,
     balance INT)`;
  const createAccountChangesTable = `CREATE TABLE IF NOT EXISTS account_changes
     (change_number INT PRIMARY KEY,
     account_number INT,
     amount INT,
     changed_date DATE, 
     remark VARCHAR(50), 
     CONSTRAINT FK_Account_Number FOREIGN KEY (account_number) REFERENCES account(account_number))`;

  try {
    await connect();
    await Promise.all[
      (executeQuery(createAccountTable),
      executeQuery(createAccountChangesTable))
    ];

    connection.end();
  } catch (error) {
    console.error(error);
    connection.end();
  }
}

Main();
