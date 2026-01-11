/**
 * Founders Dashboard Component
 * Displays founder NFTs, allowlist status, and marketplace data
 */

import React from 'react';
import { useFounderNfts, useFounderAllowlist, useFounderMarketplace, useProfile } from '../hooks/useZoApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';

interface FounderNft {
  id?: string;
  token_id?: string;
  name?: string;
  image?: string;
  tier?: string;
  wallet_address?: string;
  [key: string]: any;
}

interface AllowlistEntry {
  wallet?: string;
  tier?: string;
  spots?: number;
  status?: string;
  [key: string]: any;
}

interface MarketplaceListing {
  id?: string;
  token_id?: string;
  price?: number;
  currency?: string;
  seller?: string;
  [key: string]: any;
}

const LoadingCard = () => (
  <Card className="bg-zinc-900/50 border-zinc-800">
    <CardHeader>
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-48" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </CardContent>
  </Card>
);

const FounderNftCard: React.FC<{ nft: FounderNft; index: number }> = ({ nft, index }) => (
  <Card className="bg-zinc-900/50 border-zinc-800 hover:border-purple-500/50 transition-colors">
    <CardContent className="p-4">
      {nft.image && (
        <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-zinc-800">
          <img 
            src={nft.image} 
            alt={nft.name || `NFT #${nft.token_id || index}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="space-y-2">
        <h3 className="font-medium text-white truncate">
          {nft.name || `Founder NFT #${nft.token_id || index}`}
        </h3>
        {nft.tier && (
          <Badge variant="outline" className="border-purple-500 text-purple-400">
            {nft.tier}
          </Badge>
        )}
        {nft.token_id && (
          <p className="text-xs text-zinc-500 font-mono truncate">
            Token: {nft.token_id}
          </p>
        )}
      </div>
    </CardContent>
  </Card>
);

// Helper to safely convert API response to array
const toArray = <T,>(data: any): T[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (data.data && Array.isArray(data.data)) return data.data;
  if (data.results && Array.isArray(data.results)) return data.results;
  if (data.items && Array.isArray(data.items)) return data.items;
  if (typeof data === 'object') {
    // Check if it's an object with numeric keys (array-like)
    const keys = Object.keys(data);
    if (keys.every(k => !isNaN(Number(k)))) {
      return Object.values(data);
    }
    // Return as single item array if it looks like a single object
    if (data.id || data.token_id) return [data];
  }
  return [];
};

const Founders: React.FC = () => {
  const { profile, isLoading: profileLoading } = useProfile();
  const { data: nftsData, isLoading: nftsLoading, error: nftsError } = useFounderNfts();
  const { data: allowlistData, isLoading: allowlistLoading, error: allowlistError } = useFounderAllowlist();
  const { data: marketplaceData, isLoading: marketplaceLoading, error: marketplaceError } = useFounderMarketplace();

  // Safely convert responses to arrays
  const nfts: FounderNft[] = toArray<FounderNft>(nftsData);
  const allowlist: AllowlistEntry[] = toArray<AllowlistEntry>(allowlistData);
  const listings: MarketplaceListing[] = toArray<MarketplaceListing>(marketplaceData);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto overflow-y-auto h-full">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Founders Dashboard</h1>
        <p className="text-zinc-400">
          Manage your Zo Founder NFTs and marketplace activity
        </p>
      </div>

      {/* Profile Summary */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-zinc-900/50 border-purple-500/30">
        <CardContent className="p-6">
          {profileLoading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          ) : profile ? (
            <div className="flex items-center gap-4">
              {profile.pfp && (
                <img 
                  src={profile.pfp} 
                  alt={profile.name || 'Profile'}
                  className="h-16 w-16 rounded-full border-2 border-purple-500"
                />
              )}
              <div>
                <h2 className="text-xl font-bold text-white">{profile.name || 'Anonymous'}</h2>
                <p className="text-zinc-400">{profile.email || profile.mobile_number || 'No contact info'}</p>
                {profile.founder_nfts_count > 0 && (
                  <Badge className="mt-2 bg-purple-600">
                    {profile.founder_nfts_count} Founder NFT{profile.founder_nfts_count > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </div>
          ) : (
            <p className="text-zinc-400">Profile data unavailable</p>
          )}
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="pb-2">
            <CardDescription>Your NFTs</CardDescription>
            <CardTitle className="text-2xl">
              {nftsLoading ? <Skeleton className="h-8 w-12" /> : nfts.length}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="pb-2">
            <CardDescription>Allowlist Spots</CardDescription>
            <CardTitle className="text-2xl">
              {allowlistLoading ? <Skeleton className="h-8 w-12" /> : allowlist.length}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardHeader className="pb-2">
            <CardDescription>Active Listings</CardDescription>
            <CardTitle className="text-2xl">
              {marketplaceLoading ? <Skeleton className="h-8 w-12" /> : listings.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Founder NFTs Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Your Founder NFTs</h2>
          {!nftsLoading && nfts.length > 0 && (
            <Badge variant="outline">{nfts.length} total</Badge>
          )}
        </div>

        {nftsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : nftsError ? (
          <Card className="bg-red-900/20 border-red-500/30">
            <CardContent className="p-4">
              <p className="text-red-400">Failed to load NFTs. Please try again.</p>
              <p className="text-xs text-red-300 mt-1">{String(nftsError)}</p>
            </CardContent>
          </Card>
        ) : nfts.length === 0 ? (
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-8 text-center">
              <p className="text-zinc-400">No Founder NFTs found in your wallet.</p>
              <p className="text-zinc-500 text-sm mt-2">
                Connect a wallet with Founder NFTs to see them here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nfts.map((nft, index) => (
              <FounderNftCard 
                key={nft.id || nft.token_id || `nft-${index}`} 
                nft={nft} 
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      {/* Allowlist Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Allowlist Status</h2>
        
        {allowlistLoading ? (
          <LoadingCard />
        ) : allowlistError ? (
          <Card className="bg-red-900/20 border-red-500/30">
            <CardContent className="p-4">
              <p className="text-red-400">Failed to load allowlist data.</p>
              <p className="text-xs text-red-300 mt-1">{String(allowlistError)}</p>
            </CardContent>
          </Card>
        ) : allowlist.length === 0 ? (
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-6 text-center">
              <p className="text-zinc-400">Not on any active allowlists.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allowlist.map((entry, idx) => (
              <Card key={entry.wallet || `allowlist-${idx}`} className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-mono text-sm text-zinc-400 truncate max-w-[200px]">
                        {entry.wallet || 'Unknown wallet'}
                      </p>
                      {entry.tier && (
                        <Badge className="mt-2" variant="outline">
                          {entry.tier}
                        </Badge>
                      )}
                    </div>
                    <Badge 
                      className={entry.status === 'active' ? 'bg-green-600' : 'bg-zinc-600'}
                    >
                      {entry.status || 'Pending'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Marketplace Listings Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Marketplace Listings</h2>
        
        {marketplaceLoading ? (
          <LoadingCard />
        ) : marketplaceError ? (
          <Card className="bg-red-900/20 border-red-500/30">
            <CardContent className="p-4">
              <p className="text-red-400">Failed to load marketplace data.</p>
              <p className="text-xs text-red-300 mt-1">{String(marketplaceError)}</p>
            </CardContent>
          </Card>
        ) : listings.length === 0 ? (
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-6 text-center">
              <p className="text-zinc-400">No active marketplace listings.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Token ID</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Price</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Seller</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, idx) => (
                  <tr 
                    key={listing.id || listing.token_id || `listing-${idx}`} 
                    className="border-b border-zinc-800/50 hover:bg-zinc-800/30"
                  >
                    <td className="py-3 px-4 text-white font-mono">
                      {listing.token_id || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-white">
                      {listing.price ?? 'N/A'} {listing.currency || 'ETH'}
                    </td>
                    <td className="py-3 px-4 text-zinc-400 font-mono truncate max-w-[150px]">
                      {listing.seller || 'Unknown'}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        Listed
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Founders;
