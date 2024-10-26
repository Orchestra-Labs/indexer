-- Up Migration

CREATE TABLE exchange_requirements (
    block_height BIGINT NOT NULL,
    total_denom VARCHAR(16) NOT NULL,
    total_amount BIGINT NOT NULL,
    base_denom VARCHAR(16) NOT NULL,
    exchange_rate NUMERIC(18, 4) NOT NULL,
    base_amount BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (block_height, base_denom)
);

-- Down Migration

DROP TABLE exchange_requirements;