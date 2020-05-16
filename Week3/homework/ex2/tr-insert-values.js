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

async function main() {
  const tables = {
    account: [
      { account_number: "101", balance: 12000 },
      { account_number: "102", balance: 7000 },
      { account_number: "103", balance: 5000 },
    ],
    account_changes: [
      {
        change_number: 1,
        account_number: "101",
        amount: 3000,
        changed_date: "2011-01-01",
        remark: "May Salary",
      },
      {
        change_number: 2,
        account_number: "102",
        amount: -1200,
        changed_date: "2022-02-02",
        remark: "New Tv",
      },
    ],
  };

  try {
    await connect();
    await Promise.all(
      Object.keys(tables).map((entity) => {
        tables[entity].map(async (entityInstance) => {
          await executeQuery(`INSERT INTO ${entity} SET ?`, entityInstance);
        });
      })
    );

    connection.end();
  } catch (error) {
    console.log(error);
    connection.end();
  }
}

main();
