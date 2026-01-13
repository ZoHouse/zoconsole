/**
 * Founders Management Component
 * Displays founder NFT holders with stats, table view, and detail sidebar
 */

import React, { useState, useMemo } from 'react';
import { Check, X, ExternalLink, Search, ChevronLeft, ChevronRight, AlertCircle, ShieldX, Download } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { FounderInfoSidebar } from './sidebars';
import { useFounderTokensStats, useFounderTokensOwners } from '../hooks/useZoApi';
import { supabase } from '../lib/supabase';

interface FoundersManagementProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

// Support both flat API format and nested format
interface FounderData {
  // Flat format from API
  wallet_address?: string;
  nickname?: string;
  pfp_image?: string;
  twitter_handle?: string;
  tags?: string[];
  tokens?: any[];
  // Nested format
  user?: {
    pid?: string;
    nickname?: string;
    email?: string;
    wallet_address?: string;
    twitter_handle?: string;
    avatar?: { image?: string };
    pfp_image?: string;
    membership?: string;
  };
  num_tokens?: number;
}

const ITEMS_PER_PAGE = 20;

// Format wallet address
const formatAddress = (address: string): string => {
  if (!address) return '';
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Helper to get error message
const getErrorMessage = (error: any): { title: string; message: string; isAuth: boolean } => {
  const status = error?.response?.status || error?.status;
  
  if (status === 401 || status === 403) {
    return {
      title: 'Access Denied',
      message: 'You do not have permission to view Founders data. Please contact an administrator if you believe this is an error.',
      isAuth: true,
    };
  }
  
  if (status === 404) {
    return {
      title: 'API Not Found',
      message: 'The Founders API endpoint is not available. Please check if the backend service is running.',
      isAuth: false,
    };
  }
  
  return {
    title: 'Failed to Load Data',
    message: error?.message || 'An unexpected error occurred while fetching Founders data. Please try again later.',
    isAuth: false,
  };
};

// Get display info from founder data (handles both flat and nested formats)
const getFounderDisplayInfo = (founder: FounderData) => {
  // Flat format
  if (founder.wallet_address && !founder.user) {
    return {
      nickname: founder.nickname || formatAddress(founder.wallet_address),
      pfp: founder.pfp_image || '',
      walletAddress: founder.wallet_address,
      twitterHandle: founder.twitter_handle,
      numTokens: founder.tokens?.length || founder.num_tokens || 0,
      hasApp: !!founder.nickname,
    };
  }
  
  // Nested format
  return {
    nickname: founder.user?.nickname || formatAddress(founder.user?.wallet_address || ''),
    pfp: founder.user?.pfp_image || founder.user?.avatar?.image || '',
    walletAddress: founder.user?.wallet_address || '',
    twitterHandle: founder.user?.twitter_handle,
    numTokens: founder.num_tokens || 0,
    hasApp: !!founder.user?.nickname,
  };
};

export function FoundersManagement({
  selectedProperty,
  onPropertyChange,
}: FoundersManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedFounder, setSelectedFounder] = useState<FounderData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [enrichedUsers, setEnrichedUsers] = useState<Map<string, any>>(new Map());

  // Fetch stats
  const { data: statsData, isLoading: statsLoading, error: statsError } = useFounderTokensStats();

  // Fetch owners with pagination
  const { data: ownersData, isLoading: ownersLoading, error: ownersError } = useFounderTokensOwners({
    limit: ITEMS_PER_PAGE,
    offset: currentPage * ITEMS_PER_PAGE,
    search: searchQuery || undefined,
  });

  // Check for errors and log to console
  const hasError = !!statsError || !!ownersError;
  const errorInfo = hasError ? getErrorMessage(statsError || ownersError) : null;
  
  if (statsError) {
    console.error('[Founders] Stats API Error:', statsError);
  }
  if (ownersError) {
    console.error('[Founders] Owners API Error:', ownersError);
  }
  
  // Parse stats data
  const stats = useMemo(() => {
    if (hasError || !statsData) return null;
    const data = statsData?.data || statsData;
    return {
      total_holders: data?.total_holders || data?.count || 0,
      total_nfts_minted: data?.total_nfts_minted || data?.total_tokens || 0,
      total_app_users: data?.total_app_users || data?.with_app || 0,
      multiple_token_holders: data?.multiple_token_holders || 0,
      verified_founder_twitter_accounts: data?.verified_founder_twitter_accounts || data?.with_twitter || 0,
      verified_founder_telegram_accounts: data?.verified_founder_telegram_accounts || data?.with_telegram || 0,
    };
  }, [statsData, hasError]);

  // Parse owners data
  const owners = useMemo(() => {
    if (hasError) return [];
    const data = ownersData?.data || ownersData;
    if (data?.results) return data.results;
    if (data?.result) return data.result;
    if (Array.isArray(data)) return data;
    return [];
  }, [ownersData, hasError]);

  const totalCount = useMemo(() => {
    if (hasError) return 0;
    const data = ownersData?.data || ownersData;
    return data?.count || data?.total || (Array.isArray(data) ? data.length : 0);
  }, [ownersData, hasError]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Fetch user details from Supabase for current page
  React.useEffect(() => {
    const fetchUserDetails = async () => {
      if (owners.length === 0) return;
      
      // Get wallet addresses from current page (normalize to lowercase for matching)
      const wallets = owners
        .map(o => getFounderDisplayInfo(o).walletAddress)
        .filter(Boolean);
      
      if (wallets.length === 0) return;

      // Try both lowercase and original case for wallet matching
      const walletsLower = wallets.map(w => w.toLowerCase());
      const allWallets = [...new Set([...wallets, ...walletsLower])];

      // Fetch users from Supabase matching these wallets
      const { data: supabaseUsers, error } = await supabase
        .from('users')
        .select('*')
        .in('wallet_address', allWallets);

      if (!error && supabaseUsers) {
        const userMap = new Map();
        supabaseUsers.forEach(user => {
          if (user.wallet_address) {
            // Store by both original and lowercase for flexible matching
            userMap.set(user.wallet_address, user);
            userMap.set(user.wallet_address.toLowerCase(), user);
          }
        });
        console.log(`[Founders] Enriched ${supabaseUsers.length} users from Supabase out of ${wallets.length} founders`);
        setEnrichedUsers(userMap);
      } else if (error) {
        console.error('[Founders] Error fetching Supabase users:', error);
      }
    };

    fetchUserDetails();
  }, [owners]);

  // Stats items
  const statItems = stats ? [
    { label: 'Total Holders', value: totalCount || stats.total_holders || 0 },
    { label: 'NFTs Minted', value: stats.total_nfts_minted || 0 },
    { label: 'Total App Users', value: stats.total_app_users || stats.total_holders || 0 },
    { label: 'Holds 1+ NFT', value: stats.multiple_token_holders || 0 },
    { label: 'Verified X', value: stats.verified_founder_twitter_accounts || 0 },
    { label: 'Verified Telegram', value: stats.verified_founder_telegram_accounts || 0 },
  ] : [];

  const handleRowClick = (founder: FounderData) => {
    // Enrich founder data with Supabase user info
    const info = getFounderDisplayInfo(founder);
    // Try both original case and lowercase for wallet matching
    const supabaseUser = enrichedUsers.get(info.walletAddress) || 
                         enrichedUsers.get(info.walletAddress?.toLowerCase());
    
    console.log('[Founders] Row clicked:', {
      wallet: info.walletAddress,
      hasEnrichedData: !!supabaseUser,
      supabaseUser: supabaseUser ? { name: supabaseUser.name, email: supabaseUser.email } : null,
    });
    
    const enrichedFounder = {
      ...founder,
      supabaseUser,
    };
    
    setSelectedFounder(enrichedFounder);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedFounder(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const handleDownload = () => {
    // Prepare founders data for export with enriched Supabase data
    const exportData = owners.map((owner, index) => {
      const info = getFounderDisplayInfo(owner);
      const supabaseUser = enrichedUsers.get(info.walletAddress);
      
      return {
        number: index + 1,
        name: supabaseUser?.name || info.nickname,
        username: supabaseUser?.username || '',
        email: supabaseUser?.email || '',
        phone: supabaseUser?.phone || '',
        city: supabaseUser?.city || '',
        twitter_handle: info.twitterHandle || '',
        wallet_address: info.walletAddress,
        nfts_owned: info.numTokens,
        has_app: info.hasApp ? 'Yes' : 'No',
        zo_membership: supabaseUser?.zo_membership || '',
        bio: supabaseUser?.bio || '',
      };
    });

    // Create CSV content with proper escaping
    const headers = ['#', 'Name', 'Username', 'Email', 'Phone', 'City', 'Twitter Handle', 'Wallet Address', 'NFTs Owned', 'App Installed', 'Membership', 'Bio'];
    const csvContent = [
      headers.join(','),
      ...exportData.map(row => 
        [
          row.number,
          `"${row.name.replace(/"/g, '""')}"`,
          row.username,
          row.email,
          row.phone,
          `"${row.city.replace(/"/g, '""')}"`,
          row.twitter_handle,
          row.wallet_address,
          row.nfts_owned,
          row.has_app,
          row.zo_membership,
          `"${(row.bio || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        ].join(',')
      )
    ].join('\n');

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zo-founders-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log(`✅ Downloaded ${exportData.length} founders to CSV`);
  };

  // Error State UI
  if (hasError && errorInfo) {
    return (
      <div className="flex-1 overflow-auto bg-black">
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Founders</h1>
              <p className="text-zinc-400 text-sm mt-1">
                Manage and view Zo Founder NFT holders
              </p>
            </div>
          </div>

          <Card className="bg-zinc-900/50 border-red-500/30">
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                {errorInfo.isAuth ? (
                  <ShieldX className="h-16 w-16 text-red-500" />
                ) : (
                  <AlertCircle className="h-16 w-16 text-red-500" />
                )}
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">{errorInfo.title}</h2>
                  <p className="text-zinc-400 max-w-md">{errorInfo.message}</p>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="border-zinc-700 text-zinc-300 hover:text-white"
                  >
                    Retry
                  </Button>
                </div>
                <p className="text-xs text-zinc-600 mt-4">
                  Error details logged to browser console
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-black">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Founders</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Manage and view Zo Founder NFT holders
            </p>
          </div>
          <Button
            onClick={handleDownload}
            className="bg-[#9ae600] text-black hover:bg-[#8bd500] font-medium"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Founders CSV
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statsLoading ? (
            [...Array(6)].map((_, index) => (
              <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-4">
                  <Skeleton className="h-3 w-16 mb-2" />
                  <Skeleton className="h-8 w-12" />
                </CardContent>
              </Card>
            ))
          ) : (
            statItems.map((stat, index) => (
              <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-4">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search founders..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Table */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400 w-12">#</TableHead>
                    <TableHead className="text-zinc-400">User</TableHead>
                    <TableHead className="text-zinc-400">Email</TableHead>
                    <TableHead className="text-zinc-400">Phone</TableHead>
                    <TableHead className="text-zinc-400">City</TableHead>
                    <TableHead className="text-zinc-400">Twitter Handle</TableHead>
                    <TableHead className="text-zinc-400">Wallet Address</TableHead>
                    <TableHead className="text-zinc-400 text-right">#NFTs</TableHead>
                    <TableHead className="text-zinc-400 text-center">App</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ownersLoading ? (
                    [...Array(5)].map((_, i) => (
                      <TableRow key={i} className="border-zinc-800">
                        <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                        </TableCell>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-8 ml-auto" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-4 mx-auto" /></TableCell>
                      </TableRow>
                    ))
                  ) : owners.length === 0 ? (
                    <TableRow className="border-zinc-800">
                      <TableCell colSpan={6} className="text-center text-zinc-500 py-12">
                        No founders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    owners.map((owner: FounderData, index: number) => {
                      const info = getFounderDisplayInfo(owner);
                      const initials = info.nickname.slice(0, 2).toUpperCase();
                      // Try both original case and lowercase for wallet matching
                      const supabaseUser = enrichedUsers.get(info.walletAddress) || 
                                           enrichedUsers.get(info.walletAddress?.toLowerCase());
                      
                      return (
                        <TableRow
                          key={owner.wallet_address || owner.user?.pid || index}
                          className="border-zinc-800 cursor-pointer hover:bg-zinc-800/50 transition-colors"
                          onClick={() => handleRowClick(owner)}
                        >
                          <TableCell className="text-zinc-500">
                            {currentPage * ITEMS_PER_PAGE + index + 1}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={supabaseUser?.pfp || info.pfp} alt={info.nickname} />
                                <AvatarFallback className="bg-zinc-800 text-xs">
                                  {initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <span className={info.hasApp ? 'text-white' : 'text-zinc-500'}>
                                  {supabaseUser?.name || info.nickname}
                                </span>
                                {supabaseUser?.username && (
                                  <div className="text-xs text-zinc-600">@{supabaseUser.username}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {supabaseUser?.email ? (
                              <span className="text-zinc-400">{supabaseUser.email}</span>
                            ) : (
                              <span className="text-zinc-600">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm">
                            {supabaseUser?.phone ? (
                              <span className="text-zinc-400">{supabaseUser.phone}</span>
                            ) : (
                              <span className="text-zinc-600">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-sm">
                            {supabaseUser?.city ? (
                              <span className="text-zinc-400">{supabaseUser.city}</span>
                            ) : (
                              <span className="text-zinc-600">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {info.twitterHandle ? (
                              <a
                                href={`https://twitter.com/${info.twitterHandle}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#9ae600] hover:underline inline-flex items-center gap-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                @{info.twitterHandle}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-zinc-600">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {info.walletAddress ? (
                              <a
                                href={`https://etherscan.io/address/${info.walletAddress}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#9ae600] hover:underline inline-flex items-center gap-1 font-mono text-sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {formatAddress(info.walletAddress)}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-zinc-600">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant="outline"
                              className="border-[#9ae600]/30 text-[#9ae600]"
                            >
                              {info.numTokens}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            {info.hasApp ? (
                              <Check className="h-4 w-4 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-zinc-600 mx-auto" />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800">
                <p className="text-sm text-zinc-500">
                  Showing {currentPage * ITEMS_PER_PAGE + 1} to{' '}
                  {Math.min((currentPage + 1) * ITEMS_PER_PAGE, totalCount)} of{' '}
                  {totalCount} results
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                    className="border-zinc-700 text-zinc-400 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-zinc-400">
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={currentPage >= totalPages - 1}
                    className="border-zinc-700 text-zinc-400 hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Founder Info Sidebar */}
      <FounderInfoSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        data={selectedFounder}
      />
    </div>
  );
}

export default FoundersManagement;
