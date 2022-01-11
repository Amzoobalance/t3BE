CREATE TABLE IF NOT EXISTS stocks (
    id uuid PRIMARY KEY,
    count integer,
    CONSTRAINT fk_duck
      FOREIGN KEY(id) 
	  REFERENCES ducks(id)
);
