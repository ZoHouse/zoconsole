import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Users, MapPin, Loader2, UserCircle, Check, RefreshCw, ChevronDown, Download, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { UserInfoSidebar } from './sidebars';

interface UsersManagementProps {
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
}

export interface SupabaseUser {
  id: string;
  zo_user_id?: string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  phone_number?: string;
  pfp?: string;
  role?: string;
  zo_membership?: string;
  city?: string;
  wallet_address?: string;
  created_at?: string;
  updated_at?: string;
  zo_synced_at?: string;
  zo_sync_status?: string;
  last_seen?: string;
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function UsersManagement({ selectedProperty, onPropertyChange }: UsersManagementProps) {
  const [activeView, setActiveView] = useState<'overview' | 'users' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  
  // Debounced search query (300ms delay)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  // Users from Supabase
  const [users, setUsers] = useState<SupabaseUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [userCount, setUserCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(50); // 50 users per page
  const [totalPages, setTotalPages] = useState(0);

  // Metrics state
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalCities: 0,
    founders: 0,
    citizens: 0,
    visitors: 0,
    withWallets: 0,
  });
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);
  const [metricsError, setMetricsError] = useState<string | null>(null);

  // Sidebar state
  const [selectedUser, setSelectedUser] = useState<SupabaseUser | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch metrics with error handling
  const fetchMetrics = useCallback(async () => {
    setIsLoadingMetrics(true);
    setMetricsError(null);
    
    try {
      // Total users
      const { count: total, error: totalError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (totalError) throw totalError;

      // Cities count
      const { data: cities, error: citiesError } = await supabase
        .from('users')
        .select('city')
        .not('city', 'is', null)
        .neq('city', '');
      
      if (citiesError) throw citiesError;
      const uniqueCities = new Set(cities?.map(u => u.city).filter(Boolean)).size;

      // Founders: check zo_membership (case-insensitive) OR founder_nfts_count > 0
      const { count: foundersByMembership } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .ilike('zo_membership', 'founder');

      const { count: foundersByNfts } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gt('founder_nfts_count', 0);

      // Use the higher count (some founders may be identified by membership, others by NFT count)
      const founders = Math.max(foundersByMembership || 0, foundersByNfts || 0);

      // Citizens (case-insensitive)
      const { count: citizens, error: citizensError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .ilike('zo_membership', 'citizen');

      if (citizensError) throw citizensError;

      // Visitors (case-insensitive)
      const { count: visitors, error: visitorsError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .ilike('zo_membership', 'visitor');

      if (visitorsError) throw visitorsError;

      // Wallets count - check for non-null AND non-empty wallet_address
      const { count: wallets, error: walletsError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .not('wallet_address', 'is', null)
        .neq('wallet_address', '');

      if (walletsError) throw walletsError;

      setMetrics({
        totalUsers: total || 0,
        totalCities: uniqueCities,
        founders: founders,
        citizens: citizens || 0,
        visitors: visitors || 0,
        withWallets: wallets || 0,
      });
    } catch (err: any) {
      console.error('Error fetching metrics:', err);
      setMetricsError(err?.message || 'Failed to load metrics. Check Supabase connection.');
    } finally {
      setIsLoadingMetrics(false);
    }
  }, []);

  // Fetch users from Supabase with pagination and error handling
  const fetchUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    setUsersError(null);
    
    try {
      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from('users')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (debouncedSearchQuery) {
        query = query.or(`name.ilike.%${debouncedSearchQuery}%,email.ilike.%${debouncedSearchQuery}%,username.ilike.%${debouncedSearchQuery}%,phone.ilike.%${debouncedSearchQuery}%`);
      }
      
      if (roleFilter !== 'all') {
        query = query.ilike('zo_membership', roleFilter);
      }

      const { data, count, error } = await query;

      if (error) {
        throw error;
      }
      
      setUsers(data || []);
      setUserCount(count || 0);
      setTotalPages(Math.max(1, Math.ceil((count || 0) / pageSize)));
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setUsersError(err?.message || 'Failed to load users. Check Supabase connection.');
      setUsers([]);
      setUserCount(0);
      setTotalPages(1);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [currentPage, pageSize, debouncedSearchQuery, roleFilter]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [debouncedSearchQuery, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserClick = (user: SupabaseUser) => {
    setSelectedUser(user);
    setIsSidebarOpen(true);
  };

  return (
    <>
      <Header 
        activeView={activeView} 
        onViewChange={setActiveView} 
        userCount={metrics.totalUsers}
      />
      <main className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-[1600px] space-y-6">
          {activeView === 'overview' && <Overview metrics={metrics} isLoading={isLoadingMetrics} error={metricsError} onRetry={fetchMetrics} />}
          {activeView === 'users' && (
            <UsersList
              users={users}
              isLoading={isLoadingUsers}
              error={usersError}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              roleFilter={roleFilter}
              onRoleFilterChange={setRoleFilter}
              locationFilter={locationFilter}
              onLocationFilterChange={setLocationFilter}
              onUserClick={handleUserClick}
              onRefresh={fetchUsers}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageSize={pageSize}
              totalCount={userCount}
            />
          )}
          {activeView === 'analytics' && <Analytics />}
        </div>
      </main>

      {/* User Info Sidebar - Using Supabase data directly */}
      <UserInfoSidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </>
  );
}

interface HeaderProps {
  activeView: 'overview' | 'users' | 'analytics';
  onViewChange: (view: 'overview' | 'users' | 'analytics') => void;
  userCount: number;
}

function Header({ activeView, onViewChange, userCount }: HeaderProps) {
  return (
    <header className="border-b border-[#27272a] px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl">Users Management</h1>
          <p className="text-xs sm:text-sm text-[#9f9fa9] mt-1">
            {userCount > 0 ? `${userCount.toLocaleString()} users in database` : 'Manage Zo World users and citizens'}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2">
        <button
          onClick={() => onViewChange('overview')}
          className={`px-4 py-2 text-sm whitespace-nowrap rounded transition-colors ${
            activeView === 'overview'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#18181b] text-[#9f9fa9] hover:bg-[#27272a] hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => onViewChange('users')}
          className={`px-4 py-2 text-sm whitespace-nowrap rounded transition-colors ${
            activeView === 'users'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#18181b] text-[#9f9fa9] hover:bg-[#27272a] hover:text-white'
          }`}
        >
          All Users
        </button>
        <button
          onClick={() => onViewChange('analytics')}
          className={`px-4 py-2 text-sm whitespace-nowrap rounded transition-colors ${
            activeView === 'analytics'
              ? 'bg-[#9ae600] text-black'
              : 'bg-[#18181b] text-[#9f9fa9] hover:bg-[#27272a] hover:text-white'
          }`}
        >
          Analytics
        </button>
      </div>
    </header>
  );
}

interface OverviewProps {
  metrics: {
    totalUsers: number;
    totalCities: number;
    founders: number;
    citizens: number;
    visitors: number;
    withWallets: number;
  };
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

function Overview({ metrics, isLoading, error, onRetry }: OverviewProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-[#9ae600] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#fb2c36]/10 border border-[#fb2c36]/30 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-[#fb2c36] mx-auto mb-4" />
        <h3 className="text-lg font-medium text-[#fb2c36] mb-2">Failed to load metrics</h3>
        <p className="text-sm text-[#9f9fa9] mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[#fb2c36]/20 text-[#fb2c36] rounded hover:bg-[#fb2c36]/30 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          icon={<Users className="w-4 h-4" />}
          label="Total Users"
          value={metrics.totalUsers.toLocaleString()}
          subtitle="In Supabase"
          color="text-[#9ae600]"
        />
        <MetricCard
          icon={<UserCircle className="w-4 h-4" />}
          label="Founders"
          value={metrics.founders.toLocaleString()}
          subtitle="Founder tier"
          color="text-[#eab308]"
        />
        <MetricCard
          icon={<UserCircle className="w-4 h-4" />}
          label="Citizens"
          value={metrics.citizens.toLocaleString()}
          subtitle="Citizen tier"
          color="text-[#06b6d4]"
        />
        <MetricCard
          icon={<UserCircle className="w-4 h-4" />}
          label="Visitors"
          value={metrics.visitors.toLocaleString()}
          subtitle="Visitor tier"
          color="text-[#9f9fa9]"
        />
        <MetricCard
          icon={<MapPin className="w-4 h-4" />}
          label="Cities"
          value={metrics.totalCities.toLocaleString()}
          subtitle="Unique locations"
          color="text-[#06b6d4]"
        />
        <MetricCard
          icon={<Check className="w-4 h-4" />}
          label="With Wallets"
          value={metrics.withWallets.toLocaleString()}
          subtitle="Wallet connected"
          color="text-[#9ae600]"
        />
      </div>

      {/* User Growth */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg">
        <div className="p-4 border-b border-[#27272a]">
          <h3 className="text-lg">User Growth</h3>
          <p className="text-sm text-[#9f9fa9] mt-1">User registration over time</p>
        </div>
        <div className="p-4">
          <div className="text-center py-8 text-[#9f9fa9]">No growth data available</div>
        </div>
      </div>
    </div>
  );
}

interface UsersListProps {
  users: SupabaseUser[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'all' | 'active' | 'inactive' | 'suspended';
  onStatusFilterChange: (status: 'all' | 'active' | 'inactive' | 'suspended') => void;
  roleFilter: string;
  onRoleFilterChange: (role: string) => void;
  locationFilter: string;
  onLocationFilterChange: (location: string) => void;
  onUserClick: (user: SupabaseUser) => void;
  onRefresh: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalCount: number;
}

function UsersList({ 
  users, 
  isLoading,
  error,
  searchQuery, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange, 
  roleFilter, 
  onRoleFilterChange, 
  locationFilter, 
  onLocationFilterChange,
  onUserClick,
  onRefresh,
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  totalCount
}: UsersListProps) {
  // Calculate correct row number accounting for pagination
  const getRowNumber = (index: number) => ((currentPage - 1) * pageSize) + index + 1;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9f9fa9]" />
            <input
              type="text"
              placeholder="Search users by name, email, phone..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm text-white placeholder:text-[#9f9fa9] focus:outline-none focus:border-[#9ae600]"
            />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => onRoleFilterChange(e.target.value)}
              className="appearance-none bg-[#18181b] border border-[#27272a] rounded pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#9ae600] cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="founder">Founder</option>
              <option value="citizen">Citizen</option>
              <option value="visitor">Visitor</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>

          {/* Refresh */}
          <button 
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:bg-[#27272a] transition-colors whitespace-nowrap disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          {/* Export */}
          <button className="flex items-center gap-2 px-4 py-2 bg-[#18181b] border border-[#27272a] rounded text-sm hover:bg-[#27272a] transition-colors whitespace-nowrap">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-[#fb2c36]/10 border border-[#fb2c36]/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#fb2c36] flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-[#fb2c36]">Failed to load users</h4>
            <p className="text-xs text-[#9f9fa9] mt-1">{error}</p>
          </div>
          <button
            onClick={onRefresh}
            className="px-3 py-1 bg-[#fb2c36]/20 text-[#fb2c36] rounded text-xs hover:bg-[#fb2c36]/30 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Users Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#9ae600] animate-spin" />
        </div>
      ) : !error && users.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-[#71717b] mx-auto mb-4" />
          <p className="text-[#9f9fa9]">No users found</p>
          <p className="text-xs text-[#71717b] mt-1">
            {searchQuery ? 'Try adjusting your search or filters' : 'Users will appear here once synced'}
          </p>
        </div>
      ) : !error && (
        <div className="bg-[#09090b] border border-[#27272a] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#27272a] text-left">
                  <th className="px-4 py-3 text-xs font-medium text-[#9f9fa9]">#</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#9f9fa9]">User</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#9f9fa9]">Email</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#9f9fa9]">Phone</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#9f9fa9]">Role</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#9f9fa9]">Wallet</th>
                  <th className="px-4 py-3 text-xs font-medium text-[#9f9fa9]">Synced</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className="border-b border-[#27272a] hover:bg-[#18181b] cursor-pointer transition-colors"
                    onClick={() => onUserClick(user)}
                  >
                    <td className="px-4 py-3 text-sm text-[#71717b]">{getRowNumber(index)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#27272a] overflow-hidden flex-shrink-0">
                          {user.pfp ? (
                            <img src={user.pfp} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#71717b]">
                              <UserCircle className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm text-white">{user.name || user.username || 'Unnamed'}</div>
                          {user.city && <div className="text-xs text-[#71717b]">{user.city}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#9f9fa9]">{user.email || '-'}</td>
                    <td className="px-4 py-3 text-sm text-[#9f9fa9]">{user.phone || '-'}</td>
                    <td className="px-4 py-3">
                      {user.zo_membership && (
                        <span className={`px-2 py-1 text-xs rounded ${
                          user.zo_membership === 'founder' 
                            ? 'bg-[#422006] text-[#eab308]' 
                            : 'bg-[#27272a] text-[#9f9fa9]'
                        }`}>
                          {user.zo_membership}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#9ae600] font-mono">
                      {user.wallet_address 
                        ? `${user.wallet_address.slice(0, 6)}...${user.wallet_address.slice(-4)}`
                        : '-'
                      }
                    </td>
                    <td className="px-4 py-3 text-xs text-[#71717b]">
                      {user.zo_synced_at 
                        ? new Date(user.zo_synced_at).toLocaleDateString()
                        : '-'
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-[#27272a] px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[#9f9fa9]">
              Showing <span className="text-white">{((currentPage - 1) * pageSize) + 1}</span> to{' '}
              <span className="text-white">{Math.min(currentPage * pageSize, totalCount)}</span> of{' '}
              <span className="text-white">{totalCount.toLocaleString()}</span> users
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded text-sm border border-[#27272a] hover:bg-[#18181b] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                First
              </button>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded text-sm border border-[#27272a] hover:bg-[#18181b] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={i}
                      onClick={() => onPageChange(pageNum)}
                      className={`w-8 h-8 rounded text-sm ${
                        currentPage === pageNum
                          ? 'bg-[#9ae600] text-black'
                          : 'border border-[#27272a] hover:bg-[#18181b]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded text-sm border border-[#27272a] hover:bg-[#18181b] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
              <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded text-sm border border-[#27272a] hover:bg-[#18181b] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Last
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-6">
      <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-6">
        <h3 className="text-lg mb-4">User Analytics</h3>
        <div className="text-center py-8 text-[#9f9fa9]">
          Analytics data will be displayed here
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle: string;
  color: string;
}

function MetricCard({ icon, label, value, subtitle, color }: MetricCardProps) {
  return (
    <div className="bg-[#09090b] border border-[#27272a] rounded-lg p-5 hover:border-[#71717b] transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-[#9f9fa9]">{label}</div>
        <div className={`p-2 bg-[#27272a] rounded ${color}`}>
          {icon}
        </div>
      </div>
      <div className={`text-3xl mb-2 ${color}`}>{value}</div>
      <div className="text-xs text-[#71717b]">{subtitle}</div>
    </div>
  );
}
