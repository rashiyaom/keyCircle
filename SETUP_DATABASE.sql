-- =============================================
-- COMPLETE DATABASE SETUP FOR VICTORIANS
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. RENTAL REQUESTS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS rental_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Request details
  vehicle_id UUID NOT NULL,
  renter_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  
  -- Booking details
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  duration_hours INTEGER NOT NULL,
  total_cost DECIMAL(10, 2) NOT NULL,
  
  -- Renter information
  renter_name VARCHAR(100) NOT NULL,
  renter_email VARCHAR(255) NOT NULL,
  renter_phone VARCHAR(20) NOT NULL,
  renter_license_number VARCHAR(50),
  emergency_contact VARCHAR(20),
  
  -- Status tracking
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed', 'cancelled')),
  
  -- Owner response
  owner_response TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  
  -- Payment status
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_method VARCHAR(50),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Completion details
  actual_start_time TIMESTAMP WITH TIME ZONE,
  actual_end_time TIMESTAMP WITH TIME ZONE,
  
  -- Notes
  special_requests TEXT,
  cancellation_reason TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_rental_requests_vehicle ON rental_requests(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_rental_requests_renter ON rental_requests(renter_id);
CREATE INDEX IF NOT EXISTS idx_rental_requests_owner ON rental_requests(owner_id);
CREATE INDEX IF NOT EXISTS idx_rental_requests_status ON rental_requests(status);
CREATE INDEX IF NOT EXISTS idx_rental_requests_pickup ON rental_requests(pickup_date);

-- RLS Policies
ALTER TABLE rental_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own rental requests" ON rental_requests;
CREATE POLICY "Users can view own rental requests"
  ON rental_requests FOR SELECT
  USING (auth.uid() = renter_id OR auth.uid() = owner_id);

DROP POLICY IF EXISTS "Users can create rental requests" ON rental_requests;
CREATE POLICY "Users can create rental requests"
  ON rental_requests FOR INSERT
  WITH CHECK (auth.uid() = renter_id);

DROP POLICY IF EXISTS "Owners can update rental requests" ON rental_requests;
CREATE POLICY "Owners can update rental requests"
  ON rental_requests FOR UPDATE
  USING (auth.uid() = owner_id);

DROP POLICY IF EXISTS "Renters can update own requests" ON rental_requests;
CREATE POLICY "Renters can update own requests"
  ON rental_requests FOR UPDATE
  USING (auth.uid() = renter_id AND status = 'pending');

-- =============================================
-- 2. USER DASHBOARD STATS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS user_dashboard_stats (
  user_id UUID PRIMARY KEY,
  
  -- As Renter
  total_rentals INTEGER DEFAULT 0,
  active_rentals INTEGER DEFAULT 0,
  pending_requests INTEGER DEFAULT 0,
  completed_rentals INTEGER DEFAULT 0,
  cancelled_rentals INTEGER DEFAULT 0,
  total_spent DECIMAL(10, 2) DEFAULT 0,
  hours_rented INTEGER DEFAULT 0,
  
  -- As Owner
  total_vehicles_listed INTEGER DEFAULT 0,
  active_vehicles INTEGER DEFAULT 0,
  total_rental_requests INTEGER DEFAULT 0,
  pending_incoming_requests INTEGER DEFAULT 0,
  accepted_requests INTEGER DEFAULT 0,
  rejected_requests INTEGER DEFAULT 0,
  total_earned DECIMAL(10, 2) DEFAULT 0,
  hours_rented_out INTEGER DEFAULT 0,
  
  -- Ratings
  average_rating_as_renter DECIMAL(3, 2) DEFAULT 0,
  average_rating_as_owner DECIMAL(3, 2) DEFAULT 0,
  total_reviews_received INTEGER DEFAULT 0,
  total_reviews_given INTEGER DEFAULT 0,
  
  -- Achievements
  verified_user BOOLEAN DEFAULT false,
  trusted_owner BOOLEAN DEFAULT false,
  top_renter BOOLEAN DEFAULT false,
  
  -- Last updated
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE user_dashboard_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own stats" ON user_dashboard_stats;
CREATE POLICY "Users can view own stats"
  ON user_dashboard_stats FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own stats" ON user_dashboard_stats;
CREATE POLICY "Users can insert own stats"
  ON user_dashboard_stats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own stats" ON user_dashboard_stats;
CREATE POLICY "Users can update own stats"
  ON user_dashboard_stats FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- 3. TRIGGER FUNCTIONS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to rental_requests
DROP TRIGGER IF EXISTS update_rental_requests_updated_at ON rental_requests;
CREATE TRIGGER update_rental_requests_updated_at
  BEFORE UPDATE ON rental_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Attach trigger to user_dashboard_stats
DROP TRIGGER IF EXISTS update_user_dashboard_stats_updated_at ON user_dashboard_stats;
CREATE TRIGGER update_user_dashboard_stats_updated_at
  BEFORE UPDATE ON user_dashboard_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 4. FUNCTION TO UPDATE STATS ON RENTAL CHANGES
-- =============================================

CREATE OR REPLACE FUNCTION update_user_stats_on_rental()
RETURNS TRIGGER AS $$
BEGIN
  -- Update renter stats
  IF TG_OP = 'INSERT' THEN
    INSERT INTO user_dashboard_stats (user_id, total_rentals, pending_requests)
    VALUES (NEW.renter_id, 1, 1)
    ON CONFLICT (user_id) DO UPDATE SET
      total_rentals = user_dashboard_stats.total_rentals + 1,
      pending_requests = user_dashboard_stats.pending_requests + 1,
      updated_at = NOW();
      
    -- Update owner stats
    INSERT INTO user_dashboard_stats (user_id, total_rental_requests, pending_incoming_requests)
    VALUES (NEW.owner_id, 1, 1)
    ON CONFLICT (user_id) DO UPDATE SET
      total_rental_requests = user_dashboard_stats.total_rental_requests + 1,
      pending_incoming_requests = user_dashboard_stats.pending_incoming_requests + 1,
      updated_at = NOW();
      
  ELSIF TG_OP = 'UPDATE' THEN
    -- Update when status changes
    IF OLD.status != NEW.status THEN
      -- Renter stats
      IF NEW.status = 'accepted' THEN
        UPDATE user_dashboard_stats SET
          pending_requests = GREATEST(0, pending_requests - 1),
          active_rentals = active_rentals + 1,
          updated_at = NOW()
        WHERE user_id = NEW.renter_id;
      ELSIF NEW.status = 'rejected' THEN
        UPDATE user_dashboard_stats SET
          pending_requests = GREATEST(0, pending_requests - 1),
          cancelled_rentals = cancelled_rentals + 1,
          updated_at = NOW()
        WHERE user_id = NEW.renter_id;
      ELSIF NEW.status = 'completed' THEN
        UPDATE user_dashboard_stats SET
          active_rentals = GREATEST(0, active_rentals - 1),
          completed_rentals = completed_rentals + 1,
          total_spent = total_spent + NEW.total_cost,
          hours_rented = hours_rented + NEW.duration_hours,
          updated_at = NOW()
        WHERE user_id = NEW.renter_id;
      ELSIF NEW.status = 'cancelled' THEN
        UPDATE user_dashboard_stats SET
          active_rentals = GREATEST(0, active_rentals - 1),
          cancelled_rentals = cancelled_rentals + 1,
          updated_at = NOW()
        WHERE user_id = NEW.renter_id;
      END IF;
      
      -- Owner stats
      IF NEW.status = 'accepted' THEN
        UPDATE user_dashboard_stats SET
          pending_incoming_requests = GREATEST(0, pending_incoming_requests - 1),
          accepted_requests = accepted_requests + 1,
          updated_at = NOW()
        WHERE user_id = NEW.owner_id;
      ELSIF NEW.status = 'rejected' THEN
        UPDATE user_dashboard_stats SET
          pending_incoming_requests = GREATEST(0, pending_incoming_requests - 1),
          rejected_requests = rejected_requests + 1,
          updated_at = NOW()
        WHERE user_id = NEW.owner_id;
      ELSIF NEW.status = 'completed' THEN
        UPDATE user_dashboard_stats SET
          total_earned = total_earned + NEW.total_cost,
          hours_rented_out = hours_rented_out + NEW.duration_hours,
          updated_at = NOW()
        WHERE user_id = NEW.owner_id;
      END IF;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger
DROP TRIGGER IF EXISTS trigger_update_user_stats_on_rental ON rental_requests;
CREATE TRIGGER trigger_update_user_stats_on_rental
  AFTER INSERT OR UPDATE ON rental_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_user_stats_on_rental();

-- =============================================
-- 5. INITIALIZE STATS FOR EXISTING USERS
-- =============================================

-- Initialize stats for all existing users
INSERT INTO user_dashboard_stats (user_id)
SELECT id FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- =============================================
-- SETUP COMPLETE!
-- =============================================

SELECT 'Database setup complete! ✅' as status;
