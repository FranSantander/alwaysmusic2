--
-- PostgreSQL database dump
--

-- Dumped from database version 10.20
-- Dumped by pg_dump version 10.20

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
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: estudiante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estudiante (
    nombre character varying(30),
    rut character varying(13) NOT NULL,
    curso character varying(30),
    nivel integer
);


ALTER TABLE public.estudiante OWNER TO postgres;

--
-- Data for Name: estudiante; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estudiante (nombre, rut, curso, nivel) FROM stdin;
Daniel	18.233.350-6	guitarra	3
Cristian	22.345.987-8	danza	5
Francisca	20.335.784-3	canto	2
Shakira	13.888.260-6	danza	7
Felipe	17.343.562-8	canto	4
Pique	12.432.843-2	bateria	1
\.


--
-- Name: estudiante estudiante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiante
    ADD CONSTRAINT estudiante_pkey PRIMARY KEY (rut);


--
-- PostgreSQL database dump complete
--

