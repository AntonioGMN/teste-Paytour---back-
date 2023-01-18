	CREATE TABLE Form (
		id SERIAL PRIMARY KEY,
		nome TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
    "cargoDesejado" TEXT NOT NULL,
    escolaridade TEXT NOT NULL,
    observacoes TEXT NULL,
    arquivo TEXT NOT NULL,
		dataCriacao TIMESTAMP NOT NULL DEFAULT NOW(),
	);