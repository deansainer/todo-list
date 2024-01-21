create database todo_app;

CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    title VARCHAR(255),
    progress INT,
    date VARCHAR(255)
);

create table users(
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255)
);

insert into todos(id, email, title, progress, date) values ('1', 'ania@gmail.com', 'wash the dishes', 0, 'Thu Jan 04 2024 21:41:20 GMT+0100 (Central European Standard Time)');