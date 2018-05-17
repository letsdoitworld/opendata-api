drop table if EXISTS country_resource;

create table country_resource (
  country_code VARCHAR(2) NOT NULL,
  resourceName VARCHAR(50) NOT NULL,
   CONSTRAINT PK_countryResource PRIMARY KEY
    (
        country_code,
        resourceName
    ),
    FOREIGN KEY (country_code) REFERENCES country_population (country_code),
    FOREIGN KEY (resourceName) REFERENCES resource (name)
);
