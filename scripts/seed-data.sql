-- Seed data for BloodFlow AI demo

-- Insert demo user
INSERT INTO users (id, email, password_hash, organization_name, organization_type, region) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'admin@demo.com', '$2b$10$hash', 'Central Blood Bank', 'blood-bank', 'north-america')
ON CONFLICT (email) DO NOTHING;

-- Insert blood inventory data
INSERT INTO blood_inventory (organization_id, blood_type, current_units, required_units, status) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'O+', 45, 60, 'low'),
('550e8400-e29b-41d4-a716-446655440000', 'A+', 78, 50, 'good'),
('550e8400-e29b-41d4-a716-446655440000', 'B+', 32, 40, 'critical'),
('550e8400-e29b-41d4-a716-446655440000', 'AB+', 25, 20, 'good'),
('550e8400-e29b-41d4-a716-446655440000', 'O-', 15, 30, 'critical'),
('550e8400-e29b-41d4-a716-446655440000', 'A-', 28, 25, 'good'),
('550e8400-e29b-41d4-a716-446655440000', 'B-', 12, 20, 'low'),
('550e8400-e29b-41d4-a716-446655440000', 'AB-', 8, 10, 'low')
ON CONFLICT DO NOTHING;

-- Insert demand predictions
INSERT INTO demand_predictions (organization_id, blood_type, predicted_date, predicted_demand, confidence_score) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'O+', CURRENT_DATE + INTERVAL '1 day', 85, 0.94),
('550e8400-e29b-41d4-a716-446655440000', 'A+', CURRENT_DATE + INTERVAL '1 day', 65, 0.92),
('550e8400-e29b-41d4-a716-446655440000', 'B+', CURRENT_DATE + INTERVAL '1 day', 45, 0.89),
('550e8400-e29b-41d4-a716-446655440000', 'O-', CURRENT_DATE + INTERVAL '1 day', 35, 0.96),
('550e8400-e29b-41d4-a716-446655440000', 'B-', CURRENT_DATE + INTERVAL '1 day', 25, 0.91)
ON CONFLICT DO NOTHING;

-- Insert blood drives
INSERT INTO blood_drives (organization_id, location, scheduled_date, expected_donors, target_blood_types, status) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Central Community Center', CURRENT_DATE + INTERVAL '1 day' + INTERVAL '9 hours', 25, ARRAY['O-', 'B-'], 'scheduled'),
('550e8400-e29b-41d4-a716-446655440000', 'University Campus', CURRENT_DATE + INTERVAL '3 days' + INTERVAL '14 hours', 40, ARRAY['A+', 'O+'], 'scheduled')
ON CONFLICT DO NOTHING;

-- Insert sample donors
INSERT INTO donors (organization_id, name, email, phone, blood_type, location, active) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'John Smith', 'john@email.com', '+1234567890', 'O+', 'Downtown', true),
('550e8400-e29b-41d4-a716-446655440000', 'Sarah Johnson', 'sarah@email.com', '+1234567891', 'A+', 'Midtown', true),
('550e8400-e29b-41d4-a716-446655440000', 'Mike Davis', 'mike@email.com', '+1234567892', 'B-', 'Uptown', true),
('550e8400-e29b-41d4-a716-446655440000', 'Lisa Wilson', 'lisa@email.com', '+1234567893', 'O-', 'Downtown', true),
('550e8400-e29b-41d4-a716-446655440000', 'David Brown', 'david@email.com', '+1234567894', 'AB+', 'Suburbs', true)
ON CONFLICT DO NOTHING;

-- Insert alerts
INSERT INTO alerts (organization_id, type, message, blood_type, action_required, resolved) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'critical', 'B- blood type critically low (12 units remaining)', 'B-', 'Schedule emergency drive', false),
('550e8400-e29b-41d4-a716-446655440000', 'warning', 'O+ demand spike predicted for tomorrow (+25%)', 'O+', 'Contact donors', false),
('550e8400-e29b-41d4-a716-446655440000', 'info', 'Successful blood drive completed - 45 new units', NULL, 'Update inventory', true)
ON CONFLICT DO NOTHING;
