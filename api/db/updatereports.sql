ALTER TABLE reports RENAME COLUMN ts TO ts_imported;
ALTER TABLE reports ADD COLUMN last_updated TIMESTAMP WITH TIME ZONE;
ALTER TABLE reports ADD FOREIGN KEY (type) REFERENCES resource(name);
ALTER TABLE country_population  ADD COLUMN reports_qnt int;


