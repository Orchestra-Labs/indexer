-- Up Migration

CREATE INDEX market_params_created_at_index ON market_params (created_at);

-- Down Migration

DROP INDEX market_params_created_at_index;