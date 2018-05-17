drop table if EXISTS resource;

create table resource (
  resourceID int NOT NULL,
  name VARCHAR(50) NOT NULL PRIMARY KEY,
  url VARCHAR(200)
);
insert into resource (resourceID, name, url) values (1,'CleanCoastIndexSriLanka','');
insert into resource (resourceID, name, url) values (2,'AmericanRivers','https://www.americanrivers.org/');
insert into resource (resourceID, name, url) values (1,'WorldCleanupDay','https://www.worldcleanupday.org/');
insert into resource (resourceID, name, url) values (1,'ShorelineCleanup','https://shorelinecleanup.ca/');
insert into resource (resourceID, name, url) values (1,'LetsDoItRomania','http://letsdoitromania.ro/');
insert into resource (resourceID, name, url) values (1,'Trashout','https://www.trashout.ngo/');
insert into resource (resourceID, name, url) values (1,'Pirika','');
insert into resource (resourceID, name, url) values (1,'MarineLitterWatch','https://www.eea.europa.eu/themes/water/europes-seas-and-coasts/thematic-assessments/marine-litterwatch');
insert into resource (resourceID, name, url) values (1,'MarineDebrisTracker','http://www.marinedebris.engr.uga.edu/');
insert into resource (resourceID, name, url) values (1,'Ocistimo','https://www.ocistimo.si/');
insert into resource (resourceID, name, url) values (1,'NOAA','www.noaa.gov/');
insert into resource (resourceID, name, url) values (1,'OceanConservancy','https://oceanconservancy.org/');