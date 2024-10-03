import { execSync } from 'child_process';

const migrationName = process.argv[2];
if (!migrationName) {
  console.error('Error: Migration name is required');
  process.exit(1);
}

const command = `yarn run typeorm migration:generate ./src/db/migrations/${migrationName} -d ./src/db/data-source.ts`;
// This script forces developer to add a migration name when generating a new migration
execSync(command, { stdio: 'inherit' });
