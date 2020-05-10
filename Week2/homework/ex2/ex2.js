const mysql = require("mysql");
const util = require("util");
const fs = require("fs");

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
};

const createResearchPapersTable = `
  CREATE TABLE IF NOT EXISTS Research_Papers (
    paper_id INT PRIMARY KEY,
    paper_title VARCHAR(50),
    conference VARCHAR(50),
    publish_date DATE
  );`;

const createAuthorsPapersTable = `
  CREATE TABLE IF NOT EXISTS Authors_Papers (
    authorNo INT,
    paperId INT,
    CONSTRAINT FK_Author FOREIGN KEY (authorNo) REFERENCES Authors(author_no),
    CONSTRAINT FK_Paper FOREIGN KEY (paperId) REFERENCES Research_Papers(paper_id),
    CONSTRAINT PK_Author_Paper PRIMARY KEY (authorNo, paperId)
  );`;

  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));
  const readFile = util.promisify(fs.readFile);


async function main() {


  try {
    await execQuery(createResearchPapersTable);
    await execQuery(createAuthorsPapersTable);

    const authorsData = await readFile(__dirname + "/authors.json", "utf8");
    const authors = await JSON.parse(authorsData);
    const promises1 = authors.map((author) =>
      execQuery("INSERT INTO Authors SET ?", author)
    );

    const paperData = await readFile(
      __dirname + "/researchPapers.json",
      "utf8"
    );
    const papers = await JSON.parse(paperData);
    const promises2 = papers.map((paper) =>
      execQuery("INSERT INTO Research_Papers SET ?", paper)
    );

    const authorPaperData = await readFile(
      __dirname + "/authorPaper.json",
      "utf8"
    );
    const authorPapers = await JSON.parse(authorPaperData);
    const promises3 = authorPapers.map((authorPaper) =>
      execQuery("INSERT INTO Authors_Papers SET ?", authorPaper)
    );

    const collaboratorsData = await readFile(
      __dirname + "/collaborators.json",
      "utf8"
    );
    const collaborators = await JSON.parse(collaboratorsData);

    const promises4 = collaborators.map((collaborator) => {
      execQuery(`UPDATE Authors 
        SET collaborator = ${collaborator.collaborator}
        WHERE author_no = ${collaborator.author_no}`);
    });

    await Promise.all(promises1, promises2, promises3, promises4);
    connection.end();
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
}

main();
