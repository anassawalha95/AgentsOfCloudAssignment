create database booking_app;


create table users(
    id serial primary key,
    first_name varchar(255),
    middle_name varchar(255),
    last_name varchar(255),
    email varchar(255)  NOT NULL,
    phone_number INT NOT NULL,
    title varchar(255),
    user_role_id INT NOT NULL,
    user_industry_id INT NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY(user_role_id) REFERENCES roles(id),
    CONSTRAINT fk_industry FOREIGN KEY(user_industry_id) REFERENCES industry(id)
);

-- buyer seller 
create table roles(   id serial primary key,   user_role varchar(255));

-- user service like 
-- create table services(
--     id serial primary key,
--     service_type varchar(255)
-- );


create table industry(
    id serial primary key,
    industry_type varchar(255)
);

create table appointments(
    id serial primary key,
    user_id INT NOT NULL,
    service_provider_id  INT NOT NULL,

    selected_date Date,
    from_time time  not NULL,
    to_time time  not NULL,
    appointment_status int not NULL,
    description TEXT,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_service_provider_id FOREIGN KEY(service_provider_id) REFERENCES users(id)
);


