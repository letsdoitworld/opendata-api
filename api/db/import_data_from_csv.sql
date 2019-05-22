
drop table wcd_csv_import

create table wcd_csv_import (
  id                      text unique ,
  _doctype                text,
  _rev                    text,
  address                 text,
  amount                  text,
  areas_0                 text,
  areas_1                 text,
  areas_2                 text,
  composition             text,
  counter                 integer,
  createdAt               text,
  datasetId               text,
  hashtags                text,
  isIncluded              boolean,
  latitude                double precision,
  longitude               double precision,
  name                    text,
  origin                  text,
  status                  text,
  team                    text,
  updatedAt               text,
  glass                   boolean,
  ceramic_bricks          boolean,
  other                   boolean,
  plastic                 boolean,
  metal                   boolean,
  biological_paper_wood   boolean,
  textiles_shoes_carpets  boolean,
  rubber_tyres            boolean,
  electronics             boolean,
  toxic_chemicals         boolean,
  car_parts_vehicles      boolean,
  household               boolean,
  non_household           boolean,
  construction_demolition boolean
);

insert into resource (name, url, label) values ('WorldCleanupApp', 'https://opendata.letsdoitworld.org/', 'World cleanup App');
commit;

-- should be done from psql command
-- psql96 -h wwp-data.postgres.database.azure.com -U wwp_admin@wwp-data -d trash
-- \copy wcd_csv_import from '/Users/aleksandr/workspace/letsdoit/opendata-api/api/db/ldiw_dataset_import_12.09.18.csv' with delimiter ';' header csv

CREATE RULE "my_table_on_duplicate_ignore" AS ON INSERT TO "reports"
  WHERE EXISTS(SELECT 1 FROM reports
               WHERE (type, source_id)=(NEW.type, NEW.source_id))
DO INSTEAD NOTHING;


insert into reports (id, type, lat, long, ts_imported, source_id, country, admin_area, admin_sub_area, locality, status, household, construction, hazardous, bulky, litter,
                     uncategorized, glass, plastic, textile, lumber, metal, rubber, other, created_at, created_by, country_code, last_updated)
select
       nextval('reports_new_id_seq'),
       'WorldCleanupApp',
       wcd_csv_import.latitude,
       wcd_csv_import.longitude,
       current_date,
       wcd_csv_import.id,
       null,
       null,
       null,
       null,
       case when wcd_csv_import.status = 'cleaned' then 'CLEANED' else 'REPORTED' end,
       wcd_csv_import.household,
       wcd_csv_import.construction_demolition,
       case when wcd_csv_import.status = 'threat' then true else false end, --hazardous
       wcd_csv_import.construction_demolition, -- bulky
       false,
       wcd_csv_import.other,
       wcd_csv_import.glass,
       wcd_csv_import.plastic,
       wcd_csv_import.textiles_shoes_carpets,
       wcd_csv_import.biological_paper_wood, -- lumber
       wcd_csv_import.metal,
       wcd_csv_import.rubber_tyres,
       wcd_csv_import.other,
       to_timestamp(wcd_csv_import.createdAt, 'DD.MM.YYYY HH24:MI'),
       'Importer', -- created_by
       wcd_csv_import.areas_0,
       current_date
from wcd_csv_import where id not in (select source_id from reports) and type

DROP RULE "my_table_on_duplicate_ignore" ON "reports";


UPDATE country_population set reports_qnt = (SELECT COUNT (*) FROM reports WHERE reports.country_code = country_population.country_code)



select count(*) from reports

delete from wcd_csv_import where id = '060ac4cc-bd94-407e-b087-0742ff1e18c5'

select count(*) from reports where source_id in (select source_id from wcd_csv_import);



select count(*) from wcd_csv_import