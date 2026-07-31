const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'row.json');
const outputPath = path.join(__dirname, '..', 'import_users.sql');

if (!fs.existsSync(jsonPath)) {
  console.error('Error: row.json not found in the workspace root.');
  process.exit(1);
}

try {
  const users = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  let sqlContent = `-- ══════════════════════════════════════════════════════════════
-- SQL Script to import users into auth.users and auth.identities
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- ══════════════════════════════════════════════════════════════

-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

`;

  for (const user of users) {
    const {
      id,
      email,
      created_at,
      confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
    } = user;

    if (!id || !email) {
      console.log(`Skipping invalid user without id or email:`, user);
      continue;
    }

    const emailConfirmedAt = confirmed_at ? `'${confirmed_at}'` : 'NULL';
    const confirmedAt = confirmed_at ? `'${confirmed_at}'` : 'NULL';
    const createdAt = created_at ? `'${created_at}'` : 'now()';
    
    // Format JSON objects
    const appMeta = JSON.stringify(raw_app_meta_data || { provider: 'email', providers: ['email'] });
    const userMeta = JSON.stringify(raw_user_meta_data || {});

    // Escape single quotes for SQL safety
    const cleanEmail = email.replace(/'/g, "''");
    const cleanAppMeta = appMeta.replace(/'/g, "''");
    const cleanUserMeta = userMeta.replace(/'/g, "''");

    sqlContent += `
-- ─── Import User: ${cleanEmail} ───
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role,
  is_super_admin,
  is_sso_user,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change,
  phone_change,
  phone_change_token_new,
  reauthentication_token
) VALUES (
  '${id}',
  '${cleanEmail}',
  extensions.crypt('ChangeMe123!', extensions.gen_salt('bf', 10)), -- Default password: ChangeMe123!
  ${emailConfirmedAt},
  ${confirmedAt},
  ${createdAt},
  now(),
  '${cleanAppMeta}'::jsonb,
  '${cleanUserMeta}'::jsonb,
  'authenticated',
  'authenticated',
  false,
  false,
  '',
  '',
  '',
  '',
  '',
  '',
  ''
) ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  '${id}',
  '${id}',
  jsonb_build_object('sub', '${id}', 'email', '${cleanEmail}'),
  'email',
  '${id}',
  NULL,
  ${createdAt},
  now()
) ON CONFLICT (provider, provider_id) DO NOTHING;
`;
  }

  fs.writeFileSync(outputPath, sqlContent, 'utf8');
  console.log(`\nSuccess! Generated: ${outputPath}`);
  console.log(`Total users parsed: ${users.length}`);
  console.log(`\n👉 Next step: Copy the contents of import_users.sql and run them in your Supabase SQL Editor.`);
  console.log(`🔑 All users will be created with the temporary password: ChangeMe123!`);
  console.log(`Users can change this password later from their profile page.`);
} catch (error) {
  console.error('Failed to parse or process row.json:', error.message);
}
