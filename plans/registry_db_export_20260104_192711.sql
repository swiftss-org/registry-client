--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3 (Debian 12.3-1.pgdg100+1)
-- Dumped by pg_dump version 12.3 (Debian 12.3-1.pgdg100+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO admin;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO admin;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO admin;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO admin;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO admin;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO admin;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO admin;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO admin;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO admin;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO admin;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO admin;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO admin;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: authtoken_token; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.authtoken_token (
    key character varying(40) NOT NULL,
    created timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.authtoken_token OWNER TO admin;

--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO admin;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO admin;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO admin;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO admin;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO admin;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO admin;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO admin;

--
-- Name: django_site; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.django_site (
    id integer NOT NULL,
    domain character varying(100) NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.django_site OWNER TO admin;

--
-- Name: django_site_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.django_site_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_site_id_seq OWNER TO admin;

--
-- Name: django_site_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.django_site_id_seq OWNED BY public.django_site.id;


--
-- Name: registry_announcement; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_announcement (
    id integer NOT NULL,
    announcement_text text NOT NULL,
    display_from timestamp with time zone,
    display_until timestamp with time zone,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.registry_announcement OWNER TO admin;

--
-- Name: registry_announcement_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_announcement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_announcement_id_seq OWNER TO admin;

--
-- Name: registry_announcement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_announcement_id_seq OWNED BY public.registry_announcement.id;


--
-- Name: registry_discharge; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_discharge (
    id integer NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    date date NOT NULL,
    aware_of_mesh boolean NOT NULL,
    infection character varying(64),
    episode_id integer NOT NULL,
    discharge_duration integer,
    comments text,
    CONSTRAINT registry_discharge_discharge_duration_00ed46d0_check CHECK ((discharge_duration >= 0))
);


ALTER TABLE public.registry_discharge OWNER TO admin;

--
-- Name: registry_discharge_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_discharge_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_discharge_id_seq OWNER TO admin;

--
-- Name: registry_discharge_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_discharge_id_seq OWNED BY public.registry_discharge.id;


--
-- Name: registry_episode; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_episode (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    surgery_date date,
    episode_type character varying(128) NOT NULL,
    cepod character varying(16) NOT NULL,
    side character varying(16) NOT NULL,
    occurence character varying(16) NOT NULL,
    type character varying(16) NOT NULL,
    complexity character varying(16) NOT NULL,
    mesh_type character varying(16) NOT NULL,
    anaesthetic_type character varying(16) NOT NULL,
    diathermy_used boolean NOT NULL,
    patient_hospital_mapping_id integer NOT NULL,
    size character varying(16) NOT NULL,
    antibiotic_type character varying(128),
    antibiotic_used boolean NOT NULL,
    comments text
);


ALTER TABLE public.registry_episode OWNER TO admin;

--
-- Name: registry_episode_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_episode_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_episode_id_seq OWNER TO admin;

--
-- Name: registry_episode_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_episode_id_seq OWNED BY public.registry_episode.id;


--
-- Name: registry_episode_surgeons; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_episode_surgeons (
    id integer NOT NULL,
    episode_id integer NOT NULL,
    medicalpersonnel_id integer NOT NULL
);


ALTER TABLE public.registry_episode_surgeons OWNER TO admin;

--
-- Name: registry_episode_surgeons_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_episode_surgeons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_episode_surgeons_id_seq OWNER TO admin;

--
-- Name: registry_episode_surgeons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_episode_surgeons_id_seq OWNED BY public.registry_episode_surgeons.id;


--
-- Name: registry_followup; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_followup (
    id integer NOT NULL,
    date date NOT NULL,
    pain_severity character varying(16) NOT NULL,
    mesh_awareness boolean NOT NULL,
    seroma boolean NOT NULL,
    infection boolean NOT NULL,
    numbness boolean NOT NULL,
    episode_id integer NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    further_surgery_need boolean NOT NULL,
    surgery_comments_box text,
    recurrence boolean
);


ALTER TABLE public.registry_followup OWNER TO admin;

--
-- Name: registry_followup_attendees; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_followup_attendees (
    id integer NOT NULL,
    followup_id integer NOT NULL,
    medicalpersonnel_id integer NOT NULL
);


ALTER TABLE public.registry_followup_attendees OWNER TO admin;

--
-- Name: registry_followup_attendees_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_followup_attendees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_followup_attendees_id_seq OWNER TO admin;

--
-- Name: registry_followup_attendees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_followup_attendees_id_seq OWNED BY public.registry_followup_attendees.id;


--
-- Name: registry_followup_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_followup_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_followup_id_seq OWNER TO admin;

--
-- Name: registry_followup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_followup_id_seq OWNED BY public.registry_followup.id;


--
-- Name: registry_hospital; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_hospital (
    id integer NOT NULL,
    name character varying(255),
    address character varying(255)
);


ALTER TABLE public.registry_hospital OWNER TO admin;

--
-- Name: registry_hospital_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_hospital_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_hospital_id_seq OWNER TO admin;

--
-- Name: registry_hospital_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_hospital_id_seq OWNED BY public.registry_hospital.id;


--
-- Name: registry_hospitalregionmapping; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_hospitalregionmapping (
    id integer NOT NULL,
    hospital_id integer NOT NULL,
    region_id integer NOT NULL
);


ALTER TABLE public.registry_hospitalregionmapping OWNER TO admin;

--
-- Name: registry_hospitalregionmapping_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_hospitalregionmapping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_hospitalregionmapping_id_seq OWNER TO admin;

--
-- Name: registry_hospitalregionmapping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_hospitalregionmapping_id_seq OWNED BY public.registry_hospitalregionmapping.id;


--
-- Name: registry_patient; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_patient (
    id integer NOT NULL,
    national_id character varying(20),
    day_of_birth integer,
    month_of_birth integer,
    year_of_birth integer NOT NULL,
    gender character varying(32),
    phone_1 character varying(16),
    phone_2 character varying(16),
    address character varying(255),
    full_name character varying(255) NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    CONSTRAINT registry_patient_day_of_birth_check CHECK ((day_of_birth >= 0)),
    CONSTRAINT registry_patient_month_of_birth_check CHECK ((month_of_birth >= 0)),
    CONSTRAINT registry_patient_year_of_birth_check CHECK ((year_of_birth >= 0))
);


ALTER TABLE public.registry_patient OWNER TO admin;

--
-- Name: registry_patient_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_patient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_patient_id_seq OWNER TO admin;

--
-- Name: registry_patient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_patient_id_seq OWNED BY public.registry_patient.id;


--
-- Name: registry_patienthospitalmapping; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_patienthospitalmapping (
    id integer NOT NULL,
    hospital_id integer NOT NULL,
    patient_id integer NOT NULL,
    patient_hospital_id character varying(256) NOT NULL
);


ALTER TABLE public.registry_patienthospitalmapping OWNER TO admin;

--
-- Name: registry_patienthospitalmapping_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_patienthospitalmapping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_patienthospitalmapping_id_seq OWNER TO admin;

--
-- Name: registry_patienthospitalmapping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_patienthospitalmapping_id_seq OWNED BY public.registry_patienthospitalmapping.id;


--
-- Name: registry_preferredhospital; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_preferredhospital (
    id integer NOT NULL,
    hospital_id integer NOT NULL,
    medical_personnel_id integer NOT NULL
);


ALTER TABLE public.registry_preferredhospital OWNER TO admin;

--
-- Name: registry_preferredhospital_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_preferredhospital_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_preferredhospital_id_seq OWNER TO admin;

--
-- Name: registry_preferredhospital_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_preferredhospital_id_seq OWNED BY public.registry_preferredhospital.id;


--
-- Name: registry_region; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_region (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.registry_region OWNER TO admin;

--
-- Name: registry_region_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_region_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_region_id_seq OWNER TO admin;

--
-- Name: registry_region_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_region_id_seq OWNED BY public.registry_region.id;


--
-- Name: registry_regionzonemapping; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_regionzonemapping (
    id integer NOT NULL,
    region_id integer NOT NULL,
    zone_id integer NOT NULL
);


ALTER TABLE public.registry_regionzonemapping OWNER TO admin;

--
-- Name: registry_regionzonemapping_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_regionzonemapping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_regionzonemapping_id_seq OWNER TO admin;

--
-- Name: registry_regionzonemapping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_regionzonemapping_id_seq OWNED BY public.registry_regionzonemapping.id;


--
-- Name: registry_zone; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registry_zone (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.registry_zone OWNER TO admin;

--
-- Name: registry_zone_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registry_zone_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registry_zone_id_seq OWNER TO admin;

--
-- Name: registry_zone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registry_zone_id_seq OWNED BY public.registry_zone.id;


--
-- Name: users_medicalpersonnel; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users_medicalpersonnel (
    id integer NOT NULL,
    user_id integer,
    level character varying(255) NOT NULL
);


ALTER TABLE public.users_medicalpersonnel OWNER TO admin;

--
-- Name: users_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_profile_id_seq OWNER TO admin;

--
-- Name: users_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_profile_id_seq OWNED BY public.users_medicalpersonnel.id;


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: django_site id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.django_site ALTER COLUMN id SET DEFAULT nextval('public.django_site_id_seq'::regclass);


--
-- Name: registry_announcement id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_announcement ALTER COLUMN id SET DEFAULT nextval('public.registry_announcement_id_seq'::regclass);


--
-- Name: registry_discharge id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_discharge ALTER COLUMN id SET DEFAULT nextval('public.registry_discharge_id_seq'::regclass);


--
-- Name: registry_episode id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_episode ALTER COLUMN id SET DEFAULT nextval('public.registry_episode_id_seq'::regclass);


--
-- Name: registry_episode_surgeons id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_episode_surgeons ALTER COLUMN id SET DEFAULT nextval('public.registry_episode_surgeons_id_seq'::regclass);


--
-- Name: registry_followup id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_followup ALTER COLUMN id SET DEFAULT nextval('public.registry_followup_id_seq'::regclass);


--
-- Name: registry_followup_attendees id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_followup_attendees ALTER COLUMN id SET DEFAULT nextval('public.registry_followup_attendees_id_seq'::regclass);


--
-- Name: registry_hospital id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_hospital ALTER COLUMN id SET DEFAULT nextval('public.registry_hospital_id_seq'::regclass);


--
-- Name: registry_hospitalregionmapping id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_hospitalregionmapping ALTER COLUMN id SET DEFAULT nextval('public.registry_hospitalregionmapping_id_seq'::regclass);


--
-- Name: registry_patient id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_patient ALTER COLUMN id SET DEFAULT nextval('public.registry_patient_id_seq'::regclass);


--
-- Name: registry_patienthospitalmapping id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_patienthospitalmapping ALTER COLUMN id SET DEFAULT nextval('public.registry_patienthospitalmapping_id_seq'::regclass);


--
-- Name: registry_preferredhospital id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_preferredhospital ALTER COLUMN id SET DEFAULT nextval('public.registry_preferredhospital_id_seq'::regclass);


--
-- Name: registry_region id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_region ALTER COLUMN id SET DEFAULT nextval('public.registry_region_id_seq'::regclass);


--
-- Name: registry_regionzonemapping id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_regionzonemapping ALTER COLUMN id SET DEFAULT nextval('public.registry_regionzonemapping_id_seq'::regclass);


--
-- Name: registry_zone id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_zone ALTER COLUMN id SET DEFAULT nextval('public.registry_zone_id_seq'::regclass);


--
-- Name: users_medicalpersonnel id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_medicalpersonnel ALTER COLUMN id SET DEFAULT nextval('public.users_profile_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add permission	1	add_permission
2	Can change permission	1	change_permission
3	Can delete permission	1	delete_permission
4	Can view permission	1	view_permission
5	Can add group	2	add_group
6	Can change group	2	change_group
7	Can delete group	2	delete_group
8	Can view group	2	view_group
9	Can add user	3	add_user
10	Can change user	3	change_user
11	Can delete user	3	delete_user
12	Can view user	3	view_user
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add site	6	add_site
22	Can change site	6	change_site
23	Can delete site	6	delete_site
24	Can view site	6	view_site
25	Can add log entry	7	add_logentry
26	Can change log entry	7	change_logentry
27	Can delete log entry	7	delete_logentry
28	Can view log entry	7	view_logentry
29	Can add Token	8	add_token
30	Can change Token	8	change_token
31	Can delete Token	8	delete_token
32	Can view Token	8	view_token
33	Can add token	9	add_tokenproxy
34	Can change token	9	change_tokenproxy
35	Can delete token	9	delete_tokenproxy
36	Can view token	9	view_tokenproxy
37	Can add medical personnel	10	add_medicalpersonnel
38	Can change medical personnel	10	change_medicalpersonnel
39	Can delete medical personnel	10	delete_medicalpersonnel
40	Can view medical personnel	10	view_medicalpersonnel
41	Can add hospital	11	add_hospital
42	Can change hospital	11	change_hospital
43	Can delete hospital	11	delete_hospital
44	Can view hospital	11	view_hospital
45	Can add patient	12	add_patient
46	Can change patient	12	change_patient
47	Can delete patient	12	delete_patient
48	Can view patient	12	view_patient
49	Can add patient hospital mapping	13	add_patienthospitalmapping
50	Can change patient hospital mapping	13	change_patienthospitalmapping
51	Can delete patient hospital mapping	13	delete_patienthospitalmapping
52	Can view patient hospital mapping	13	view_patienthospitalmapping
53	Can add episode	14	add_episode
54	Can change episode	14	change_episode
55	Can delete episode	14	delete_episode
56	Can view episode	14	view_episode
57	Can add follow up	15	add_followup
58	Can change follow up	15	change_followup
59	Can delete follow up	15	delete_followup
60	Can view follow up	15	view_followup
61	Can add discharge	16	add_discharge
62	Can change discharge	16	change_discharge
63	Can delete discharge	16	delete_discharge
64	Can view discharge	16	view_discharge
65	Can add preferred hospital	17	add_preferredhospital
66	Can change preferred hospital	17	change_preferredhospital
67	Can delete preferred hospital	17	delete_preferredhospital
68	Can view preferred hospital	17	view_preferredhospital
69	Can add region	18	add_region
70	Can change region	18	change_region
71	Can delete region	18	delete_region
72	Can view region	18	view_region
73	Can add zone	19	add_zone
74	Can change zone	19	change_zone
75	Can delete zone	19	delete_zone
76	Can view zone	19	view_zone
77	Can add region zone mapping	20	add_regionzonemapping
78	Can change region zone mapping	20	change_regionzonemapping
79	Can delete region zone mapping	20	delete_regionzonemapping
80	Can view region zone mapping	20	view_regionzonemapping
81	Can add hospital region mapping	21	add_hospitalregionmapping
82	Can change hospital region mapping	21	change_hospitalregionmapping
83	Can delete hospital region mapping	21	delete_hospitalregionmapping
84	Can view hospital region mapping	21	view_hospitalregionmapping
85	Can add announcement	22	add_announcement
86	Can change announcement	22	change_announcement
87	Can delete announcement	22	delete_announcement
88	Can view announcement	22	view_announcement
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
4	argon2$argon2id$v=19$m=102400,t=2,p=8$RHJJS1NlZzNSRXhQMm1YZk1samFWOQ$vwGGOlls/WH/O8WcdcHEgw	\N	f	szigyi				f	t	2025-08-22 12:21:01.198608+00
1	argon2$argon2id$v=19$m=102400,t=2,p=8$bFBOS2R1UXU1a3ViT0JuVGxvTjAyTA$5Hy782jkzRks/WL/5NiLOg	2025-12-26 19:07:40.276596+00	t	admin@admin.com	Admin	Ad	admin@admin.com	t	t	2025-04-21 11:35:58+00
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: authtoken_token; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.authtoken_token (key, created, user_id) FROM stdin;
f607c88d04e19e6c7be9ae7f3f0a0b71f8b486e3	2025-08-22 12:26:53.94711+00	4
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2025-04-21 11:37:12.253049+00	2	szigyi	1	[{"added": {}}]	3	1
2	2025-04-21 11:37:20.2326+00	2	(Lead Surgeon) szigyi	1	[{"added": {}}]	10	1
3	2025-04-21 13:00:45.788434+00	2	szigyi	3		3	1
4	2025-04-21 13:01:00.93949+00	3	szigyi	1	[{"added": {}}]	3	1
5	2025-04-21 13:01:16.665213+00	3	(Lead Surgeon) szigyi	1	[{"added": {}}]	10	1
6	2025-04-21 13:01:42.934999+00	1	Royal London Hospital	1	[{"added": {}}]	11	1
7	2025-04-21 13:01:49.896389+00	1	  (szigyi) - Hospital Royal London Hospital	1	[{"added": {}}]	17	1
8	2025-04-28 19:55:20.76022+00	3	szigyi	2	[{"changed": {"fields": ["First name", "Last name"]}}]	3	1
9	2025-04-28 19:55:30.874083+00	1	admin@admin.com	2	[{"changed": {"fields": ["First name", "Last name"]}}]	3	1
10	2025-08-22 12:20:42.950743+00	3	szigyi	3		3	1
11	2025-08-22 12:21:01.214966+00	4	szigyi	1	[{"added": {}}]	3	1
12	2025-08-22 12:22:53.837595+00	4	(Lead Surgeon) szigyi	1	[{"added": {}}]	10	1
13	2025-08-22 12:23:30.460617+00	1	UK	1	[{"added": {}}]	18	1
14	2025-08-22 12:23:38.002778+00	1	England	1	[{"added": {}}]	19	1
15	2025-08-22 12:23:44.679219+00	1	UK - England	1	[{"added": {}}]	20	1
16	2025-08-22 12:23:53.801415+00	2	  (szigyi) - Hospital Royal London Hospital	1	[{"added": {}}]	17	1
17	2025-08-22 12:24:00.604407+00	1	Royal London Hospital - UK	1	[{"added": {}}]	21	1
18	2025-12-26 19:08:10.448382+00	2	General Hospital	1	[{"added": {}}]	11	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	auth	permission
2	auth	group
3	auth	user
4	contenttypes	contenttype
5	sessions	session
6	sites	site
7	admin	logentry
8	authtoken	token
9	authtoken	tokenproxy
10	users	medicalpersonnel
11	registry	hospital
12	registry	patient
13	registry	patienthospitalmapping
14	registry	episode
15	registry	followup
16	registry	discharge
17	registry	preferredhospital
18	registry	region
19	registry	zone
20	registry	regionzonemapping
21	registry	hospitalregionmapping
22	registry	announcement
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2025-04-21 11:35:58.490548+00
2	auth	0001_initial	2025-04-21 11:35:58.543844+00
3	admin	0001_initial	2025-04-21 11:35:58.630194+00
4	admin	0002_logentry_remove_auto_add	2025-04-21 11:35:58.654802+00
5	admin	0003_logentry_add_action_flag_choices	2025-04-21 11:35:58.668301+00
6	contenttypes	0002_remove_content_type_name	2025-04-21 11:35:58.692706+00
7	auth	0002_alter_permission_name_max_length	2025-04-21 11:35:58.703847+00
8	auth	0003_alter_user_email_max_length	2025-04-21 11:35:58.716157+00
9	auth	0004_alter_user_username_opts	2025-04-21 11:35:58.728938+00
10	auth	0005_alter_user_last_login_null	2025-04-21 11:35:58.741684+00
11	auth	0006_require_contenttypes_0002	2025-04-21 11:35:58.744808+00
12	auth	0007_alter_validators_add_error_messages	2025-04-21 11:35:58.756606+00
13	auth	0008_alter_user_username_max_length	2025-04-21 11:35:58.774469+00
14	auth	0009_alter_user_last_name_max_length	2025-04-21 11:35:58.786381+00
15	auth	0010_alter_group_name_max_length	2025-04-21 11:35:58.798747+00
16	auth	0011_update_proxy_permissions	2025-04-21 11:35:58.811885+00
17	auth	0012_alter_user_first_name_max_length	2025-04-21 11:35:58.828174+00
18	authtoken	0001_initial	2025-04-21 11:35:58.845822+00
19	authtoken	0002_auto_20160226_1747	2025-04-21 11:35:58.897819+00
20	authtoken	0003_tokenproxy	2025-04-21 11:35:58.905712+00
21	users	0001_initial	2025-04-21 11:35:58.927974+00
22	users	0002_create_super_user	2025-04-21 11:35:58.96091+00
23	users	0003_auto_20210530_1148	2025-04-21 11:35:58.983841+00
24	users	0004_auto_20210604_1037	2025-04-21 11:35:59.016763+00
25	users	0005_medicalpersonnel_level	2025-04-21 11:35:59.031878+00
26	users	0006_auto_20210604_1406	2025-04-21 11:35:59.045316+00
27	users	0007_auto_20210611_1126	2025-04-21 11:35:59.067184+00
28	users	0008_auto_20210630_1407	2025-04-21 11:35:59.080445+00
29	registry	0001_initial	2025-04-21 11:35:59.158855+00
30	registry	0002_auto_20210607_1537	2025-04-21 11:35:59.196327+00
31	registry	0003_auto_20210607_1617	2025-04-21 11:35:59.244986+00
32	registry	0004_remove_patient_age	2025-04-21 11:35:59.257231+00
33	registry	0005_auto_20210607_2222	2025-04-21 11:35:59.276708+00
34	registry	0006_auto_20210609_1559	2025-04-21 11:35:59.304862+00
35	registry	0007_episode_followup	2025-04-21 11:35:59.360589+00
36	registry	0008_auto_20210919_1826	2025-04-21 11:35:59.42725+00
37	registry	0009_auto_20210919_1941	2025-04-21 11:35:59.472295+00
38	registry	0010_auto_20211021_1449	2025-04-21 11:35:59.480578+00
39	registry	0011_auto_20211119_1518	2025-04-21 11:35:59.495524+00
40	registry	0012_auto_20211119_1656	2025-04-21 11:35:59.505258+00
41	registry	0013_discharge	2025-04-21 11:35:59.535514+00
42	registry	0014_remove_episode_discharge_date	2025-04-21 11:35:59.552651+00
43	registry	0015_auto_20220222_1043	2025-04-21 11:35:59.594315+00
44	registry	0016_auto_20220222_1415	2025-04-21 11:35:59.602396+00
45	registry	0017_auto_20221029_1535	2025-04-21 11:35:59.620625+00
46	registry	0018_auto_20221029_1546	2025-04-21 11:35:59.695581+00
47	registry	0019_episode_size	2025-04-21 11:35:59.712912+00
48	registry	0020_auto_20221029_1710	2025-04-21 11:35:59.744288+00
49	registry	0021_auto_20230213_1528	2025-04-21 11:35:59.771669+00
50	registry	0022_auto_20230404_1418	2025-04-21 11:35:59.812123+00
51	registry	0023_discharge_discharge_duration	2025-04-21 11:35:59.827052+00
52	registry	0024_auto_20230404_1512	2025-04-21 11:35:59.841949+00
53	registry	0025_auto_20230404_1536	2025-04-21 11:35:59.861597+00
54	registry	0026_discharge_comments	2025-04-21 11:35:59.881514+00
55	registry	0027_auto_20230404_1555	2025-04-21 11:35:59.91166+00
56	registry	0028_auto_20230404_1842	2025-04-21 11:35:59.933181+00
57	registry	0029_auto_20230411_0759	2025-04-21 11:35:59.951381+00
58	registry	0030_auto_20230411_0844	2025-04-21 11:35:59.968633+00
59	registry	0031_auto_20230411_1007	2025-04-21 11:35:59.994546+00
60	registry	0032_remove_episode_comments	2025-04-21 11:36:00.019258+00
61	registry	0022_auto_20230525_0641	2025-04-21 11:36:00.043989+00
62	registry	0033_merge_20230525_0733	2025-04-21 11:36:00.051321+00
63	registry	0034_auto_20230808_0957	2025-04-21 11:36:00.070632+00
64	registry	0035_episode_comments	2025-04-21 11:36:00.092587+00
65	registry	0036_followup_recurrence	2025-04-21 11:36:00.112211+00
66	registry	0037_preferredhospital	2025-04-21 11:36:00.14978+00
67	sessions	0001_initial	2025-04-21 11:36:00.185358+00
68	sites	0001_initial	2025-04-21 11:36:00.206347+00
69	sites	0002_alter_domain_unique	2025-04-21 11:36:00.223762+00
70	sites	0003_set_site_domain_and_name	2025-04-21 11:36:00.263903+00
71	sites	0004_auto_20210530_1148	2025-04-21 11:36:00.271934+00
72	registry	0038_auto_20250421_1157	2025-04-21 11:57:27.505243+00
73	registry	0038_auto_20250519_0903	2025-06-10 06:38:32.441729+00
74	registry	0039_announcement	2025-06-10 06:38:32.555524+00
75	users	0009_auto_20251211_2039	2026-01-02 15:26:23.562685+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
urmpt0t5o3wif1ka16bje1ug98yxw3av	.eJxVjDEOwjAMRe-SGUWNHdLAyM4ZIjt2SAG1UtNOiLtDpQ6w_vfef5lE61LT2nROg5izcebwuzHlh44bkDuNt8nmaVzmge2m2J02e51En5fd_Tuo1Oq3LifswCE4zsKExKFIxNxJIPZHdkIaMfbFK3hEdVyQYw9QgCQosHl_APqfOKI:1u6pSA:5Ygck4m2rZ4gONHEGvmap83RdMX814GsbULBK4nKoWY	2025-05-05 11:36:46.767675+00
cjzngv8udixnackls6sxmdqefa5sp4cr	.eJxVjDEOwjAMRe-SGUWNHdLAyM4ZIjt2SAG1UtNOiLtDpQ6w_vfef5lE61LT2nROg5izcebwuzHlh44bkDuNt8nmaVzmge2m2J02e51En5fd_Tuo1Oq3LifswCE4zsKExKFIxNxJIPZHdkIaMfbFK3hEdVyQYw9QgCQosHl_APqfOKI:1upQkm:ckI6e3sxB-FJLMxefjRnaSQLDorpgTwrRtPQba71Rm0	2025-09-05 12:20:20.505152+00
3d5h2ctuowpuvm4dzwcomfj6mx2omun4	.eJxVjMEKwjAQRP8lZwlJ2lTXo_d-Q9jsbk1VEmjak_jvNtCDMoeBeY95q4DbmsJWZQkzq6uy6vS7RaSn5Ab4gfleNJW8LnPUTdEHrXosLK_b4f4dJKyp3QI5EOvYOYk9yGSISTxaihdEBC8TWO-ps3tjZwezB73peZAOzqQ-X_wvOCQ:1vX0ZJ:_UN3LJoSah_I1_UV1daLOz-Tz5KKTWgRtQKh7fqScuY	2026-01-03 17:16:37.960704+00
d4zz99m5let1qslkenyo6keiti3c4deo	.eJxVjMEKwjAQRP8lZwlJ2lTXo_d-Q9jsbk1VEmjak_jvNtCDMoeBeY95q4DbmsJWZQkzq6uy6vS7RaSn5Ab4gfleNJW8LnPUTdEHrXosLK_b4f4dJKyp3QI5EOvYOYk9yGSISTxaihdEBC8TWO-ps3tjZwezB73peZAOzqQ-X_wvOCQ:1vZDA4:hryEhaagLYhR7niUQjf9ZY-Qo99Bv8vXQ0rk4Iq14JE	2026-01-09 19:07:40.418443+00
\.


--
-- Data for Name: django_site; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.django_site (id, domain, name) FROM stdin;
1	example.com	TMH Registry
\.


--
-- Data for Name: registry_announcement; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_announcement (id, announcement_text, display_from, display_until, created_at) FROM stdin;
\.


--
-- Data for Name: registry_discharge; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_discharge (id, created_at, updated_at, date, aware_of_mesh, infection, episode_id, discharge_duration, comments) FROM stdin;
1	2025-04-21	2025-04-21	2025-04-21	f	Haematoma	1	\N	
5	2025-04-25	2025-04-25	2025-04-25	t	None	3	5	
6	2025-04-28	2025-04-28	2025-04-28	t	None	4	5	
9	2025-06-10	2025-06-10	2025-06-10	f	None	5	\N	
13	2025-10-06	2025-10-06	2025-10-06	f	Bleeding,Urinary Retention	6	\N	
14	2025-12-30	2025-12-30	2025-12-30	t	Bleeding,Haematoma,Return to theatre,Death	2	2	
15	2025-12-30	2025-12-30	2025-12-30	f	None	7	\N	Commmmm
\.


--
-- Data for Name: registry_episode; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_episode (id, created, surgery_date, episode_type, cepod, side, occurence, type, complexity, mesh_type, anaesthetic_type, diathermy_used, patient_hospital_mapping_id, size, antibiotic_type, antibiotic_used, comments) FROM stdin;
1	2025-04-21 13:06:45.04041+00	2025-04-21	INGUINAL	PLANNED	LEFT	PRIMARY	DIRECT	INCARCERATED	TNMHP	LOCAL	f	1	VERY_SMALL		f	
2	2025-04-21 21:15:32.982564+00	2025-04-21	INGUINAL	PLANNED	NA	PRIMARY	NA	SIMPLE	TNMHP	LOCAL	t	1	VERY_SMALL	IV at start / before surgery	t	
3	2025-04-25 14:34:54.053563+00	2025-04-25	FEMORAL	PLANNED	NA	PRIMARY	NA	SIMPLE	TNMHP	LOCAL	t	2	VERY_SMALL		f	
4	2025-04-28 19:33:01.420251+00	2025-04-28	INGUINAL	PLANNED	NA	PRIMARY	NA	SIMPLE	TNMHP	LOCAL	t	2	VERY_SMALL		f	
5	2025-06-10 06:50:35.341951+00	2025-06-10	INGUINAL	PLANNED	NA	PRIMARY	DIRECT	SIMPLE	TNMHP	LOCAL	f	1	VERY_SMALL		f	
6	2025-10-06 20:44:03.32487+00	2025-10-06	INCISIONAL	EMERGENCY	LEFT	RECURRENT	DIRECT	INCARCERATED	KCMC	SPINAL	f	2	SMALL		f	
7	2025-12-30 18:26:01.214137+00	2025-12-30	FEMORAL	EMERGENCY	LEFT	RECURRENT	DIRECT	INCARCERATED	KCMC	SPINAL	f	1	SMALL	none	f	fxfcddsg
\.


--
-- Data for Name: registry_episode_surgeons; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_episode_surgeons (id, episode_id, medicalpersonnel_id) FROM stdin;
1	1	1
2	2	1
3	3	1
4	4	1
5	5	1
7	6	1
8	7	1
\.


--
-- Data for Name: registry_followup; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_followup (id, date, pain_severity, mesh_awareness, seroma, infection, numbness, episode_id, created_at, updated_at, further_surgery_need, surgery_comments_box, recurrence) FROM stdin;
1	2025-04-21	MINIMAL	t	f	t	f	1	2025-04-21	2025-04-21	f		t
2	2025-04-28	MINIMAL	t	t	t	t	4	2025-04-28	2025-04-28	t	yes	t
\.


--
-- Data for Name: registry_followup_attendees; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_followup_attendees (id, followup_id, medicalpersonnel_id) FROM stdin;
1	1	1
2	2	1
\.


--
-- Data for Name: registry_hospital; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_hospital (id, name, address) FROM stdin;
1	Royal London Hospital	London
2	General Hospital	\N
\.


--
-- Data for Name: registry_hospitalregionmapping; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_hospitalregionmapping (id, hospital_id, region_id) FROM stdin;
1	1	1
\.


--
-- Data for Name: registry_patient; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_patient (id, national_id, day_of_birth, month_of_birth, year_of_birth, gender, phone_1, phone_2, address, full_name, created_at, updated_at) FROM stdin;
1	\N	1	1	1999	MALE	075555555	\N	\N	Szabolcs Szilagyi	2025-04-21	2025-04-21
2	\N	\N	\N	1990	FEMALE	9723873845634	\N	\N	skjnskjv ksjnvksv	2025-04-25	2025-04-25
3	0	0	0	1998	MALE	238742385462	0		SAfsg adsgeger	2025-12-20	2025-12-20
4	1234	0	0	2003	FEMALE	1232354346	123456789123456		tjytujtuyj rbrthrt	2025-12-20	2025-12-20
\.


--
-- Data for Name: registry_patienthospitalmapping; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_patienthospitalmapping (id, hospital_id, patient_id, patient_hospital_id) FROM stdin;
1	1	1	5615432161
2	1	2	2872348654932856
3	1	3	223433
4	1	4	1111111
\.


--
-- Data for Name: registry_preferredhospital; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_preferredhospital (id, hospital_id, medical_personnel_id) FROM stdin;
2	1	4
\.


--
-- Data for Name: registry_region; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_region (id, name) FROM stdin;
1	UK
\.


--
-- Data for Name: registry_regionzonemapping; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_regionzonemapping (id, region_id, zone_id) FROM stdin;
1	1	1
\.


--
-- Data for Name: registry_zone; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registry_zone (id, name) FROM stdin;
1	England
\.


--
-- Data for Name: users_medicalpersonnel; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users_medicalpersonnel (id, user_id, level) FROM stdin;
1	1	Lead Surgeon
4	4	LEAD_SURGEON
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 88, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 4, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 18, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 22, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 75, true);


--
-- Name: django_site_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.django_site_id_seq', 1, false);


--
-- Name: registry_announcement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_announcement_id_seq', 1, false);


--
-- Name: registry_discharge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_discharge_id_seq', 15, true);


--
-- Name: registry_episode_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_episode_id_seq', 7, true);


--
-- Name: registry_episode_surgeons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_episode_surgeons_id_seq', 8, true);


--
-- Name: registry_followup_attendees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_followup_attendees_id_seq', 2, true);


--
-- Name: registry_followup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_followup_id_seq', 2, true);


--
-- Name: registry_hospital_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_hospital_id_seq', 2, true);


--
-- Name: registry_hospitalregionmapping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_hospitalregionmapping_id_seq', 1, true);


--
-- Name: registry_patient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_patient_id_seq', 4, true);


--
-- Name: registry_patienthospitalmapping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_patienthospitalmapping_id_seq', 4, true);


--
-- Name: registry_preferredhospital_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_preferredhospital_id_seq', 2, true);


--
-- Name: registry_region_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_region_id_seq', 1, true);


--
-- Name: registry_regionzonemapping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_regionzonemapping_id_seq', 1, true);


--
-- Name: registry_zone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registry_zone_id_seq', 1, true);


--
-- Name: users_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_profile_id_seq', 4, true);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: authtoken_token authtoken_token_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_pkey PRIMARY KEY (key);


--
-- Name: authtoken_token authtoken_token_user_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_key UNIQUE (user_id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: django_site django_site_domain_a2e37b91_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_domain_a2e37b91_uniq UNIQUE (domain);


--
-- Name: django_site django_site_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_pkey PRIMARY KEY (id);


--
-- Name: registry_announcement registry_announcement_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_announcement
    ADD CONSTRAINT registry_announcement_pkey PRIMARY KEY (id);


--
-- Name: registry_discharge registry_discharge_episode_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_discharge
    ADD CONSTRAINT registry_discharge_episode_id_key UNIQUE (episode_id);


--
-- Name: registry_discharge registry_discharge_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_discharge
    ADD CONSTRAINT registry_discharge_pkey PRIMARY KEY (id);


--
-- Name: registry_episode registry_episode_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_episode
    ADD CONSTRAINT registry_episode_pkey PRIMARY KEY (id);


--
-- Name: registry_episode_surgeons registry_episode_surgeon_episode_id_medicalperson_d5726393_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_episode_surgeons
    ADD CONSTRAINT registry_episode_surgeon_episode_id_medicalperson_d5726393_uniq UNIQUE (episode_id, medicalpersonnel_id);


--
-- Name: registry_episode_surgeons registry_episode_surgeons_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_episode_surgeons
    ADD CONSTRAINT registry_episode_surgeons_pkey PRIMARY KEY (id);


--
-- Name: registry_followup_attendees registry_followup_attend_followup_id_medicalperso_fe279a5f_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_followup_attendees
    ADD CONSTRAINT registry_followup_attend_followup_id_medicalperso_fe279a5f_uniq UNIQUE (followup_id, medicalpersonnel_id);


--
-- Name: registry_followup_attendees registry_followup_attendees_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_followup_attendees
    ADD CONSTRAINT registry_followup_attendees_pkey PRIMARY KEY (id);


--
-- Name: registry_followup registry_followup_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_followup
    ADD CONSTRAINT registry_followup_pkey PRIMARY KEY (id);


--
-- Name: registry_hospital registry_hospital_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_hospital
    ADD CONSTRAINT registry_hospital_pkey PRIMARY KEY (id);


--
-- Name: registry_hospitalregionmapping registry_hospitalregionmapping_hospital_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_hospitalregionmapping
    ADD CONSTRAINT registry_hospitalregionmapping_hospital_id_key UNIQUE (hospital_id);


--
-- Name: registry_hospitalregionmapping registry_hospitalregionmapping_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_hospitalregionmapping
    ADD CONSTRAINT registry_hospitalregionmapping_pkey PRIMARY KEY (id);


--
-- Name: registry_patient registry_patient_national_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_patient
    ADD CONSTRAINT registry_patient_national_id_key UNIQUE (national_id);


--
-- Name: registry_patient registry_patient_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_patient
    ADD CONSTRAINT registry_patient_pkey PRIMARY KEY (id);


--
-- Name: registry_patienthospitalmapping registry_patienthospital_hospital_id_patient_hosp_f4f914a6_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_patienthospitalmapping
    ADD CONSTRAINT registry_patienthospital_hospital_id_patient_hosp_f4f914a6_uniq UNIQUE (hospital_id, patient_hospital_id);


--
-- Name: registry_patienthospitalmapping registry_patienthospital_patient_id_hospital_id_d7df0afe_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_patienthospitalmapping
    ADD CONSTRAINT registry_patienthospital_patient_id_hospital_id_d7df0afe_uniq UNIQUE (patient_id, hospital_id);


--
-- Name: registry_patienthospitalmapping registry_patienthospitalmapping_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_patienthospitalmapping
    ADD CONSTRAINT registry_patienthospitalmapping_pkey PRIMARY KEY (id);


--
-- Name: registry_preferredhospital registry_preferredhospit_medical_personnel_id_hos_be32751d_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_preferredhospital
    ADD CONSTRAINT registry_preferredhospit_medical_personnel_id_hos_be32751d_uniq UNIQUE (medical_personnel_id, hospital_id);


--
-- Name: registry_preferredhospital registry_preferredhospital_medical_personnel_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_preferredhospital
    ADD CONSTRAINT registry_preferredhospital_medical_personnel_id_key UNIQUE (medical_personnel_id);


--
-- Name: registry_preferredhospital registry_preferredhospital_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_preferredhospital
    ADD CONSTRAINT registry_preferredhospital_pkey PRIMARY KEY (id);


--
-- Name: registry_region registry_region_name_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_region
    ADD CONSTRAINT registry_region_name_key UNIQUE (name);


--
-- Name: registry_region registry_region_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_region
    ADD CONSTRAINT registry_region_pkey PRIMARY KEY (id);


--
-- Name: registry_regionzonemapping registry_regionzonemapping_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_regionzonemapping
    ADD CONSTRAINT registry_regionzonemapping_pkey PRIMARY KEY (id);


--
-- Name: registry_regionzonemapping registry_regionzonemapping_region_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_regionzonemapping
    ADD CONSTRAINT registry_regionzonemapping_region_id_key UNIQUE (region_id);


--
-- Name: registry_zone registry_zone_name_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_zone
    ADD CONSTRAINT registry_zone_name_key UNIQUE (name);


--
-- Name: registry_zone registry_zone_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_zone
    ADD CONSTRAINT registry_zone_pkey PRIMARY KEY (id);


--
-- Name: users_medicalpersonnel users_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_medicalpersonnel
    ADD CONSTRAINT users_profile_pkey PRIMARY KEY (id);


--
-- Name: users_medicalpersonnel users_profile_user_id_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_medicalpersonnel
    ADD CONSTRAINT users_profile_user_id_key UNIQUE (user_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: authtoken_token_key_10f0b77e_like; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX authtoken_token_key_10f0b77e_like ON public.authtoken_token USING btree (key varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: django_site_domain_a2e37b91_like; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX django_site_domain_a2e37b91_like ON public.django_site USING btree (domain varchar_pattern_ops);


--
-- Name: registry_episode_patient_hospital_mapping_id_0185f366; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX registry_episode_patient_hospital_mapping_id_0185f366 ON public.registry_episode USING btree (patient_hospital_mapping_id);


--
-- Name: registry_episode_surgeons_episode_id_0b9e4a4d; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX registry_episode_surgeons_episode_id_0b9e4a4d ON public.registry_episode_surgeons USING btree (episode_id);


--
-- Name: registry_episode_surgeons_medicalpersonnel_id_c6f5d7a6; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX registry_episode_surgeons_medicalpersonnel_id_c6f5d7a6 ON public.registry_episode_surgeons USING btree (medicalpersonnel_id);


--
-- Name: registry_followup_attendees_followup_id_bc02abf6; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX registry_followup_attendees_followup_id_bc02abf6 ON public.registry_followup_attendees USING btree (followup_id);


--
-- Name: registry_followup_attendees_medicalpersonnel_id_67d2e722; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX registry_followup_attendees_medicalpersonnel_id_67d2e722 ON public.registry_followup_attendees USING btree (medicalpersonnel_id);


--
-- Name: registry_followup_episode_id_693d0bff; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX registry_followup_episode_id_693d0bff ON public.registry_followup USING btree (episode_id);


--
-- Name: registry_hospitalregionmapping_region_id_9cdb3b57; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX registry_hospitalregionmapping_region_id_9cdb3b57 ON public.registry_hospitalregionmapping USING btree (region_id);


--
-- Name: registry_patienthospitalmapping_hospital_id_84a54db5; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX registry_patienthospitalmapping_hospital_id_84a54db5 ON public.registry_patienthospitalmapping USING btree (hospital_id);


--
-- Name: registry_patienthospitalmapping_patient_id_a160e753; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX registry_patienthospitalmapping_patient_id_a160e753 ON public.registry_patienthospitalmapping USING btree (patient_id);


--
-- Name: registry_preferredhospital_hospital_id_0dd020cb; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX registry_preferredhospital_hospital_id_0dd020cb ON public.registry_preferredhospital USING btree (hospital_id);


--
-- Name: registry_region_name_a60a9d0b_like; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX registry_region_name_a60a9d0b_like ON public.registry_region USING btree (name varchar_pattern_ops);


--
-- Name: registry_regionzonemapping_zone_id_d93a3b97; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX registry_regionzonemapping_zone_id_d93a3b97 ON public.registry_regionzonemapping USING btree (zone_id);


--
-- Name: registry_zone_name_b5700c0f_like; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX registry_zone_name_b5700c0f_like ON public.registry_zone USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: authtoken_token authtoken_token_user_id_35299eff_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_35299eff_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_discharge registry_discharge_episode_id_01037fd2_fk_registry_episode_id; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_discharge
    ADD CONSTRAINT registry_discharge_episode_id_01037fd2_fk_registry_episode_id FOREIGN KEY (episode_id) REFERENCES public.registry_episode(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_episode registry_episode_patient_hospital_map_0185f366_fk_registry_; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_episode
    ADD CONSTRAINT registry_episode_patient_hospital_map_0185f366_fk_registry_ FOREIGN KEY (patient_hospital_mapping_id) REFERENCES public.registry_patienthospitalmapping(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_episode_surgeons registry_episode_sur_episode_id_0b9e4a4d_fk_registry_; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_episode_surgeons
    ADD CONSTRAINT registry_episode_sur_episode_id_0b9e4a4d_fk_registry_ FOREIGN KEY (episode_id) REFERENCES public.registry_episode(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_episode_surgeons registry_episode_sur_medicalpersonnel_id_c6f5d7a6_fk_users_med; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_episode_surgeons
    ADD CONSTRAINT registry_episode_sur_medicalpersonnel_id_c6f5d7a6_fk_users_med FOREIGN KEY (medicalpersonnel_id) REFERENCES public.users_medicalpersonnel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_followup_attendees registry_followup_at_followup_id_bc02abf6_fk_registry_; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_followup_attendees
    ADD CONSTRAINT registry_followup_at_followup_id_bc02abf6_fk_registry_ FOREIGN KEY (followup_id) REFERENCES public.registry_followup(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_followup_attendees registry_followup_at_medicalpersonnel_id_67d2e722_fk_users_med; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_followup_attendees
    ADD CONSTRAINT registry_followup_at_medicalpersonnel_id_67d2e722_fk_users_med FOREIGN KEY (medicalpersonnel_id) REFERENCES public.users_medicalpersonnel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_followup registry_followup_episode_id_693d0bff_fk_registry_episode_id; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_followup
    ADD CONSTRAINT registry_followup_episode_id_693d0bff_fk_registry_episode_id FOREIGN KEY (episode_id) REFERENCES public.registry_episode(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_hospitalregionmapping registry_hospitalreg_hospital_id_fafe7ea4_fk_registry_; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_hospitalregionmapping
    ADD CONSTRAINT registry_hospitalreg_hospital_id_fafe7ea4_fk_registry_ FOREIGN KEY (hospital_id) REFERENCES public.registry_hospital(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_hospitalregionmapping registry_hospitalreg_region_id_9cdb3b57_fk_registry_; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_hospitalregionmapping
    ADD CONSTRAINT registry_hospitalreg_region_id_9cdb3b57_fk_registry_ FOREIGN KEY (region_id) REFERENCES public.registry_region(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_patienthospitalmapping registry_patienthosp_hospital_id_84a54db5_fk_registry_; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_patienthospitalmapping
    ADD CONSTRAINT registry_patienthosp_hospital_id_84a54db5_fk_registry_ FOREIGN KEY (hospital_id) REFERENCES public.registry_hospital(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_patienthospitalmapping registry_patienthosp_patient_id_a160e753_fk_registry_; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_patienthospitalmapping
    ADD CONSTRAINT registry_patienthosp_patient_id_a160e753_fk_registry_ FOREIGN KEY (patient_id) REFERENCES public.registry_patient(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_preferredhospital registry_preferredho_hospital_id_0dd020cb_fk_registry_; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_preferredhospital
    ADD CONSTRAINT registry_preferredho_hospital_id_0dd020cb_fk_registry_ FOREIGN KEY (hospital_id) REFERENCES public.registry_hospital(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_preferredhospital registry_preferredho_medical_personnel_id_00baa976_fk_users_med; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_preferredhospital
    ADD CONSTRAINT registry_preferredho_medical_personnel_id_00baa976_fk_users_med FOREIGN KEY (medical_personnel_id) REFERENCES public.users_medicalpersonnel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_regionzonemapping registry_regionzonem_region_id_b1f7ea88_fk_registry_; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_regionzonemapping
    ADD CONSTRAINT registry_regionzonem_region_id_b1f7ea88_fk_registry_ FOREIGN KEY (region_id) REFERENCES public.registry_region(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registry_regionzonemapping registry_regionzonemapping_zone_id_d93a3b97_fk_registry_zone_id; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registry_regionzonemapping
    ADD CONSTRAINT registry_regionzonemapping_zone_id_d93a3b97_fk_registry_zone_id FOREIGN KEY (zone_id) REFERENCES public.registry_zone(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_medicalpersonnel users_medicalpersonnel_user_id_a73faa23_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_medicalpersonnel
    ADD CONSTRAINT users_medicalpersonnel_user_id_a73faa23_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

