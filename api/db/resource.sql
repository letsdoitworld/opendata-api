drop table if EXISTS resource;

create table resource (
  name VARCHAR(50) NOT NULL PRIMARY KEY,
  label VARCHAR(64) NOT NULL,
  url VARCHAR(200)
);
insert into resource ( name, label, url) values ('CleanCoastIndexSriLanka','Clean coast index Sri Lanka','');
insert into resource ( name, label, url) values ('AmericanRivers', 'American Rivers','https://www.americanrivers.org/');
insert into resource ( name, label, url) values ('WorldCleanupDay', 'World Cleanup Day', 'https://www.worldcleanupday.org/');
insert into resource ( name, label, url) values ('ShorelineCleanup', 'Shoreline Cleanup','https://shorelinecleanup.ca/');
insert into resource ( name, label, url) values ('LetsDoItRomania','LetsDoIt Romania', 'http://letsdoitromania.ro/');
insert into resource ( name, label, url) values ('Trashout', 'Trashout', 'https://www.trashout.ngo/');
insert into resource ( name, label, url) values ('Pirika','Pirika','');
insert into resource ( name, label, url) values ('MarineLitterWatch', 'Marine Litter Watch', 'https://www.eea.europa.eu/themes/water/europes-seas-and-coasts/thematic-assessments/marine-litterwatch');
insert into resource ( name, label, url) values ('MarineDebrisTracker', 'Marine Debris Tracker',  'http://www.marinedebris.engr.uga.edu/');
insert into resource ( name, label, url) values ('Ocistimo', 'Ocistimo', 'https://www.ocistimo.si/');
insert into resource ( name, label, url) values ('NOAA', 'NOAA', 'www.noaa.gov/');
insert into resource ( name, label, url) values ('OceanConservancy', 'Ocean Conservancy', 'https://oceanconservancy.org/');
