CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE user_role AS ENUM ('admin', 'user');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'expired');
CREATE TYPE briefing_status AS ENUM ('draft', 'completed', 'failed');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
);

CREATE TABLE briefings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    generated_content TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_briefings_user_id ON briefings(user_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_briefings_updated_at
BEFORE UPDATE ON briefings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();