-- Create input_dealers table
CREATE TABLE IF NOT EXISTS input_dealers (
    dealer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create input_products table
CREATE TABLE IF NOT EXISTS input_products (
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dealer_id UUID REFERENCES input_dealers(dealer_id),
    product_name VARCHAR(200) NOT NULL,
    brand VARCHAR(100),
    pack_size VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create input_orders table
CREATE TABLE IF NOT EXISTS input_orders (
    order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id UUID NOT NULL,
    items JSONB NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_dealer_id ON input_products(dealer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON input_orders(status);
CREATE INDEX IF NOT EXISTS idx_dealers_created_at ON input_dealers(created_at);