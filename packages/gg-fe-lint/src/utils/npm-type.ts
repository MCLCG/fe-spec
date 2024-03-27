import { sync } from 'command-exists';

const promise: Promise<'npm' | 'pnpm'> = new Promise((resolve) => {
  if (!sync('pnpm')) return resolve('npm');
  return resolve('pnpm');
});

export default promise;
