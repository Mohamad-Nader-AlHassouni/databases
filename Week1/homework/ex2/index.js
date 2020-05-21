var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

connection.connect();

const queryObj = {
  countries_with_population_greater_than_8_million:
    "select name From country where Population > 8000000 ",
  countries_that_have_land_in_their_names:
    'select name From country where name like  "%land%"',
  the_cities_with_population_in_between_500000_and_a_million:
    "select name From country where population between 500000 and 1000000",
  all_the_countries_on_the_continent_Europe:
    "select name From country where continent = 'Europe'",
  the_countries_in_the_descending_order_of_their_surface_areas:
    "select name  FROM country ORDER BY SurfaceArea DESC",
  all_the_cities_in_the_Netherlands:
    "SELECT name From city where countryCode = 'NLD'",
  population_of_Rotterdam:
    "SELECT Population from city where name = 'Rotterdam'",
  biggest_10_countries:
    "select name FROM country ORDER BY SurfaceArea DESC limit 10",
  biggest_10_cities: 
    "select name FROM city ORDER BY Population DESC limit 10",
  population_number_of_the_world: 
    "select sum (population) from country",
};

for (let i in queryObj)
  connection.query(queryObj[i], function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(`${i}`, results);
  });

connection.end();

