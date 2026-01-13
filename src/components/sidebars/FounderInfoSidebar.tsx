/**
 * FounderInfoSidebar - Shows founder details from Supabase/table data
 * No API calls - displays data directly
 */

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X, User, Mail, Phone, Wallet, MapPin, Calendar, Twitter, ExternalLink, Copy, Crown } from 'lucide-react';

interface FounderData {
  wallet_address?: string;
  nickname?: string;
  pfp_image?: string;
  twitter_handle?: string;
  num_tokens?: number;
  tokens?: any[];
  tags?: string[];
  user?: {
    pid?: string;
    nickname?: string;
    wallet_address?: string;
    twitter_handle?: string;
    pfp_image?: string;
    avatar?: { image?: string };
  };
  // Enriched Supabase user data
  supabaseUser?: {
    id?: string;
    name?: string;
    first_name?: string;
    username?: string;
    email?: string;
    phone?: string;
    phone_number?: string;
    city?: string;
    bio?: string;
    pfp?: string;
    birthdate?: string;
    wallet_address?: string;
    x_handle?: string;
    zo_membership?: string;
    created_at?: string;
  };
}

interface FounderInfoSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  data: FounderData | null;
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

const FounderInfoSidebar: React.FC<FounderInfoSidebarProps> = ({
  isOpen,
  onClose,
  data,
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

  if (!isOpen || !data) return null;

  // Get data from Supabase user or fallback to table row data
  const supabaseUser = data.supabaseUser;
  
  // Display values - prefer Supabase data, fallback to row data
  const displayName = supabaseUser?.name || supabaseUser?.first_name || data.nickname || data.user?.nickname || formatAddress(data.wallet_address || '');
  const username = supabaseUser?.username;
  const pfpImage = supabaseUser?.pfp || data.pfp_image || data.user?.pfp_image || data.user?.avatar?.image;
  const email = supabaseUser?.email;
  const phone = supabaseUser?.phone || supabaseUser?.phone_number;
  const city = supabaseUser?.city;
  const bio = supabaseUser?.bio;
  const twitterHandle = supabaseUser?.x_handle || data.twitter_handle || data.user?.twitter_handle;
  const walletAddress = supabaseUser?.wallet_address || data.wallet_address || data.user?.wallet_address;
  const birthdate = supabaseUser?.birthdate;
  const createdAt = supabaseUser?.created_at;
  const membership = supabaseUser?.zo_membership;
  const nftCount = data.num_tokens || data.tokens?.length || 0;
  const isFounder = membership === 'founder' || data.tags?.includes('founder') || true; // All in founders tab are founders

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
            Founder Info
          </span>
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

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
          {/* Profile Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#262626',
                border: '2px solid #eab308',
                overflow: 'hidden',
                marginBottom: '12px',
              }}
            >
              {pfpImage ? (
                <img src={pfpImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <span style={{ color: '#eab308', fontSize: '12px', fontWeight: 500, backgroundColor: '#422006', padding: '2px 6px', borderRadius: '4px' }}>
                Founder
              </span>
            </div>
            {username && (
              <p style={{ color: '#737373', fontSize: '14px', margin: '4px 0 0' }}>
                @{username}
              </p>
            )}
          </div>

          {/* NFT Count */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '8px',
            padding: '12px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #262626',
          }}>
            <Crown size={18} color="#9ae600" />
            <span style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
              Owns {nftCount} Founder NFT{nftCount !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Contact Info Section */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
              Contact Info
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {email ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={16} color="#737373" />
                  <a
                    href={`mailto:${email}`}
                    style={{ color: '#9ae600', fontSize: '13px', textDecoration: 'none' }}
                  >
                    {email}
                  </a>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={16} color="#525252" />
                  <span style={{ color: '#525252', fontSize: '13px' }}>No email</span>
                </div>
              )}
              
              {phone ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone size={16} color="#737373" />
                  <a
                    href={`tel:${phone}`}
                    style={{ color: '#9ae600', fontSize: '13px', textDecoration: 'none' }}
                  >
                    {phone}
                  </a>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone size={16} color="#525252" />
                  <span style={{ color: '#525252', fontSize: '13px' }}>No phone</span>
                </div>
              )}

              {twitterHandle ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Twitter size={16} color="#737373" />
                  <a
                    href={`https://twitter.com/${twitterHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#9ae600', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    @{twitterHandle}
                    <ExternalLink size={12} color="#9ae600" />
                  </a>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Twitter size={16} color="#525252" />
                  <span style={{ color: '#525252', fontSize: '13px' }}>No Twitter</span>
                </div>
              )}
            </div>
          </div>

          {/* Location Section */}
          {city && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
                Location
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={16} color="#737373" />
                <span style={{ color: 'white', fontSize: '13px' }}>{city}</span>
              </div>
            </div>
          )}

          {/* Bio Section */}
          {bio && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
                Bio
              </h3>
              <p style={{ color: '#a3a3a3', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
                {bio}
              </p>
            </div>
          )}

          {/* Web3 Info Section */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
              Web3 Info
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {walletAddress ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Wallet size={16} color="#737373" />
                  <a
                    href={`https://etherscan.io/address/${walletAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#9ae600', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'monospace' }}
                  >
                    {formatAddress(walletAddress)}
                    <ExternalLink size={12} color="#9ae600" />
                  </a>
                  <button 
                    onClick={() => copyToClipboard(walletAddress)} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                    title="Copy full address"
                  >
                    <Copy size={14} color="#737373" />
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Wallet size={16} color="#525252" />
                  <span style={{ color: '#525252', fontSize: '13px' }}>No wallet</span>
                </div>
              )}
            </div>
          </div>

          {/* Account Info Section */}
          {(birthdate || createdAt) && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#737373', fontSize: '12px', fontWeight: 500, textTransform: 'uppercase', marginBottom: '12px' }}>
                Account Info
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {birthdate && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Calendar size={16} color="#737373" />
                    <span style={{ color: '#a3a3a3', fontSize: '13px' }}>Birthdate:</span>
                    <span style={{ color: 'white', fontSize: '13px' }}>{formatDate(birthdate)}</span>
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
          )}

          {/* Debug info (only shows if no enriched data) */}
          {!supabaseUser && (
            <div style={{ 
              marginTop: '20px',
              padding: '12px',
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              border: '1px solid #333',
            }}>
              <p style={{ color: '#737373', fontSize: '12px', margin: 0 }}>
                ℹ️ Limited data available. This founder may not be in the synced users database.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FounderInfoSidebar;
export { FounderInfoSidebar };
