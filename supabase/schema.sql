-- Schema SQL for EducNest Supabase Database
-- This file contains all the tables, policies, and initial data for the MVP

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Universities table
CREATE TABLE universities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  acronym VARCHAR(50) NOT NULL,
  site VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Schools table
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  acronym VARCHAR(50) NOT NULL,
  university_id UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  school_id UUID REFERENCES schools(id),
  university_id UUID REFERENCES universities(id),
  level VARCHAR(20),
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(20) NOT NULL CHECK (category IN ('memoire', 'cours', 'epreuve', 'these', 'td')),
  type VARCHAR(50) NOT NULL,
  school_id UUID NOT NULL REFERENCES schools(id),
  university_id UUID NOT NULL REFERENCES universities(id),
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  price INTEGER NOT NULL DEFAULT 400,
  description TEXT,
  level VARCHAR(20),
  year INTEGER,
  downloads_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type VARCHAR(20) NOT NULL CHECK (plan_type IN ('monthly', 'yearly')),
  price INTEGER NOT NULL,
  tokens_remaining INTEGER DEFAULT 10,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- Downloads table
CREATE TABLE downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  tokens_used INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_documents_school_id ON documents(school_id);
CREATE INDEX idx_documents_university_id ON documents(university_id);
CREATE INDEX idx_documents_level ON documents(level);
CREATE INDEX idx_documents_year ON documents(year);
CREATE INDEX idx_documents_is_public ON documents(is_public);
CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_school_id ON user_profiles(school_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_is_active ON subscriptions(is_active);
CREATE INDEX idx_downloads_user_id ON downloads(user_id);
CREATE INDEX idx_downloads_document_id ON downloads(document_id);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for documents
CREATE POLICY "Anyone can view public documents" ON documents
  FOR SELECT USING (is_public = true);

CREATE POLICY "Subscribed users can view all documents" ON documents
  FOR SELECT USING (
    is_public = true OR 
    EXISTS (
      SELECT 1 FROM subscriptions 
      WHERE subscriptions.user_id = auth.uid() 
      AND subscriptions.is_active = true 
      AND subscriptions.expires_at > CURRENT_TIMESTAMP
    )
  );

CREATE POLICY "Teachers and admins can insert documents" ON documents
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.user_id = auth.uid() 
      AND user_profiles.role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "Document authors and admins can update documents" ON documents
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.user_id = auth.uid() 
      AND user_profiles.role = 'admin'
    )
  );

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for downloads
CREATE POLICY "Users can view own downloads" ON downloads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own downloads" ON downloads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_universities_updated_at BEFORE UPDATE ON universities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to check if user has active subscription
CREATE OR REPLACE FUNCTION has_active_subscription(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM subscriptions 
    WHERE subscriptions.user_id = user_uuid 
    AND subscriptions.is_active = true 
    AND subscriptions.expires_at > CURRENT_TIMESTAMP
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement tokens on download
CREATE OR REPLACE FUNCTION decrement_download_tokens(document_uuid UUID, user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  -- Check if user has active subscription
  IF NOT has_active_subscription(user_uuid) THEN
    RAISE EXCEPTION 'User does not have active subscription';
  END IF;
  
  -- Get subscription
  SELECT tokens_remaining INTO current_tokens
  FROM subscriptions 
  WHERE user_id = user_uuid AND is_active = true;
  
  -- Check if user has enough tokens
  IF current_tokens < 1 THEN
    RAISE EXCEPTION 'Insufficient tokens for download';
  END IF;
  
  -- Decrement tokens
  UPDATE subscriptions 
  SET tokens_remaining = tokens_remaining - 1 
  WHERE user_id = user_uuid AND is_active = true;
  
  -- Record download
  INSERT INTO downloads (user_id, document_id, tokens_used)
  VALUES (user_uuid, document_uuid, 1);
  
  -- Increment download count
  UPDATE documents 
  SET downloads_count = downloads_count + 1 
  WHERE id = document_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert initial data for UNA
INSERT INTO universities (id, name, acronym, site, description) VALUES
('uuid-una', 'Université Nationale d''Agriculture', 'UNA', 'Kétou, Parakou, Dassa, Tchetti', 'Première université agricole du Bénin, dédiée à la formation et à la recherche en sciences agronomiques.');

-- Insert schools for UNA
INSERT INTO schools (id, name, acronym, university_id, description) VALUES
('uuid-cag', 'Centre Agricole et de Gestion', 'CAG', 'uuid-una', 'Formation en gestion agricole, économie rurale et développement'),
('uuid-efort', 'École de Foresterie Tropicale', 'EForT', 'uuid-una', 'Formation en foresterie, environnement et gestion des ressources naturelles'),
('uuid-eapa', 'École d''Aménagement et de Production Animale', 'EAPA', 'uuid-una', 'Formation en élevage et production animale'),
('uuid-eaq', 'École d''Aquaculture', 'EAQ', 'uuid-una', 'Formation en pisciculture et aquaculture'),
('uuid-edsae', 'École Doctorale des Sciences Agronomiques et de l''Environnement', 'EDSAE', 'uuid-una', 'Formation doctorale en sciences agronomiques et environnement'),
('uuid-egese', 'École de Génie des Équipements et de la Sécurité Alimentaire', 'EGESE', 'uuid-una', 'Formation en mécanisation agricole et sécurité alimentaire'),
('uuid-egpvs', 'École de Génie des Procédés et de la Valorisation des Systèmes', 'EGPVS', 'uuid-una', 'Formation en transformation agroalimentaire et procédés industriels'),
('uuid-egr', 'École de Gestion et de Revenus', 'EGR', 'uuid-una', 'Formation en gestion financière et comptabilité agricole'),
('uuid-eheav', 'École des Hautes Études d''Aménagement et de Valorisation', 'EHEAV', 'uuid-una', 'Formation en aménagement du territoire et valorisation des ressources'),
('uuid-ersva', 'École de Recherche et de Services Vétérinaires et Agricoles', 'ERSVA', 'uuid-una', 'Formation en santé animale et services vétérinaires'),
('uuid-estctpa', 'École Supérieure des Techniques et de la Commercialisation des Produits Agricoles', 'ESTCTPA', 'uuid-una', 'Formation en transformation et commercialisation des produits agricoles');

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true);

-- Storage policies
CREATE POLICY "Anyone can view documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'documents');

CREATE POLICY "Authenticated users can upload documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents' AND 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Document owners can update documents" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Document owners can delete documents" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );
