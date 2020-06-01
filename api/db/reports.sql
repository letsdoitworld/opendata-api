--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.16
-- Dumped by pg_dump version 12.3

-- Started on 2020-06-01 12:56:35

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
-- TOC entry 191 (class 1259 OID 33096)
-- Name: reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    type character varying(30) NOT NULL,
    lat double precision NOT NULL,
    long double precision NOT NULL,
    ts_imported timestamp with time zone NOT NULL,
    source_id character varying(63) NOT NULL,
    country character varying(50),
    admin_area character varying(100),
    admin_sub_area character varying(100),
    locality character varying(100),
    status character varying(20) NOT NULL,
    household boolean,
    construction boolean,
    hazardous boolean,
    bulky boolean,
    litter boolean,
    uncategorized boolean,
    glass boolean,
    plastic boolean,
    textile boolean,
    lumber boolean,
    metal boolean,
    rubber boolean,
    other boolean,
    created_at timestamp with time zone NOT NULL,
    created_by character varying(50) NOT NULL,
    country_code character varying(3),
    last_updated timestamp with time zone
);


--
-- TOC entry 192 (class 1259 OID 33102)
-- Name: reports_new_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reports_new_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2674 (class 0 OID 0)
-- Dependencies: 192
-- Name: reports_new_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reports_new_id_seq OWNED BY public.reports.id;


--
-- TOC entry 2538 (class 2604 OID 141563)
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_new_id_seq'::regclass);


--
-- TOC entry 2543 (class 2606 OID 33138)
-- Name: reports reports_new_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_new_pkey PRIMARY KEY (id);


--
-- TOC entry 2545 (class 2606 OID 488104)
-- Name: reports reports_new_type_source_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_new_type_source_id_key UNIQUE (type, source_id);


--
-- TOC entry 2539 (class 1259 OID 33148)
-- Name: idx_report_type_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_report_type_status ON public.reports USING btree (type, status);


--
-- TOC entry 2540 (class 1259 OID 33820)
-- Name: reports_lower_country; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reports_lower_country ON public.reports USING btree (lower((country)::text));


--
-- TOC entry 2541 (class 1259 OID 33821)
-- Name: reports_lower_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reports_lower_type ON public.reports USING btree (lower((type)::text));


--
-- TOC entry 2546 (class 2606 OID 445024)
-- Name: reports reports_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_type_fkey FOREIGN KEY (type) REFERENCES public.resource(name);


--
-- TOC entry 2547 (class 2606 OID 445029)
-- Name: reports reports_type_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_type_fkey1 FOREIGN KEY (type) REFERENCES public.resource(name);


-- Completed on 2020-06-01 12:56:48

--
-- PostgreSQL database dump complete
--

