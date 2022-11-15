CREATE EXTENSION postgres_fdw;

CREATE SERVER db_part0 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'db_part0', dbname 'scaling');
CREATE SERVER db_part1 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'db_part1', dbname 'scaling');
CREATE SERVER db_part2 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'db_part2', dbname 'scaling');
CREATE SERVER db_part3 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'db_part3', dbname 'scaling');
CREATE SERVER db_part4 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'db_part4', dbname 'scaling');
CREATE SERVER db_part5 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'db_part5', dbname 'scaling');
CREATE SERVER db_part6 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'db_part6', dbname 'scaling');
CREATE SERVER db_part7 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'db_part7', dbname 'scaling');
CREATE SERVER db_part8 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'db_part8', dbname 'scaling');
CREATE SERVER db_part9 FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'db_part9', dbname 'scaling');

CREATE USER MAPPING FOR CURRENT_USER SERVER db_part0 OPTIONS (user 'user', password 'pass');
CREATE USER MAPPING FOR CURRENT_USER SERVER db_part1 OPTIONS (user 'user', password 'pass');
CREATE USER MAPPING FOR CURRENT_USER SERVER db_part2 OPTIONS (user 'user', password 'pass');
CREATE USER MAPPING FOR CURRENT_USER SERVER db_part3 OPTIONS (user 'user', password 'pass');
CREATE USER MAPPING FOR CURRENT_USER SERVER db_part4 OPTIONS (user 'user', password 'pass');
CREATE USER MAPPING FOR CURRENT_USER SERVER db_part5 OPTIONS (user 'user', password 'pass');
CREATE USER MAPPING FOR CURRENT_USER SERVER db_part6 OPTIONS (user 'user', password 'pass');
CREATE USER MAPPING FOR CURRENT_USER SERVER db_part7 OPTIONS (user 'user', password 'pass');
CREATE USER MAPPING FOR CURRENT_USER SERVER db_part8 OPTIONS (user 'user', password 'pass');
CREATE USER MAPPING FOR CURRENT_USER SERVER db_part9 OPTIONS (user 'user', password 'pass');

CREATE FOREIGN TABLE books_0 (
    id bigint not null,
    category_id int not null,
    author character varying not null,
    title character varying not null,
    year int not null
) SERVER db_part0 OPTIONS (schema_name 'public', table_name 'books');

CREATE FOREIGN TABLE books_1 (
    id bigint not null,
    category_id int not null,
    author character varying not null,
    title character varying not null,
    year int not null
) SERVER db_part1 OPTIONS (schema_name 'public', table_name 'books');

CREATE FOREIGN TABLE books_2 (
    id bigint not null,
    category_id int not null,
    author character varying not null,
    title character varying not null,
    year int not null
) SERVER db_part2 OPTIONS (schema_name 'public', table_name 'books');

CREATE FOREIGN TABLE books_3 (
    id bigint not null,
    category_id int not null,
    author character varying not null,
    title character varying not null,
    year int not null
) SERVER db_part3 OPTIONS (schema_name 'public', table_name 'books');

CREATE FOREIGN TABLE books_4 (
    id bigint not null,
    category_id int not null,
    author character varying not null,
    title character varying not null,
    year int not null
) SERVER db_part4 OPTIONS (schema_name 'public', table_name 'books');

CREATE FOREIGN TABLE books_5 (
    id bigint not null,
    category_id int not null,
    author character varying not null,
    title character varying not null,
    year int not null
) SERVER db_part5 OPTIONS (schema_name 'public', table_name 'books');

CREATE FOREIGN TABLE books_6 (
    id bigint not null,
    category_id int not null,
    author character varying not null,
    title character varying not null,
    year int not null
) SERVER db_part6 OPTIONS (schema_name 'public', table_name 'books');

CREATE FOREIGN TABLE books_7 (
    id bigint not null,
    category_id int not null,
    author character varying not null,
    title character varying not null,
    year int not null
) SERVER db_part7 OPTIONS (schema_name 'public', table_name 'books');

CREATE FOREIGN TABLE books_8 (
    id bigint not null,
    category_id int not null,
    author character varying not null,
    title character varying not null,
    year int not null
) SERVER db_part8 OPTIONS (schema_name 'public', table_name 'books');

CREATE FOREIGN TABLE books_9 (
    id bigint not null,
    category_id int not null,
    author character varying not null,
    title character varying not null,
    year int not null
) SERVER db_part9 OPTIONS (schema_name 'public', table_name 'books');

CREATE VIEW books AS SELECT * FROM books_0
UNION ALL 
SELECT * FROM books_1
UNION ALL 
SELECT * FROM books_2
UNION ALL 
SELECT * FROM books_3
UNION ALL 
SELECT * FROM books_4
UNION ALL 
SELECT * FROM books_5
UNION ALL 
SELECT * FROM books_6
UNION ALL 
SELECT * FROM books_7
UNION ALL 
SELECT * FROM books_8
UNION ALL 
SELECT * FROM books_9;

CREATE RULE books_insert_to_0 AS ON INSERT TO books WHERE ( category_id = 0 ) DO INSTEAD INSERT INTO books_0 VALUES (NEW.*);
CREATE RULE books_insert_to_1 AS ON INSERT TO books WHERE ( category_id = 1 ) DO INSTEAD INSERT INTO books_1 VALUES (NEW.*);
CREATE RULE books_insert_to_2 AS ON INSERT TO books WHERE ( category_id = 2 ) DO INSTEAD INSERT INTO books_2 VALUES (NEW.*);
CREATE RULE books_insert_to_3 AS ON INSERT TO books WHERE ( category_id = 3 ) DO INSTEAD INSERT INTO books_3 VALUES (NEW.*);
CREATE RULE books_insert_to_4 AS ON INSERT TO books WHERE ( category_id = 4 ) DO INSTEAD INSERT INTO books_4 VALUES (NEW.*);
CREATE RULE books_insert_to_5 AS ON INSERT TO books WHERE ( category_id = 5 ) DO INSTEAD INSERT INTO books_5 VALUES (NEW.*);
CREATE RULE books_insert_to_6 AS ON INSERT TO books WHERE ( category_id = 6 ) DO INSTEAD INSERT INTO books_6 VALUES (NEW.*);
CREATE RULE books_insert_to_7 AS ON INSERT TO books WHERE ( category_id = 7 ) DO INSTEAD INSERT INTO books_7 VALUES (NEW.*);
CREATE RULE books_insert_to_8 AS ON INSERT TO books WHERE ( category_id = 8 ) DO INSTEAD INSERT INTO books_8 VALUES (NEW.*);
CREATE RULE books_insert_to_9 AS ON INSERT TO books WHERE ( category_id = 9 ) DO INSTEAD INSERT INTO books_9 VALUES (NEW.*);

CREATE RULE books_insert AS ON INSERT TO books DO INSTEAD NOTHING;
CREATE RULE books_update AS ON UPDATE TO books DO INSTEAD NOTHING;
CREATE RULE books_delete AS ON DELETE TO books DO INSTEAD NOTHING;