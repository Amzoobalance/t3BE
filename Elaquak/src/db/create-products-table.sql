CREATE TABLE IF NOT EXISTS ducks (
    id uuid PRIMARY KEY,
    title text NOT NULL,
    description text,
    price integer,
    image_src varchar (255)
);
