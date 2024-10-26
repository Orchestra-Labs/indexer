-- Up Migration

CREATE TABLE tax_rate (
   block_height BIGINT NOT NULL,
   tax_rate BIGINT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

   PRIMARY KEY (block_height)
);

-- Down Migration

DROP TABLE tax_rate;