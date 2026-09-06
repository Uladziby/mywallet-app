import { execSync } from 'child_process';
import path from 'path';

async function verifyConnection() {
  try {
    // Check if migrations table exists
    const result = execSync('npx prisma migrate status', {
      cwd: path.resolve(__dirname, '..'),
      encoding: 'utf-8',
    });

    if (result.includes('All migrations have been applied')) {
      console.log('✅ Connected. Database is in sync with schema.');
      process.exit(0);
    } else {
      console.log('⚠️ Migrations status:', result);
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Connection failed:', error);
    process.exit(1);
  }
}

verifyConnection();
