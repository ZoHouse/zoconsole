/**
 * UserInfoSidebar - Matches reference design
 * Uses CAS_USERS API: /api/v1/cas/users/{userId}/
 */

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, User, Mail, Phone, Wallet, MapPin, Calendar, Tag, Loader2, ExternalLink, Copy } from 'lucide-react';
import { useUserById } from '../../hooks/useZoApi';

interface UserInfoSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  onRemoveAccess?: () => void;
}

const formatAddress = (address: string): string => {
  if (!address || address.length <= 10) return address || '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatCapitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const UserInfoSidebar: React.FC<UserInfoSidebarProps> = ({
  isOpen,
  onClose,
  userId,
  onRemoveAccess,
}) => {
  // Fetch user data using CAS_USERS API
  const { data: userResponse, isLoading, error } = useUserById(isOpen ? userId || undefined : undefined);
  
  const userInfo = userResponse?.data || userResponse;

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

  // Data from API
  const profile = userInfo?.profile || {};
  const nickname = profile.nickname || 'Unknown User';
  const fullName = profile.full_name;
  const gender = profile.gender;
  const bio = profile.bio;
  const pid = profile.pid;
  const avatar = profile.avatar?.image || profile.pfp?.image || profile.pfp_image;
  const country = profile.country?.name;
  const cultures = profile.cultures || [];
  const emails = userInfo?.emails || [];
  const mobiles = userInfo?.mobiles || [];
  const wallets = userInfo?.web3_wallets || [];
  const membership = userInfo?.membership;
  const createdAt = userInfo?.created_at;
  const isFounder = String(membership).toLowerCase() === 'founder';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

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
            User Info
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
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
              <Loader2 size={24} color="#737373" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
              <p>Failed to load user data</p>
            </div>
          ) : !userInfo ? (
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
                  {avatar ? (
                    <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={32} color="#525252" />
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ color: 'white', fontSize: '18px', fontWeight: 600, margin: 0 }}>
                    {nickname}
                  </h2>
                  {isFounder && (
                    <span style={{ color: '#eab308', fontSize: '12px', fontWeight: 500, backgroundColor: '#422006', padding: '2px 6px', borderRadius: '4px' }}>
                      Founder
                    </span>
                  )}
                </div>
              </div>

              {/* Basic Info Section */}
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
                  Basic Info
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {fullName && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <User size={16} color="#737373" />
                      <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Full Name:</span>
                      <span style={{ color: 'white', fontSize: '13px' }}>{formatCapitalize(fullName)}</span>
                    </div>
                  )}
                  {gender && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <User size={16} color="#737373" />
                      <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Gender:</span>
                      <span style={{ color: 'white', fontSize: '13px' }}>{formatCapitalize(gender)}</span>
                    </div>
                  )}
                  {pid && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Tag size={16} color="#737373" />
                      <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Profile ID:</span>
                      <span style={{ color: '#9ae600', fontSize: '13px', fontFamily: 'monospace' }}>{formatAddress(pid)}</span>
                      <button onClick={() => copyToClipboard(pid)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <Copy size={12} color="#737373" />
                      </button>
                    </div>
                  )}
                  {bio && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <User size={16} color="#737373" style={{ marginTop: '2px' }} />
                      <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Bio:</span>
                      <span style={{ color: 'white', fontSize: '13px' }}>{bio}</span>
                    </div>
                  )}
                  {createdAt && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Calendar size={16} color="#737373" />
                      <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Joined:</span>
                      <span style={{ color: 'white', fontSize: '13px' }}>{formatDate(createdAt)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info Section */}
              {(emails.length > 0 || mobiles.length > 0) && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
                    Contact Info
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {emails.map((email: any, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Mail size={16} color="#737373" />
                        <a
                          href={`mailto:${email.email_address}`}
                          style={{ color: '#9ae600', fontSize: '13px', textDecoration: 'none' }}
                        >
                          {email.email_address}
                        </a>
                      </div>
                    ))}
                    {mobiles.map((mobile: any, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Phone size={16} color="#737373" />
                        <a
                          href={`https://wa.me/${mobile.mobile_country_code}${mobile.mobile_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#9ae600', fontSize: '13px', textDecoration: 'none' }}
                        >
                          +{mobile.mobile_country_code} {mobile.mobile_number}
                        </a>
                        {mobile.has_whatsapp && (
                          <span style={{ color: '#737373', fontSize: '11px' }}>(WhatsApp)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Web3 Info Section */}
              {wallets.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
                    Web3 Info
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {wallets.map((wallet: any, idx: number) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Wallet size={16} color="#737373" />
                        <a
                          href={`https://etherscan.io/address/${wallet.wallet_address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#9ae600', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          {formatAddress(wallet.wallet_address)}
                          <ExternalLink size={12} color="#9ae600" />
                        </a>
                        {wallet.primary && (
                          <span style={{ color: '#737373', fontSize: '11px' }}>(Primary)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cultures Section */}
              {cultures.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
                    Cultures
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {cultures.map((culture: any) => (
                      <div key={culture.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        {culture.icon && (
                          <img src={culture.icon} alt="" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                        )}
                        <div>
                          <span style={{ color: 'white', fontSize: '13px' }}>{culture.name}</span>
                          {culture.description && (
                            <p style={{ color: '#737373', fontSize: '12px', margin: '4px 0 0' }}>{culture.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Section */}
              {country && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
                    Location
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <MapPin size={16} color="#737373" />
                    <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Country:</span>
                    <span style={{ color: 'white', fontSize: '13px' }}>{country}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default UserInfoSidebar;
export { UserInfoSidebar };
