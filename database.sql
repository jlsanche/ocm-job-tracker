

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_firstname TEXT NOT NULL,
    user_lastname TEXT NOT NULL,
    user_username TEXT NOT NULL UNIQUE,
    user_email TEXT UNIQUE,
    user_password TEXT NOT NULL,
    user_admin BOOLEAN NOT NULL DEFAULT FALSE

);

CREATE TABLE customers (
    customer_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_firstname TEXT NOT NULL,
    customer_lastname TEXT NOT NULL,
    customer_email TEXT UNIQUE,
    customer_phone TEXT UNIQUE NOT NULL

);

--ALTER TYPE enum_type ADD VALUE 'new_value'; -- appends to list
CREATE TYPE job_status AS ENUM('staged', 'wip', 'on hold', 'completed');
CREATE TYPE job_type AS ENUM(   'oil change', 
                                'brakes', 
                                'suspension', 
                                'engine', 
                                'electrical',
                                'transmission',
                                'other');


CREATE TABLE jobs (
    job_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_stat job_status NOT NULL,
    job_typ job_type NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    job_notes TEXT,
    created_by uuid REFERENCES users(user_id),
    job_is_for uuid REFERENCES customers(customer_id)

);





