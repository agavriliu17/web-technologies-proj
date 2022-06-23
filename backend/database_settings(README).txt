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


Table "services":

	CREATE TABLE IF NOT EXISTS public.services
	(
		id uuid NOT NULL,
		name character varying COLLATE pg_catalog."default",
		description character varying COLLATE pg_catalog."default",
		price character varying COLLATE pg_catalog."default",
		region character varying COLLATE pg_catalog."default",
		CONSTRAINT services_pkey PRIMARY KEY (id)
	)

	TABLESPACE pg_default;

	ALTER TABLE IF EXISTS public.services
		OWNER to developer;

Table "orders":

	CREATE TABLE IF NOT EXISTS public.orders
	(
		id uuid NOT NULL,
		id_user uuid,
		id_service uuid,
		date date,
		CONSTRAINT "Order ID" PRIMARY KEY (id),
		CONSTRAINT "Service ID" FOREIGN KEY (id_service)
			REFERENCES public.services (id) MATCH SIMPLE
			ON UPDATE CASCADE
			ON DELETE CASCADE
			NOT VALID,
		CONSTRAINT "User ID" FOREIGN KEY (id_user)
			REFERENCES public.users (id) MATCH SIMPLE
			ON UPDATE CASCADE
			ON DELETE CASCADE
			NOT VALID
	)

	TABLESPACE pg_default;

	ALTER TABLE IF EXISTS public.orders
		OWNER to developer;