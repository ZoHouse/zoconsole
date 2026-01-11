/**
 * React Query hooks for Zo API
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../lib/api/endpoints';

// ===========================================
// PROFILE HOOKS
// ===========================================

export const useProfile = () => {
  const { isLoggedIn, user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useQuery({
    queryKey: ['profile', 'me'],
    queryFn: api.getProfile,
    enabled: isLoggedIn === true,
    staleTime: Infinity,
    retry: 1,
  });

  const updateMutation = useMutation({
    mutationFn: api.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
    },
  });

  return {
    profile: profile?.data || profile,
    user,
    isLoading: isLoading || isFetching,
    error,
    updateProfile: updateMutation.mutate,
    isUpdatingProfile: updateMutation.isPending,
    refetchProfile: refetch,
  };
};

export const useMyNfts = () => {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: ['profile', 'me', 'nfts'],
    queryFn: api.getMyNfts,
    enabled: isLoggedIn === true,
  });
};

export const useProfilePictures = () => {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: ['profile', 'me', 'pfp'],
    queryFn: api.getProfilePictures,
    enabled: isLoggedIn === true,
  });
};

// ===========================================
// FOUNDER HOOKS
// ===========================================

export const useFounderNfts = (wallet?: string) => {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: ['webthree', 'founder', 'nfts', wallet],
    queryFn: () => api.getFounderNfts({ wallet }),
    enabled: isLoggedIn === true,
  });
};

export const useFounderAllowlist = () => {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: ['webthree', 'founder', 'allowlist'],
    queryFn: api.getFounderAllowlist,
    enabled: isLoggedIn === true,
  });
};

export const useFounderMarketplace = () => {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: ['webthree', 'founder', 'marketplace', 'listings'],
    queryFn: api.getFounderMarketplaceListings,
    enabled: isLoggedIn === true,
  });
};

export const useOwnedNfts = (address: string | undefined) => {
  return useQuery({
    queryKey: ['webthree', 'nft', 'owned', address],
    queryFn: () => api.getOwnedNfts(address!),
    enabled: !!address,
  });
};

export const usePoa = (eventId?: string) => {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: ['webthree', 'poa', eventId],
    queryFn: () => api.getPoa({ event_id: eventId }),
    enabled: isLoggedIn === true,
  });
};

export const usePublicPoa = () => {
  return useQuery({
    queryKey: ['webthree', 'public', 'poa'],
    queryFn: api.getPublicPoa,
  });
};

// ===========================================
// ZOWORLD HOOKS
// ===========================================

export const useZoworldEvents = (params?: {
  limit?: number;
  offset?: number;
  city?: string;
}) => {
  return useQuery({
    queryKey: ['zoworld', 'events', params],
    queryFn: () => api.getZoworldEvents(params),
  });
};

export const useDestinations = () => {
  return useQuery({
    queryKey: ['zoworld', 'destinations'],
    queryFn: api.getDestinations,
  });
};

export const useZoworldMetadata = () => {
  return useQuery({
    queryKey: ['zoworld', 'metadata'],
    queryFn: api.getZoworldMetadata,
  });
};

export const useCountries = () => {
  return useQuery({
    queryKey: ['zoworld', 'countries'],
    queryFn: api.getCountries,
  });
};

export const useBulletinSocials = () => {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: ['zoworld', 'bulletin', 'socials'],
    queryFn: api.getBulletinSocials,
    enabled: isLoggedIn === true,
  });
};

export const usePublicBulletins = () => {
  return useQuery({
    queryKey: ['zoworld', 'public', 'bulletins'],
    queryFn: api.getPublicBulletins,
  });
};

// ===========================================
// AUTH HOOKS
// ===========================================

export const useUserWallets = () => {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: ['auth', 'user', 'wallets'],
    queryFn: api.getUserWallets,
    enabled: isLoggedIn === true,
  });
};

export const useUserEmails = () => {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: ['auth', 'user', 'emails'],
    queryFn: api.getUserEmails,
    enabled: isLoggedIn === true,
  });
};

export const useUserMobiles = () => {
  const { isLoggedIn } = useAuth();

  return useQuery({
    queryKey: ['auth', 'user', 'mobiles'],
    queryFn: api.getUserMobiles,
    enabled: isLoggedIn === true,
  });
};

export const useMobileLogin = () => {
  const requestOtpMutation = useMutation({
    mutationFn: api.requestMobileOtp,
  });

  const verifyOtpMutation = useMutation({
    mutationFn: api.verifyMobileOtp,
  });

  return {
    requestOtp: requestOtpMutation.mutate,
    verifyOtp: verifyOtpMutation.mutate,
    isRequestingOtp: requestOtpMutation.isPending,
    isVerifyingOtp: verifyOtpMutation.isPending,
    requestError: requestOtpMutation.error,
    verifyError: verifyOtpMutation.error,
    otpRequestSuccess: requestOtpMutation.isSuccess,
    otpRequestData: requestOtpMutation.data,
    verifySuccess: verifyOtpMutation.isSuccess,
    verifyData: verifyOtpMutation.data,
    resetOtp: requestOtpMutation.reset,
    resetVerify: verifyOtpMutation.reset,
  };
};
