-- Enhanced seed data for innovative features

-- Insert blockchain credentials
INSERT INTO blockchain_credentials (donor_id, credential_type, blockchain_hash, issuer, metadata) 
SELECT 
    d.id,
    'blood_type_verification',
    '0x' || substr(md5(d.id::text || 'blood_type'), 1, 64),
    'Central Lab Network',
    jsonb_build_object('blood_type', d.blood_type, 'verified_date', '2024-01-15')
FROM donors d
WHERE d.organization_id = '550e8400-e29b-41d4-a716-446655440000'
ON CONFLICT DO NOTHING;

-- Insert peer reviews
INSERT INTO peer_reviews (reviewer_organization_id, reviewed_organization_id, donor_id, rating, comment) VALUES
('550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 
 (SELECT id FROM donors WHERE name = 'John Smith' LIMIT 1), 5, 'Excellent donor experience, professional staff'),
('550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 
 (SELECT id FROM donors WHERE name = 'Sarah Johnson' LIMIT 1), 5, 'Quick processing, clean facilities'),
('550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 
 (SELECT id FROM donors WHERE name = 'Mike Davis' LIMIT 1), 4, 'Good service, minor wait time')
ON CONFLICT DO NOTHING;

-- Insert AI predictions with multi-source data
INSERT INTO ai_predictions (organization_id, prediction_date, blood_type, baseline_prediction, climate_factor, events_factor, demographics_factor, emergency_factor, combined_prediction, confidence_score, data_sources) VALUES
('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE + INTERVAL '1 day', 'O+', 85, 1.08, 0.92, 1.04, 1.12, 89, 0.94, '{"climate": "monsoon_season", "events": "music_festival", "demographics": "age_distribution", "emergency": "accident_rates"}'),
('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE + INTERVAL '2 days', 'A+', 82, 1.07, 1.04, 1.02, 1.10, 86, 0.91, '{"climate": "heavy_rainfall", "events": "weekend_activities", "demographics": "population_density", "emergency": "hospital_capacity"}'),
('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE + INTERVAL '3 days', 'B+', 78, 1.09, 1.22, 1.05, 1.13, 91, 0.88, '{"climate": "storm_warning", "events": "large_gathering", "demographics": "health_statistics", "emergency": "emergency_services"}')
ON CONFLICT DO NOTHING;

-- Insert geofenced alerts
INSERT INTO geofenced_alerts (organization_id, blood_type, urgency_level, location_name, latitude, longitude, expected_donors, wait_time_minutes, incentive_description) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'A+', 'critical', 'Downtown District', 40.7128, -74.0060, 45, 5, 'Free coffee + $10 voucher'),
('550e8400-e29b-41d4-a716-446655440000', 'O-', 'high', 'University Area', 40.7589, -73.9851, 23, 12, 'Priority parking + Badge'),
('550e8400-e29b-41d4-a716-446655440000', 'B+', 'medium', 'Midtown Plaza', 40.7505, -73.9934, 18, 8, 'Health screening + Points')
ON CONFLICT DO NOTHING;

-- Insert risk factors
INSERT INTO risk_factors (organization_id, factor_name, factor_type, probability, impact_level, affected_blood_types, description, timeframe, data_source) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Monsoon Season', 'climate', 0.85, 'high', ARRAY['O+', 'O-', 'A+'], 'Heavy rainfall increases accident rates by 35%', 'Next 7 days', 'Weather API'),
('550e8400-e29b-41d4-a716-446655440000', 'Music Festival', 'social', 0.72, 'medium', ARRAY['A+', 'B+', 'AB+'], '50,000 attendees expected downtown', 'This weekend', 'Events Calendar API'),
('550e8400-e29b-41d4-a716-446655440000', 'Dengue Outbreak', 'health', 0.91, 'critical', ARRAY['A+', 'AB+', 'B+'], 'Cases rising 40% in District 5', 'Ongoing', 'Health Department API'),
('550e8400-e29b-41d4-a716-446655440000', 'Surgery Backlog', 'emergency', 0.88, 'high', ARRAY['O-', 'A-', 'B-'], 'Cardiac surgery queue increased post-holiday', 'Next 14 days', 'Hospital Management System')
ON CONFLICT DO NOTHING;
