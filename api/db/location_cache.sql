--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.16
-- Dumped by pg_dump version 12.3

-- Started on 2020-06-01 12:58:37

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
-- TOC entry 194 (class 1259 OID 205901)
-- Name: location_cache; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.location_cache (
    id integer NOT NULL,
    latitude character varying(30) NOT NULL,
    longitude character varying(30) NOT NULL,
    country character varying(50),
    state character varying(100),
    county character varying(100),
    city character varying(100),
    town character varying(100),
    hamlet character varying(100),
    village character varying(100),
    country_code character varying(3)
);


--
-- TOC entry 195 (class 1259 OID 205907)
-- Name: location_cache_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.location_cache_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2668 (class 0 OID 0)
-- Dependencies: 195
-- Name: location_cache_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.location_cache_id_seq OWNED BY public.location_cache.id;


--
-- TOC entry 2538 (class 2604 OID 205916)
-- Name: location_cache id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location_cache ALTER COLUMN id SET DEFAULT nextval('public.location_cache_id_seq'::regclass);


--
-- TOC entry 2541 (class 2606 OID 205918)
-- Name: location_cache location_cache_latitude_longitude_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.location_cache
    ADD CONSTRAINT location_cache_latitude_longitude_key UNIQUE (latitude, longitude);


--
-- TOC entry 2539 (class 1259 OID 205919)
-- Name: idx_location_cache; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_location_cache ON public.location_cache USING btree (latitude, longitude);


-- Completed on 2020-06-01 12:58:49

--
-- PostgreSQL database dump complete
--

