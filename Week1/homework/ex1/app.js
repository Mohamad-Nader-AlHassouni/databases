var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
});

connection.query("DROP DATABASE IF EXISTS meetup", function (err, result) {
    if (err) throw err;
    console.log("Database deleted");
});

connection.query("CREATE DATABASE meetup", function (err, result) {
    if (err) throw err;
    console.log("Database created");
});

connection.query("USE meetup", function (err, result) {
    if (err) throw err;
    console.log("Database connected");
});

const create_tables = [
  "create table Invitee (invitee_no int, invitee_name varchar(50),  invited_by varchar(50))",
  "create table Room (room_no int, room_name varchar(50),  floor_number int)",
  "create table Meeting (meeting_no int, meeting_title varchar(50),  starting_time TIME (0) , ending_time TIME (0) , room_no int )",
];

const insert_queries = [
  //Invitee table
  "insert into Invitee values (1, 'Fede', 'Wouter')",
  "insert into Invitee values (2, 'Tjebbe', 'Wouter')",
  "insert into Invitee values (3, 'Noer', 'Wouter')",
  "insert into Invitee values (4, 'Unmesh', 'Wouter')",
  "insert into Invitee values (5, 'Igor', 'Wouter')",
  //Room table
  "insert into Room values (1, 'Amsterdam', 11)",
  "insert into Room values (2, 'The Hague', 12)",
  "insert into Room values (3, 'Rotterdam', 13)",
  "insert into Room values (4, 'Leiden', 14)",
  "insert into Room values (5, 'Utrecht', 15)",
  //Meeting table
  "insert into Meeting values (1, 'Class 27', '13:00' , '14:00', 1)",
  "insert into Meeting values (2, 'Class 26', '15:00' , '16:00', 2)",
  "insert into Meeting values (3, 'Class 25', '13:00' , '14:00', 3)",
  "insert into Meeting values (4, 'Class 24', '13:00' , '14:00', 4)",
  "insert into Meeting values (5, 'Class 23', '17:00' , '18:00', 5)",
];

for (let i in create_tables) {
  connection.query(create_tables[i], function (error, results) {
    if (error) {
      throw error;
    }
    console.log("Table is created");
});
}

for (let i in insert_queries) {
  connection.query(insert_queries[i], function (error, results) {
    if (error) {
      throw error;
    }
    console.log("Value is inserted");
  });
}

connection.end();
