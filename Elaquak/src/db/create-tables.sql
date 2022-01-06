CREATE TABLE IF NOT EXISTS ducks (
    id uuid PRIMARY KEY,
    title text NOT NULL,
    description text,
    price integer,
    image_src varchar (255)
);

CREATE TABLE IF NOT EXISTS stocks (
    id uuid PRIMARY KEY,
    count integer,
    CONSTRAINT fk_duck
      FOREIGN KEY(id) 
	  REFERENCES ducks(id)
);
