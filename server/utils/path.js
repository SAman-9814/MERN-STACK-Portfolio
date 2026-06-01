import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root server directory (reactjs/server)
export const SERVER_ROOT = path.resolve(__dirname, '..');

// Helper to resolve paths relative to server root
export const resolveFromRoot = (...paths) => path.resolve(SERVER_ROOT, ...paths);
