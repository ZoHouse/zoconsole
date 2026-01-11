/**
 * Zo API Endpoints
 * Based on Reference implementation
 */

import { zoServer } from '../axios';

// ===========================================
// PROFILE APIs
// ===========================================

export const getProfile = async () => {
  const response = await zoServer.get('/api/v1/profile/me/');
  return response.data;
};

export const updateProfile = async (data: Record<string, any>) => {
  const response = await zoServer.patch('/api/v1/profile/me/', data);
  return response.data;
};

export const getMyNfts = async () => {
  const response = await zoServer.get('/api/v1/profile/me/nfts/');
  return response.data;
};

export const getProfilePictures = async () => {
  const response = await zoServer.get('/api/v1/profile/me/pfp/');
  return response.data;
};

// ===========================================
// WEBTHREE / FOUNDER APIs
// ===========================================

export const getFounderNfts = async (params?: { wallet?: string }) => {
  const search = params?.wallet ? `?wallet=${params.wallet}` : '';
  const response = await zoServer.get(`/api/v1/webthree/founder/nfts/${search}`);
  return response.data;
};

export const getFounderAllowlist = async () => {
  const response = await zoServer.get('/api/v1/webthree/founder/allowlist/');
  return response.data;
};

export const getFounderMarketplaceListings = async () => {
  const response = await zoServer.get('/api/v1/webthree/founder/marketplace/listings/');
  return response.data;
};

export const getOwnedNfts = async (address: string) => {
  const response = await zoServer.get(`/api/v1/webthree/nft/owned/${address}`);
  return response.data;
};

export const getPoa = async (params?: { event_id?: string }) => {
  const search = params?.event_id ? `?event_id=${params.event_id}` : '';
  const response = await zoServer.get(`/api/v1/webthree/poa/${search}`);
  return response.data;
};

export const getPublicPoa = async () => {
  const response = await zoServer.get('/api/v1/webthree/public/poa/');
  return response.data;
};

// ===========================================
// ZOWORLD APIs
// ===========================================

export const getZoworldEvents = async (params?: {
  limit?: number;
  offset?: number;
  city?: string;
}) => {
  const searchParams = new URLSearchParams();
  if (params?.limit) searchParams.set('limit', String(params.limit));
  if (params?.offset) searchParams.set('offset', String(params.offset));
  if (params?.city) searchParams.set('city', params.city);
  
  const search = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const response = await zoServer.get(`/api/v1/zoworld/events/${search}`);
  return response.data;
};

export const getDestinations = async () => {
  const response = await zoServer.get('/api/v1/zoworld/destinations/');
  return response.data;
};

export const getZoworldMetadata = async () => {
  const response = await zoServer.get('/api/v1/zoworld/metadata/');
  return response.data;
};

export const getCountries = async () => {
  const response = await zoServer.get('/api/v1/zoworld/countries/');
  return response.data;
};

export const getBulletinSocials = async () => {
  const response = await zoServer.get('/api/v1/zoworld/bulletin/socials/');
  return response.data;
};

export const getPublicBulletins = async () => {
  const response = await zoServer.get('/api/v1/zoworld/public/bulletins/');
  return response.data;
};

// ===========================================
// AUTH APIs
// ===========================================

export const requestMobileOtp = async (data: {
  mobile_number: string;
  mobile_country_code: string;
  message_channel?: string;
}) => {
  const response = await zoServer.post('/api/v1/auth/login/mobile/otp/', data);
  return response.data;
};

export const verifyMobileOtp = async (data: {
  mobile_number: string;
  mobile_country_code: string;
  otp: string;
}) => {
  const response = await zoServer.post('/api/v1/auth/login/mobile/', data);
  return response.data;
};

export const getUserWallets = async () => {
  const response = await zoServer.get('/api/v1/auth/user/web3-wallets/');
  return response.data;
};

export const getUserEmails = async () => {
  const response = await zoServer.get('/api/v1/auth/user/emails/');
  return response.data;
};

export const getUserMobiles = async () => {
  const response = await zoServer.get('/api/v1/auth/user/mobiles/');
  return response.data;
};
