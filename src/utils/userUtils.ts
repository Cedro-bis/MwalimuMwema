import { User } from 'firebase/auth';

export const getFirstNameInitial = (user: User | null): string => {
  if (!user) return '?';
  if (user.displayName) {
    const firstName = user.displayName.split(' ')[0];
    if (firstName) return firstName[0].toUpperCase();
  }
  if (user.email) {
    const prefix = user.email.split('@')[0];
    const parts = prefix.split(/[._-]/);
    const firstName = parts[0];
    if (firstName) return firstName[0].toUpperCase();
    return prefix[0].toUpperCase();
  }
  return '?';
};
