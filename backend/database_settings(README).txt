PostgreSQL settings:
	user: developer
	password: developer
	port: 5432
	host: localhost

Table "users" :

	CREATE TABLE IF NOT EXISTS public.users
	(
	    id uuid NOT NULL,
	    nickname character varying COLLATE pg_catalog."default",
	    name character varying COLLATE pg_catalog."default",
	    password character varying COLLATE pg_catalog."default",
	    email character varying COLLATE pg_catalog."default",
		"isAdmin" boolean DEFAULT false,
	    CONSTRAINT users_pkey PRIMARY KEY (id),
	    CONSTRAINT "uniqueEmail" UNIQUE (email),
	    CONSTRAINT "uniqueNickname" UNIQUE (nickname)
	)

	TABLESPACE pg_default;

	ALTER TABLE IF EXISTS public.users
	    OWNER to developer;