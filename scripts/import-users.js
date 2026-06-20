const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load env variables manually from .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('Error: .env.local file not found. Please create it first.');
    process.exit(1);
  }
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const parts = trimmed.split('=');
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    env[key] = val;
  }
  return env;
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  console.log('Ensure you have got the service_role key from Supabase Dashboard (Settings -> API)');
  process.exit(1);
}

// Initialize Supabase Client with the service_role key (bypasses RLS & allows user creation)
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// CSV parser function
function parseCSV(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Error: CSV file not found at ${filePath}`);
    process.exit(1);
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
  
  if (lines.length === 0) {
    console.error('Error: CSV file is empty');
    process.exit(1);
  }
  
  // Extract headers
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const users = [];
  
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.trim());
    if (cols.length < headers.length) continue;
    
    const user = {};
    headers.forEach((header, index) => {
      user[header] = cols[index];
    });
    users.push(user);
  }
  
  return users;
}

async function importUsers() {
  const csvPath = path.join(__dirname, '..', 'users.csv');
  console.log(`Reading users from ${csvPath}...`);
  
  const users = parseCSV(csvPath);
  console.log(`Found ${users.length} users in CSV.`);
  
  for (const user of users) {
    const { email, password, name, department, batch_year } = user;
    
    if (!email || !password) {
      console.log(`Skipping invalid row: email and password are required.`, user);
      continue;
    }
    
    console.log(`Creating user: ${email} (${name || 'No Name'})...`);
    
    // Create the user in auth.users (trigger handles copying to public.profiles)
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email so they can log in immediately
      user_metadata: {
        name: name || splitEmail(email),
        department: department || '',
        batch_year: batch_year || ''
      }
    });
    
    if (error) {
      console.error(`❌ Failed to create ${email}:`, error.message);
    } else {
      console.log(`✅ Successfully created ${email} (ID: ${data.user.id})`);
    }
  }
  
  console.log('Import completed.');
}

function splitEmail(email) {
  return email.split('@')[0];
}

importUsers().catch(console.error);
