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

  const AllPapersAndNumberOfAuthors = `
    SELECT RP.paper_title, COUNT(AP.authorNo) AS Num_Of_Authors 
    FROM Research_Papers AS RP 
    LEFT JOIN Authors_Papers AS AP 
    ON RP.paper_id = AP.paperId 
    GROUP BY RP.paper_id `;

  const SumOfPapersByFemales = `
    SELECT COUNT(RP.paper_id) AS Papers_Num_By_Female
    FROM Authors_Papers AS AP 
    LEFT JOIN Research_Papers AS RP
    ON AP.paperId = RP.paper_id 
    LEFT JOIN Authors A 
    ON A.author_no = AP.authorNo 
    WHERE A.gender='f'`;

  const AverageHindexPerUniversity = `
    SELECT university, AVG(h_index) AS H_index_Average
     FROM Authors GROUP BY (university)`;

  const SumOfPapersPerUniversity = `
    SELECT A.university, COUNT(DISTINCT AP.paperId) AS Sum_Of_Papers
    FROM Authors_Papers AS AP 
    JOIN Authors AS A
    ON AP.authorNo = A.author_no
    GROUP BY(A.university)`;

  const MinimumMaximumHindexPerUniversity = `
    SELECT university, MIN(h_index), MAX(h_index)
    FROM Authors
    GROUP BY university`;

  connection.connect();

  try {
    console.log(await execQuery(AllPapersAndNumberOfAuthors));
    console.log(await execQuery(SumOfPapersByFemales));
    console.log(await execQuery(AverageHindexPerUniversity));
    console.log(await execQuery(SumOfPapersPerUniversity));
    console.log(await execQuery(MinimumMaximumHindexPerUniversity));
  } catch (error) {
    console.error(error);
    connection.end();
  }

  connection.end();
}

main();
