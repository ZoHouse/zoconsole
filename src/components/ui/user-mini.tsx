/**
 * UserMini Component
 * Compact user display with avatar and name for table cells
 */

import React from 'react';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface UserData {
  nickname?: string;
  email?: string;
  name?: string;
  full_name?: string;
  email_address?: string;
  mobile_number?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  wallet_address?: string;
  custom_nickname?: string;
  avatar?: { image?: string };
  pfp_image?: string;
  pfp?: { image?: string };
  [key: string]: any;
}

interface UserMiniProps {
  user: UserData | null | undefined;
  getUserNameHandler?: (user: UserData) => string;
  getUserAvatarHandler?: (user: UserData) => string;
}

const formatAddress = (address: string | undefined): string => {
  if (!address) return '';
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const isValidString = (str: any): str is string => {
  return typeof str === 'string' && str.trim().length > 0;
};

const getUserName = (user: UserData): string => {
  return (
    user?.nickname ||
    user?.email ||
    user?.name ||
    user?.full_name ||
    user?.email_address ||
    user?.mobile_number ||
    [user?.first_name, user?.middle_name, user?.last_name]
      .filter(isValidString)
      .join(' ') ||
    formatAddress(user?.wallet_address) ||
    user?.custom_nickname ||
    'Zo User'
  );
};

const getUserAvatar = (user: UserData): string => {
  return user?.avatar?.image || user?.pfp_image || user?.pfp?.image || '';
};

const UserMini: React.FC<UserMiniProps> = ({
  user,
  getUserNameHandler,
  getUserAvatarHandler,
}) => {
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-zinc-800">
            <User className="h-4 w-4 text-zinc-500" />
          </AvatarFallback>
        </Avatar>
        <span className="text-zinc-500">Unknown</span>
      </div>
    );
  }

  const avatarUrl = getUserAvatarHandler ? getUserAvatarHandler(user) : getUserAvatar(user);
  const displayName = getUserNameHandler ? getUserNameHandler(user) : getUserName(user);
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatarUrl} alt={displayName} />
        <AvatarFallback className="bg-zinc-800 text-xs">
          {initials || <User className="h-4 w-4 text-zinc-500" />}
        </AvatarFallback>
      </Avatar>
      <span className="text-white truncate max-w-[200px]">{displayName}</span>
    </div>
  );
};

export default UserMini;
export { formatAddress, isValidString, getUserName, getUserAvatar };
