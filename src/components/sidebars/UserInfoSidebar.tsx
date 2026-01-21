/**
 * UserInfoSidebar - Displays user info from Supabase
 * Single source of truth: Supabase users table
 */

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, User, Mail, Phone, Wallet, MapPin, Calendar, Tag, Copy, Clock } from 'lucide-react';
import type { SupabaseUser } from '../UsersManagement';

interface UserInfoSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: SupabaseUser | null;
  onRemoveAccess?: () => void;
}

const formatAddress = (address: string): string => {
  if (!address || address.length <= 10) return address || '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatDateTime = (dateString: string | undefined): string => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatCapitalize = (str: string | undefined): string => {
  if (!str) return '-';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const UserInfoSidebar: React.FC<UserInfoSidebarProps> = ({
  isOpen,
  onClose,
  user,
  onRemoveAccess,
}) => {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isFounder = user?.zo_membership?.toLowerCase() === 'founder';
  const displayName = user?.name || user?.username || 'Unknown User';
  const displayPhone = user?.phone || (user?.phone_number ? user.phone_number : null);

  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999 }}>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '400px',
          height: '100%',
          backgroundColor: '#0f0f0f',
          borderLeft: '1px solid #262626',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid #262626',
            flexShrink: 0,
          }}
        >
          <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>
            User Details
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {onRemoveAccess && (
              <button
                onClick={onRemoveAccess}
                style={{
                  background: 'none',
                  border: '1px solid #dc2626',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  color: '#dc2626',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Remove Access
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
              }}
            >
              <X size={20} color="#737373" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
          {!user ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#737373' }}>
              <p>No user data found</p>
            </div>
          ) : (
            <>
              {/* Profile Header */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#262626',
                    border: isFounder ? '2px solid #eab308' : '2px solid #404040',
                    overflow: 'hidden',
                    marginBottom: '12px',
                  }}
                >
                  {user.pfp ? (
                    <img src={user.pfp} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={32} color="#525252" />
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ color: 'white', fontSize: '18px', fontWeight: 600, margin: 0 }}>
                    {displayName}
                  </h2>
                  {isFounder && (
                    <span style={{ color: '#eab308', fontSize: '12px', fontWeight: 500, backgroundColor: '#422006', padding: '2px 6px', borderRadius: '4px' }}>
                      Founder
                    </span>
                  )}
                </div>
                {user.username && user.name && (
                  <p style={{ color: '#737373', fontSize: '13px', marginTop: '4px' }}>@{user.username}</p>
                )}
              </div>

              {/* Basic Info Section */}
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
                  Basic Info
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Zo User ID */}
                  {user.zo_user_id && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Tag size={16} color="#737373" />
                      <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Zo ID:</span>
                      <span style={{ color: '#9ae600', fontSize: '13px', fontFamily: 'monospace' }}>{formatAddress(user.zo_user_id)}</span>
                      <button onClick={() => copyToClipboard(user.zo_user_id!)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <Copy size={12} color="#737373" />
                      </button>
                    </div>
                  )}

                  {/* Membership */}
                  {user.zo_membership && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <User size={16} color="#737373" />
                      <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Membership:</span>
                      <span style={{ 
                        color: user.zo_membership === 'founder' ? '#eab308' : user.zo_membership === 'citizen' ? '#06b6d4' : '#9f9fa9', 
                        fontSize: '13px',
                        textTransform: 'capitalize'
                      }}>
                        {user.zo_membership}
                      </span>
                    </div>
                  )}

                  {/* Role */}
                  {user.role && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Tag size={16} color="#737373" />
                      <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Role:</span>
                      <span style={{ color: 'white', fontSize: '13px' }}>{formatCapitalize(user.role)}</span>
                    </div>
                  )}

                  {/* Joined */}
                  {user.created_at && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Calendar size={16} color="#737373" />
                      <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Joined:</span>
                      <span style={{ color: 'white', fontSize: '13px' }}>{formatDate(user.created_at)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info Section */}
              {(user.email || displayPhone) && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
                    Contact Info
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {user.email && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Mail size={16} color="#737373" />
                        <a
                          href={`mailto:${user.email}`}
                          style={{ color: '#9ae600', fontSize: '13px', textDecoration: 'none' }}
                        >
                          {user.email}
                        </a>
                        <button onClick={() => copyToClipboard(user.email!)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                          <Copy size={12} color="#737373" />
                        </button>
                      </div>
                    )}
                    {displayPhone && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Phone size={16} color="#737373" />
                        <a
                          href={`https://wa.me/${displayPhone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#9ae600', fontSize: '13px', textDecoration: 'none' }}
                        >
                          {displayPhone}
                        </a>
                        <button onClick={() => copyToClipboard(displayPhone)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                          <Copy size={12} color="#737373" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Web3 Info Section */}
              {user.wallet_address && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
                    Web3 Info
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Wallet size={16} color="#737373" />
                    <a
                      href={`https://etherscan.io/address/${user.wallet_address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#9ae600', fontSize: '13px', textDecoration: 'none', fontFamily: 'monospace' }}
                    >
                      {formatAddress(user.wallet_address)}
                    </a>
                    <button onClick={() => copyToClipboard(user.wallet_address!)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      <Copy size={12} color="#737373" />
                    </button>
                  </div>
                </div>
              )}

              {/* Location Section */}
              {user.city && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
                    Location
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <MapPin size={16} color="#737373" />
                    <span style={{ color: '#a3a3a3', fontSize: '13px' }}>City:</span>
                    <span style={{ color: 'white', fontSize: '13px' }}>{user.city}</span>
                  </div>
                </div>
              )}

              {/* Sync Info Section */}
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
                  Sync Status
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {user.zo_sync_status && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        backgroundColor: user.zo_sync_status === 'synced' ? '#9ae600' : '#f0b100' 
                      }} />
                      <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Status:</span>
                      <span style={{ color: 'white', fontSize: '13px', textTransform: 'capitalize' }}>{user.zo_sync_status}</span>
                    </div>
                  )}
                  {user.zo_synced_at && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Clock size={16} color="#737373" />
                      <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Last Synced:</span>
                      <span style={{ color: 'white', fontSize: '13px' }}>{formatDateTime(user.zo_synced_at)}</span>
                    </div>
                  )}
                  {user.last_seen && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Clock size={16} color="#737373" />
                      <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Last Seen:</span>
                      <span style={{ color: 'white', fontSize: '13px' }}>{formatDateTime(user.last_seen)}</span>
                    </div>
                  )}
                  {user.updated_at && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Clock size={16} color="#737373" />
                      <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Updated:</span>
                      <span style={{ color: 'white', fontSize: '13px' }}>{formatDateTime(user.updated_at)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Internal ID (for debugging) */}
              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #262626' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#525252', fontSize: '11px' }}>Internal ID:</span>
                  <span style={{ color: '#525252', fontSize: '11px', fontFamily: 'monospace' }}>{formatAddress(user.id)}</span>
                  <button onClick={() => copyToClipboard(user.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <Copy size={10} color="#525252" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UserInfoSidebar;
export { UserInfoSidebar };
