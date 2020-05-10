const mysql = require("mysql");
const util = require("util");

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
};

const createAuthorsTable = `
  CREATE TABLE IF NOT EXISTS Authors (
    author_no INT PRIMARY KEY,
    author_name VARCHAR(50),
    university VARCHAR(50),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('m', 'f')
  );`;

const createCollaboratorColumn = `
   ALTER TABLE Authors
   ADD COLUMN Collaborator INT,
   ADD CONSTRAINT FK_Authors FOREIGN KEY(Collaborator) 
   REFERENCES Authors(author_no)
  ;`;

async function main() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(createAuthorsTable);
    await execQuery(createCollaboratorColumn);

    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

main();
