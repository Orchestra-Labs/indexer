-- Up Migration

CREATE TABLE market_params (
    block_height BIGINT NOT NULL,
    exchange_pool BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (block_height)
);


-- Down Migration

DROP TABLE market_params;