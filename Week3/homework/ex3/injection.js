//Exercise 3 : SQL injection

function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ${code}`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}


// ----------------------------------------------------------------------------------------


// 1-Give an example of a value that can be passed as name and code that would take advantage of SQL-injection and (fetch all the records in the database)
// you can fetch all the data in the database using one of this 2 ways
// name =>  Winterfell OR 1=1; show tables; 
// code => 00000 OR 1=1; show tables;

// ----------------------------------------------------------------------------------------

// 2-Rewrite the function so that it is no longer vulnerable to SQL injection

function getPopulationModified(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ?? WHERE Name = ? and code = ?`,
    [Country, name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
