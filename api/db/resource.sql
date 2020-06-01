--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.16
-- Dumped by pg_dump version 12.3

-- Started on 2020-06-01 13:00:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 197 (class 1259 OID 445001)
-- Name: resource; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.resource (
    name character varying(50) NOT NULL,
    label character varying(64) NOT NULL,
    url character varying(200)
);


--
-- TOC entry 2659 (class 0 OID 445001)
-- Dependencies: 197
-- Data for Name: resource; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.resource VALUES ('CleanCoastIndexSriLanka', 'Clean coast index Sri Lanka', '');
INSERT INTO public.resource VALUES ('AmericanRivers', 'American Rivers', 'https://www.americanrivers.org/');
INSERT INTO public.resource VALUES ('WorldCleanupDay', 'World Cleanup Day', 'https://www.worldcleanupday.org/');
INSERT INTO public.resource VALUES ('ShorelineCleanup', 'Shoreline Cleanup', 'https://shorelinecleanup.ca/');
INSERT INTO public.resource VALUES ('LetsDoItRomania', 'LetsDoIt Romania', 'http://letsdoitromania.ro/');
INSERT INTO public.resource VALUES ('Trashout', 'Trashout', 'https://www.trashout.ngo/');
INSERT INTO public.resource VALUES ('Pirika', 'Pirika', '');
INSERT INTO public.resource VALUES ('MarineLitterWatch', 'Marine Litter Watch', 'https://www.eea.europa.eu/themes/water/europes-seas-and-coasts/thematic-assessments/marine-litterwatch');
INSERT INTO public.resource VALUES ('MarineDebrisTracker', 'Marine Debris Tracker', 'http://www.marinedebris.engr.uga.edu/');
INSERT INTO public.resource VALUES ('Ocistimo', 'Ocistimo', 'https://www.ocistimo.si/');
INSERT INTO public.resource VALUES ('NOAA', 'NOAA', 'www.noaa.gov/');
INSERT INTO public.resource VALUES ('OceanConservancy', 'Ocean Conservancy', 'https://oceanconservancy.org/');
INSERT INTO public.resource VALUES ('ZmapujTo', 'ZmapujTo', 'https://www.zmapujto.cz');
INSERT INTO public.resource VALUES ('WorldCleanupApp', 'World cleanup App', 'http://opendata.letsdoitworld.org/');


--
-- TOC entry 2539 (class 2606 OID 445005)
-- Name: resource resource_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resource
    ADD CONSTRAINT resource_pkey PRIMARY KEY (name);


-- Completed on 2020-06-01 13:00:36

--
-- PostgreSQL database dump complete
--

