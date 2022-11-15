CREATE TABLE books (
    id INT NOT NULL,
    category_id INT NOT NULL,
    author character varying not null,
    title character varying not null,
    year int not null
);

CREATE INDEX books_category_id_idx ON books USING btree(category_id);