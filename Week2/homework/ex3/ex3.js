"use strict";

const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
});

async function main() {
  const execQuery = util.promisify(connection.query.bind(connection));

  const AuthorsAndCollaborators = `
    SELECT A1.author_name AS Author, A2.author_name AS Collaborator
    FROM Authors AS A1 INNER JOIN Authors AS A2
    ON A1.collaborator = A2.author_no;`;

  const AuthorsAndPapers = `
    SELECT A.* , P.paper_title
    FROM Authors AS A LEFT JOIN Authors_Papers AS AP
    ON (A.author_no = AP.authorNo)
    LEFT JOIN Research_Papers AS P
    ON (P.paper_id = AP.paperId);`;

  connection.connect();

  try {
    console.log(await execQuery(AuthorsAndCollaborators));
    console.log(await execQuery(AuthorsAndPapers));
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

main();
