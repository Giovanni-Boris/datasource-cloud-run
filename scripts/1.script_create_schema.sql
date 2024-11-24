-- Drop schema
DROP SCHEMA IF EXISTS ecommerce CASCADE;

-- Create schema 
CREATE SCHEMA IF NOT EXISTS ecommerce;

-- Delete Extension
DROP EXTENSION IF EXISTS pg_trgm;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA pg_catalog;