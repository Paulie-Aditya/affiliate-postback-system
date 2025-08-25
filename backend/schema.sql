-- affiliates table
CREATE TABLE affiliates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- campaigns table  
CREATE TABLE campaigns (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- clicks table
CREATE TABLE clicks (
  id SERIAL PRIMARY KEY,
  affiliate_id INTEGER REFERENCES affiliates(id),
  campaign_id INTEGER REFERENCES campaigns(id),
  click_id VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  UNIQUE(affiliate_id, campaign_id, click_id)
);

-- conversions table
CREATE TABLE conversions (
  id SERIAL PRIMARY KEY,
  click_id INTEGER REFERENCES clicks(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);
