-- Create database schema for BloodFlow AI

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    organization_type VARCHAR(50) NOT NULL CHECK (organization_type IN ('blood-bank', 'hospital', 'health-ministry')),
    region VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blood inventory table
CREATE TABLE IF NOT EXISTS blood_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES users(id) ON DELETE CASCADE,
    blood_type VARCHAR(5) NOT NULL CHECK (blood_type IN ('O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-')),
    current_units INTEGER NOT NULL DEFAULT 0,
    required_units INTEGER NOT NULL DEFAULT 0,
    expiry_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'good' CHECK (status IN ('good', 'low', 'critical')),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Demand predictions table
CREATE TABLE IF NOT EXISTS demand_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES users(id) ON DELETE CASCADE,
    blood_type VARCHAR(5) NOT NULL,
    predicted_date DATE NOT NULL,
    predicted_demand INTEGER NOT NULL,
    confidence_score DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    factors JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blood drives table
CREATE TABLE IF NOT EXISTS blood_drives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES users(id) ON DELETE CASCADE,
    location VARCHAR(255) NOT NULL,
    scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
    expected_donors INTEGER DEFAULT 0,
    actual_donors INTEGER DEFAULT 0,
    target_blood_types VARCHAR(50)[],
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'active', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donors table
CREATE TABLE IF NOT EXISTS donors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    blood_type VARCHAR(5) NOT NULL,
    last_donation_date DATE,
    eligible_date DATE,
    location VARCHAR(255),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('critical', 'warning', 'info')),
    message TEXT NOT NULL,
    blood_type VARCHAR(5),
    action_required VARCHAR(255),
    resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES users(id) ON DELETE CASCADE,
    donor_id UUID REFERENCES donors(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('emergency', 'reminder', 'thank_you')),
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    opened BOOLEAN DEFAULT false
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blood_inventory_org_type ON blood_inventory(organization_id, blood_type);
CREATE INDEX IF NOT EXISTS idx_demand_predictions_org_date ON demand_predictions(organization_id, predicted_date);
CREATE INDEX IF NOT EXISTS idx_blood_drives_org_date ON blood_drives(organization_id, scheduled_date);
CREATE INDEX IF NOT EXISTS idx_donors_org_type ON donors(organization_id, blood_type);
CREATE INDEX IF NOT EXISTS idx_alerts_org_resolved ON alerts(organization_id, resolved);
CREATE INDEX IF NOT EXISTS idx_notifications_donor_sent ON notifications(donor_id, sent_at);
