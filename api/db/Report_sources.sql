--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.16
-- Dumped by pg_dump version 12.3

-- Started on 2020-06-01 12:53:04

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
-- TOC entry 190 (class 1259 OID 33090)
-- Name: report_sources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.report_sources (
    type character varying(30) NOT NULL,
    name character varying(200),
    url character varying(512),
    logo character varying(512)
);


--
-- TOC entry 2659 (class 0 OID 33090)
-- Dependencies: 190
-- Data for Name: report_sources; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.report_sources VALUES ('MarineLitterWatch', 'Marine LitterWatch', 'https://www.eea.europa.eu/themes/coast_sea/marine-litterwatch', NULL);
INSERT INTO public.report_sources VALUES ('WorldCleanupDay', 'World Clean Up Day', 'https://www.letsdoitworld.org/ ', NULL);
INSERT INTO public.report_sources VALUES ('MarineDebrisTracker', 'Marine Debris Tracker', 'http://www.marinedebris.engr.uga.edu/', 'marinedebristracker.png');
INSERT INTO public.report_sources VALUES ('LetsDoItRomania', 'Let''s Do It, Romania!', 'http://letsdoitromania.ro/', 'letsdoit-logo.svg');
INSERT INTO public.report_sources VALUES ('Trashout', 'TrashOut', 'https://www.trashout.ngo/', 'trashout.png');
INSERT INTO public.report_sources VALUES ('Ocistimo', 'Očistimo', 'http://www.ocistimo.si/', 'ocistimo.png');
INSERT INTO public.report_sources VALUES ('Pirika', 'Pirika, Inc', 'http://en.corp.pirika.org/', 'pirika.jpg');
INSERT INTO public.report_sources VALUES ('OceanConservancy', 'Ocean Conservancy', 'https://oceanconservancy.org/', 'oceansconservancy.jpg');
INSERT INTO public.report_sources VALUES ('ZmapujTo', 'ZmapujTo', 'https://www.zmapujto.cz', NULL);


--
-- TOC entry 2539 (class 2606 OID 33136)
-- Name: report_sources report_sources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.report_sources
    ADD CONSTRAINT report_sources_pkey PRIMARY KEY (type);


-- Completed on 2020-06-01 12:53:18

--
-- PostgreSQL database dump complete
--

