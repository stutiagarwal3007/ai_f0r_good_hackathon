-- Enhanced database schema for blockchain integration

-- Blockchain credentials table
CREATE TABLE IF NOT EXISTS blockchain_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID REFERENCES donors(id) ON DELETE CASCADE,
    credential_type VARCHAR(100) NOT NULL,
    blockchain_hash VARCHAR(66) NOT NULL UNIQUE,
    issuer VARCHAR(255) NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked')),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Peer reviews table for blockchain network
CREATE TABLE IF NOT EXISTS peer_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reviewer_organization_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reviewed_organization_id UUID REFERENCES users(id) ON DELETE CASCADE,
    donor_id UUID REFERENCES donors(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_hash VARCHAR(66),
    anonymous BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced predictions with multi-source data
CREATE TABLE IF NOT EXISTS ai_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES users(id) ON DELETE CASCADE,
    prediction_date DATE NOT NULL,
    blood_type VARCHAR(5) NOT NULL,
    baseline_prediction INTEGER NOT NULL,
    climate_factor DECIMAL(3,2) DEFAULT 1.0,
    events_factor DECIMAL(3,2) DEFAULT 1.0,
    demographics_factor DECIMAL(3,2) DEFAULT 1.0,
    emergency_factor DECIMAL(3,2) DEFAULT 1.0,
    combined_prediction INTEGER NOT NULL,
    confidence_score DECIMAL(3,2) NOT NULL,
    data_sources JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Geofenced alerts table
CREATE TABLE IF NOT EXISTS geofenced_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES users(id) ON DELETE CASCADE,
    blood_type VARCHAR(5) NOT NULL,
    urgency_level VARCHAR(20) NOT NULL CHECK (urgency_level IN ('low', 'medium', 'high', 'critical')),
    location_name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    radius_km DECIMAL(5,2) DEFAULT 5.0,
    expected_donors INTEGER DEFAULT 0,
    wait_time_minutes INTEGER DEFAULT 0,
    incentive_description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Risk factors analysis table
CREATE TABLE IF NOT EXISTS risk_factors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES users(id) ON DELETE CASCADE,
    factor_name VARCHAR(255) NOT NULL,
    factor_type VARCHAR(50) NOT NULL CHECK (factor_type IN ('climate', 'social', 'health', 'emergency')),
    probability DECIMAL(3,2) NOT NULL CHECK (probability >= 0 AND probability <= 1),
    impact_level VARCHAR(20) NOT NULL CHECK (impact_level IN ('low', 'medium', 'high', 'critical')),
    affected_blood_types VARCHAR(50)[],
    description TEXT,
    timeframe VARCHAR(100),
    data_source VARCHAR(255),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for blockchain and enhanced features
CREATE INDEX IF NOT EXISTS idx_blockchain_credentials_donor ON blockchain_credentials(donor_id);
CREATE INDEX IF NOT EXISTS idx_blockchain_credentials_hash ON blockchain_credentials(blockchain_hash);
CREATE INDEX IF NOT EXISTS idx_peer_reviews_org ON peer_reviews(reviewed_organization_id);
CREATE INDEX IF NOT EXISTS idx_ai_predictions_org_date ON ai_predictions(organization_id, prediction_date);
CREATE INDEX IF NOT EXISTS idx_geofenced_alerts_location ON geofenced_alerts(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_risk_factors_org_active ON risk_factors(organization_id, active);
