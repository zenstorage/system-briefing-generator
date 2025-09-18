DROP DATABASE IF EXISTS "BriefingGenerationSystem";

CREATE DATABASE "BriefingGenerationSystem";

-- \c BriefingGenerationSystem;

CREATE TABLE public."Users" (
    id serial PRIMARY KEY NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) UNIQUE NOT NULL,
    password character varying(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS public."BriefingHistory" (
    id serial PRIMARY KEY,
    briefing text NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES public."Users"(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- SELECT * FROM public."Users";

-- Endpoints

-- [GET]: /users/?limit=30&after=0
SELECT * FROM public."Users"
LIMIT 30 OFFSET 0;

-- [GET]: /users/{id}
SELECT * FROM public."Users"
WHERE id = {id};

-- [POST]: /users/
-- {
--   "name": "User Name",
--   "email": "user@email.com",
--   "password": "UserPassword",
-- }
INSERT INTO public."Users" (name, email, password)
VALUES ({name}, {email}, {passwordHash});

-- [PATCH]: /users/{id}
-- {
--   "name": "UserName",
--   "email": "user@email.com",
--   "password": "UserPassword",
-- }
UPDATE public."Users"
SET name = {name}, email = {email}, password = {passwordHashed}
WHERE id = {id}

-- [DELETE]: /users/{id}
DELETE FROM public."Users"
WHERE id = {id};
