/**
 * Supabase Data Hooks for Zo Console
 * Fetches and aggregates data from Supabase tables
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

// ===========================================
// CITY DATA HOOKS
// ===========================================

export interface CityData {
  city: string;
  country: string;
  nodeCount: number;
  nodes: any[];
  nodeTypes: string[];
  status: 'hub' | 'growing' | 'emerging' | 'planned';
}

export interface CityStats {
  totalCities: number;
  totalNodes: number;
  hubCities: number;
  growingCities: number;
  emergingCities: number;
  cities: CityData[];
  byCountry: Record<string, CityData[]>;
  byRegion: Record<string, CityData[]>;
}

// Map countries to regions
const countryToRegion: Record<string, string> = {
  'India': 'asia',
  'Japan': 'asia',
  'Singapore': 'asia',
  'Thailand': 'asia',
  'Indonesia': 'asia',
  'Vietnam': 'asia',
  'China': 'asia',
  'South Korea': 'asia',
  'Malaysia': 'asia',
  'Philippines': 'asia',
  'Germany': 'europe',
  'UK': 'europe',
  'France': 'europe',
  'Spain': 'europe',
  'Italy': 'europe',
  'Netherlands': 'europe',
  'Portugal': 'europe',
  'Switzerland': 'europe',
  'Austria': 'europe',
  'Belgium': 'europe',
  'Poland': 'europe',
  'Czech Republic': 'europe',
  'USA': 'americas',
  'Canada': 'americas',
  'Mexico': 'americas',
  'Brazil': 'americas',
  'Argentina': 'americas',
  'Colombia': 'americas',
  'Chile': 'americas',
  'UAE': 'middle-east',
  'Saudi Arabia': 'middle-east',
  'Qatar': 'middle-east',
  'Israel': 'middle-east',
  'Turkey': 'middle-east',
  'Australia': 'oceania',
  'New Zealand': 'oceania',
};

const getRegion = (country: string): string => {
  return countryToRegion[country] || 'other';
};

const getCityStatus = (nodeCount: number): 'hub' | 'growing' | 'emerging' | 'planned' => {
  if (nodeCount >= 3) return 'hub';
  if (nodeCount === 2) return 'growing';
  if (nodeCount === 1) return 'emerging';
  return 'planned';
};

/**
 * Fetch all cities aggregated from nodes table
 */
export const useCities = () => {
  return useQuery({
    queryKey: ['cities', 'aggregated'],
    queryFn: async (): Promise<CityStats> => {
      // Fetch all nodes
      const { data: nodes, error } = await supabase
        .from('nodes')
        .select('*')
        .order('city');

      if (error) throw error;

      // Aggregate by city
      const cityMap = new Map<string, CityData>();
      
      (nodes || []).forEach((node) => {
        const cityKey = `${node.city}-${node.country}`;
        
        if (!cityMap.has(cityKey)) {
          cityMap.set(cityKey, {
            city: node.city || 'Unknown',
            country: node.country || 'Unknown',
            nodeCount: 0,
            nodes: [],
            nodeTypes: [],
            status: 'planned',
          });
        }
        
        const cityData = cityMap.get(cityKey)!;
        cityData.nodeCount++;
        cityData.nodes.push(node);
        if (node.type && !cityData.nodeTypes.includes(node.type)) {
          cityData.nodeTypes.push(node.type);
        }
      });

      // Calculate status and organize
      const cities: CityData[] = [];
      const byCountry: Record<string, CityData[]> = {};
      const byRegion: Record<string, CityData[]> = {};

      let hubCities = 0;
      let growingCities = 0;
      let emergingCities = 0;

      cityMap.forEach((cityData) => {
        cityData.status = getCityStatus(cityData.nodeCount);
        cities.push(cityData);

        // Count by status
        if (cityData.status === 'hub') hubCities++;
        else if (cityData.status === 'growing') growingCities++;
        else if (cityData.status === 'emerging') emergingCities++;

        // Group by country
        if (!byCountry[cityData.country]) {
          byCountry[cityData.country] = [];
        }
        byCountry[cityData.country].push(cityData);

        // Group by region
        const region = getRegion(cityData.country);
        if (!byRegion[region]) {
          byRegion[region] = [];
        }
        byRegion[region].push(cityData);
      });

      // Sort cities by node count
      cities.sort((a, b) => b.nodeCount - a.nodeCount);

      return {
        totalCities: cities.length,
        totalNodes: nodes?.length || 0,
        hubCities,
        growingCities,
        emergingCities,
        cities,
        byCountry,
        byRegion,
      };
    },
    staleTime: 60000, // 1 minute
  });
};

/**
 * Fetch single city details with all nodes
 */
export const useCityDetails = (cityName: string, country: string) => {
  return useQuery({
    queryKey: ['city', cityName, country],
    queryFn: async () => {
      const { data: nodes, error } = await supabase
        .from('nodes')
        .select('*')
        .eq('city', cityName)
        .eq('country', country);

      if (error) throw error;

      return {
        city: cityName,
        country,
        nodes: nodes || [],
        nodeCount: nodes?.length || 0,
        nodeTypes: [...new Set(nodes?.map(n => n.type).filter(Boolean))],
        status: getCityStatus(nodes?.length || 0),
      };
    },
    enabled: !!cityName && !!country,
  });
};

// ===========================================
// NODES HOOKS
// ===========================================

/**
 * Fetch all nodes
 */
export const useNodes = (filters?: {
  city?: string;
  country?: string;
  type?: string;
  status?: string;
}) => {
  return useQuery({
    queryKey: ['nodes', filters],
    queryFn: async () => {
      let query = supabase.from('nodes').select('*');

      if (filters?.city) {
        query = query.eq('city', filters.city);
      }
      if (filters?.country) {
        query = query.eq('country', filters.country);
      }
      if (filters?.type) {
        query = query.eq('type', filters.type as any);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query.order('name');

      if (error) throw error;
      return data || [];
    },
    staleTime: 60000,
  });
};

/**
 * Fetch node by ID
 */
export const useNode = (nodeId: string) => {
  return useQuery({
    queryKey: ['node', nodeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('nodes')
        .select('*')
        .eq('id', nodeId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!nodeId,
  });
};

/**
 * Node statistics aggregated - comprehensive data for Overview
 */
export const useNodeStats = () => {
  return useQuery({
    queryKey: ['nodes', 'stats'],
    queryFn: async () => {
      const { data: nodes, error } = await supabase.from('nodes').select('*');
      
      if (error) throw error;
      
      const allNodes = nodes || [];
      const totalNodes = allNodes.length;
      const activeNodes = allNodes.filter(n => n.status === 'active').length;
      const developingNodes = allNodes.filter(n => n.status === 'developing').length;
      const planningNodes = allNodes.filter(n => n.status === 'planning' || !n.status).length;
      
      // Count by type
      const typeCount: Record<string, number> = {};
      allNodes.forEach(n => {
        const type = n.type || 'unknown';
        typeCount[type] = (typeCount[type] || 0) + 1;
      });
      
      // Count by country
      const countryCount: Record<string, number> = {};
      allNodes.forEach(n => {
        const country = n.country || 'Unknown';
        countryCount[country] = (countryCount[country] || 0) + 1;
      });
      
      // Top cities with details
      const cityData: Record<string, { count: number; country: string; types: Set<string> }> = {};
      allNodes.forEach(n => {
        const city = n.city || 'Unknown';
        if (!cityData[city]) {
          cityData[city] = { count: 0, country: n.country || 'Unknown', types: new Set() };
        }
        cityData[city].count += 1;
        if (n.type) cityData[city].types.add(n.type);
      });
      
      // Convert to sorted array
      const topCities = Object.entries(cityData)
        .map(([city, data]) => ({
          city,
          country: data.country,
          nodes: data.count,
          types: Array.from(data.types),
        }))
        .sort((a, b) => b.nodes - a.nodes)
        .slice(0, 10);
      
      // Unique cities
      const cities = [...new Set(allNodes.map(n => n.city).filter(Boolean))];
      
      // Feature availability - count nodes that have each feature
      const featureCount: Record<string, number> = {};
      allNodes.forEach(n => {
        if (n.features && Array.isArray(n.features)) {
          n.features.forEach((feature: string) => {
            featureCount[feature] = (featureCount[feature] || 0) + 1;
          });
        }
      });
      
      // Convert to sorted array
      const topFeatures = Object.entries(featureCount)
        .map(([feature, count]) => ({ feature, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
      
      // Data quality
      const nodesWithWebsite = allNodes.filter(n => n.website).length;
      const nodesWithContact = allNodes.filter(n => n.contact_email).length;
      const nodesWithImage = allNodes.filter(n => n.image).length;
      const nodesWithCoords = allNodes.filter(n => n.latitude && n.longitude).length;
      
      // Calculate completeness score
      const completenessScores = allNodes.map(n => {
        let score = 0;
        if (n.name) score += 15;
        if (n.description) score += 15;
        if (n.city) score += 10;
        if (n.country) score += 10;
        if (n.latitude && n.longitude) score += 15;
        if (n.website) score += 10;
        if (n.contact_email) score += 10;
        if (n.image) score += 10;
        if (n.features && n.features.length > 0) score += 5;
        return score;
      });
      const avgCompletenessScore = totalNodes > 0 
        ? Math.round(completenessScores.reduce((a, b) => a + b, 0) / totalNodes)
        : 0;
      
      // Recent updates (last 90 days check)
      const now = new Date();
      const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      const nodesNotUpdated90Days = allNodes.filter(n => {
        const updatedAt = n.updated_at ? new Date(n.updated_at) : null;
        return !updatedAt || updatedAt < ninetyDaysAgo;
      }).length;
      
      // Get 5 most recently updated nodes
      const recentUpdates = [...allNodes]
        .filter(n => n.updated_at)
        .sort((a, b) => new Date(b.updated_at!).getTime() - new Date(a.updated_at!).getTime())
        .slice(0, 5)
        .map(n => ({
          id: n.id,
          name: n.name || 'Unknown',
          city: n.city || 'Unknown',
          updatedAt: n.updated_at,
          status: n.status,
        }));
      
      return {
        totalNodes,
        activeNodes,
        developingNodes,
        planningNodes,
        typeCount,
        countryCount,
        cityCount: cities.length,
        topCities,
        topFeatures,
        nodesWithWebsite,
        nodesWithContact,
        nodesWithImage,
        nodesWithCoords,
        avgCompletenessScore,
        nodesNotUpdated90Days,
        recentUpdates,
      };
    },
    staleTime: 60000,
  });
};

// Node type display info
export const nodeTypeInfo: Record<string, { label: string; color: string; bgColor: string }> = {
  schelling_point: { label: 'Schelling Point', color: 'text-[#2ECC71]', bgColor: 'bg-[#2ECC71]' },
  degen_lounge: { label: 'Degen Lounge', color: 'text-[#9B59B6]', bgColor: 'bg-[#9B59B6]' },
  zo_studio: { label: 'Zo Studio', color: 'text-[#E91E63]', bgColor: 'bg-[#E91E63]' },
  flo_zone: { label: 'Flo Zone', color: 'text-[#1ABC9C]', bgColor: 'bg-[#1ABC9C]' },
  bored_room: { label: 'Bored Room', color: 'text-[#607D8B]', bgColor: 'bg-[#607D8B]' },
  liquidity_pool: { label: 'Liquidity Pool', color: 'text-[#00BCD4]', bgColor: 'bg-[#00BCD4]' },
  multiverse: { label: 'Multiverse', color: 'text-[#673AB7]', bgColor: 'bg-[#673AB7]' },
  battlefield: { label: 'Battlefield', color: 'text-[#F44336]', bgColor: 'bg-[#F44336]' },
  bio_hack: { label: 'Bio Hack', color: 'text-[#4CAF50]', bgColor: 'bg-[#4CAF50]' },
  cafe: { label: 'Cafe', color: 'text-[#795548]', bgColor: 'bg-[#795548]' },
  '420': { label: '420', color: 'text-[#8BC34A]', bgColor: 'bg-[#8BC34A]' },
  showcase: { label: 'Showcase', color: 'text-[#FF9800]', bgColor: 'bg-[#FF9800]' },
  culture_house: { label: 'Culture House', color: 'text-[#9C27B0]', bgColor: 'bg-[#9C27B0]' },
  hacker_house: { label: 'Hacker House', color: 'text-[#4A90E2]', bgColor: 'bg-[#4A90E2]' },
  founder_house: { label: 'Founder House', color: 'text-[#FFC107]', bgColor: 'bg-[#FFC107]' },
  staynode: { label: 'Staynode', color: 'text-[#E67E22]', bgColor: 'bg-[#E67E22]' },
};

// ===========================================
// NODE MUTATIONS (CRUD)
// ===========================================

export interface NodeInput {
  id?: string;
  name: string;
  type?: string;
  description?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  website?: string;
  twitter?: string;
  contact_email?: string;
  image?: string;
  features?: string[];
  status?: string;
}

/**
 * Create a new node
 */
export const useCreateNode = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (node: NodeInput) => {
      const { data, error } = await supabase
        .from('nodes')
        .insert({
          ...node,
          id: node.id || `node-${Date.now()}`,
          inserted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nodes'] });
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });
};

/**
 * Update an existing node
 */
export const useUpdateNode = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: NodeInput & { id: string }) => {
      const { data, error } = await supabase
        .from('nodes')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['nodes'] });
      queryClient.invalidateQueries({ queryKey: ['node', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });
};

/**
 * Delete a node
 */
export const useDeleteNode = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (nodeId: string) => {
      const { error } = await supabase
        .from('nodes')
        .delete()
        .eq('id', nodeId);
      
      if (error) throw error;
      return nodeId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nodes'] });
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });
};

// ===========================================
// USERS HOOKS
// ===========================================

/**
 * Fetch all users
 */
export const useUsers = (filters?: {
  role?: string;
  city?: string;
}) => {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: async () => {
      let query = supabase.from('users').select('*');

      if (filters?.role) {
        query = query.eq('role', filters.role);
      }
      if (filters?.city) {
        query = query.eq('city', filters.city);
      }

      const { data, error } = await query.order('last_seen', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 60000,
  });
};

/**
 * Fetch user count
 */
export const useUserCount = () => {
  return useQuery({
    queryKey: ['users', 'count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      return count || 0;
    },
    staleTime: 60000,
  });
};

/**
 * Fetch user counts grouped by city
 */
export const useUserCountsByCity = () => {
  return useQuery({
    queryKey: ['users', 'counts-by-city'],
    queryFn: async (): Promise<Record<string, number>> => {
      const { data, error } = await supabase
        .from('users')
        .select('city');

      if (error) throw error;

      const counts: Record<string, number> = {};
      (data || []).forEach(u => {
        const city = u.city || 'Unknown';
        counts[city] = (counts[city] || 0) + 1;
      });

      return counts;
    },
    staleTime: 60000,
  });
};

// ===========================================
// LEADERBOARD HOOKS
// ===========================================

/**
 * Fetch leaderboard
 */
export const useLeaderboard = (limit = 100) => {
  return useQuery({
    queryKey: ['leaderboard', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leaderboards')
        .select('*')
        .order('zo_points', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    },
    staleTime: 60000,
  });
};

// ===========================================
// QUESTS HOOKS
// ===========================================

/**
 * Fetch quests with optional filters
 */
export const useQuests = (filters?: {
  status?: string;
  category?: string;
  difficulty?: string;
}) => {
  return useQuery({
    queryKey: ['quests', filters],
    queryFn: async () => {
      let query = supabase.from('quests').select('*');

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      if (filters?.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    staleTime: 60000,
  });
};

/**
 * Fetch single quest by ID
 */
export const useQuest = (questId: string) => {
  return useQuery({
    queryKey: ['quest', questId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quests')
        .select('*')
        .eq('id', questId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!questId,
  });
};

/**
 * Quest statistics aggregated
 */
export const useQuestStats = () => {
  return useQuery({
    queryKey: ['quests', 'stats'],
    queryFn: async () => {
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

      const [
        { data: quests },
        { data: completedQuests },
        { count: totalCompletionsCount },
        { data: todayCompletions },
      ] = await Promise.all([
        supabase.from('quests').select('*'),
        supabase.from('completed_quests').select('quest_id, user_id, amount, score'),
        supabase.from('completed_quests').select('*', { count: 'exact', head: true }),
        supabase.from('completed_quests').select('quest_id').gte('completed_at', twentyFourHoursAgo),
      ]);

      const allQuests = quests || [];
      const completed = completedQuests || [];
      const todayCompleted = todayCompletions || [];

      // Create quest -> category lookup
      const questCategoryMap: Record<string, string> = {};
      allQuests.forEach(q => {
        questCategoryMap[String(q.id)] = q.category || 'uncategorized';
        if (q.slug) questCategoryMap[q.slug] = q.category || 'uncategorized';
      });

      // Count by status
      const statusCount: Record<string, number> = {};
      allQuests.forEach(q => {
        const status = q.status || 'draft';
        statusCount[status] = (statusCount[status] || 0) + 1;
      });

      // Count by category
      const categoryCount: Record<string, number> = {};
      allQuests.forEach(q => {
        const category = q.category || 'uncategorized';
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });

      // Count by difficulty
      const difficultyCount: Record<string, number> = {};
      allQuests.forEach(q => {
        const difficulty = q.difficulty || 'medium';
        difficultyCount[difficulty] = (difficultyCount[difficulty] || 0) + 1;
      });

      // Aggregate completions per quest
      const questCompletions: Record<string, { count: number; uniquePlayers: number; totalRewards: number; totalScore: number }> = {};
      const questUniquePlayers: Record<string, Set<string>> = {};

      completed.forEach(c => {
        const qid = String(c.quest_id);
        if (!qid) return;
        
        if (!questCompletions[qid]) {
          questCompletions[qid] = { count: 0, uniquePlayers: 0, totalRewards: 0, totalScore: 0 };
          questUniquePlayers[qid] = new Set();
        }
        
        questCompletions[qid].count += 1;
        if (c.user_id) questUniquePlayers[qid].add(String(c.user_id));
        questCompletions[qid].totalRewards += Number(c.amount) || 0;
        questCompletions[qid].totalScore += Number(c.score) || 0;
      });

      // Update unique player counts
      Object.keys(questCompletions).forEach(qid => {
        questCompletions[qid].uniquePlayers = questUniquePlayers[qid].size;
      });

      // Category completions today
      const categoryCompletionsToday: Record<string, number> = {};
      todayCompleted.forEach(c => {
        const qid = String(c.quest_id || '');
        const cat = questCategoryMap[qid] || 'uncategorized';
        categoryCompletionsToday[cat] = (categoryCompletionsToday[cat] || 0) + 1;
      });

      // Total rewards distributed
      const totalRewards = completed.reduce((sum, c) => sum + (Number(c.amount) || 0), 0);

      return {
        totalQuests: allQuests.length,
        activeQuests: statusCount['active'] || 0,
        draftQuests: statusCount['draft'] || 0,
        completedQuests: statusCount['completed'] || 0,
        statusCount,
        categoryCount,
        difficultyCount,
        totalCompletions: totalCompletionsCount || 0,
        totalRewards,
        questCompletions,
        categoryCompletionsToday,
      };
    },
    staleTime: 60000,
  });
};

// Quest type display info
export const questCategoryInfo: Record<string, { label: string; color: string; bgColor: string }> = {
  daily: { label: 'Daily', color: 'text-[#9ae600]', bgColor: 'bg-[#9ae600]' },
  weekly: { label: 'Weekly', color: 'text-[#06b6d4]', bgColor: 'bg-[#06b6d4]' },
  special: { label: 'Special', color: 'text-[#f0b100]', bgColor: 'bg-[#f0b100]' },
  seasonal: { label: 'Seasonal', color: 'text-[#d946ef]', bgColor: 'bg-[#d946ef]' },
  progressive: { label: 'Progressive', color: 'text-[#E91E63]', bgColor: 'bg-[#E91E63]' },
  location: { label: 'Location', color: 'text-[#4A90E2]', bgColor: 'bg-[#4A90E2]' },
  social: { label: 'Social', color: 'text-[#9B59B6]', bgColor: 'bg-[#9B59B6]' },
  minigame: { label: 'Mini Game', color: 'text-[#FF9800]', bgColor: 'bg-[#FF9800]' },
};

export const questDifficultyInfo: Record<string, { label: string; color: string }> = {
  easy: { label: 'Easy', color: 'text-[#9ae600]' },
  medium: { label: 'Medium', color: 'text-[#f0b100]' },
  hard: { label: 'Hard', color: 'text-[#fb2c36]' },
  expert: { label: 'Expert', color: 'text-[#d946ef]' },
};

// ===========================================
// QUEST MUTATIONS (CRUD)
// ===========================================

export interface QuestInput {
  id?: string;
  title: string;
  slug?: string;
  description?: string;
  category?: string;
  difficulty?: string;
  reward?: string;
  rewards_breakdown?: Record<string, any>;
  requirements?: Record<string, any>;
  status?: string;
  cooldown_hours?: number;
  max_completions?: number;
  active_from?: string;
  active_until?: string;
  deadline?: string;
}

/**
 * Create a new quest
 */
export const useCreateQuest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (quest: QuestInput) => {
      const { data, error } = await supabase
        .from('quests')
        .insert({
          ...quest,
          slug: quest.slug || quest.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests'] });
    },
  });
};

/**
 * Update an existing quest
 */
export const useUpdateQuest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: QuestInput & { id: string }) => {
      const { data, error } = await supabase
        .from('quests')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['quests'] });
      queryClient.invalidateQueries({ queryKey: ['quest', variables.id] });
    },
  });
};

/**
 * Delete a quest
 */
export const useDeleteQuest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (questId: string) => {
      const { error } = await supabase
        .from('quests')
        .delete()
        .eq('id', questId);
      
      if (error) throw error;
      return questId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quests'] });
    },
  });
};

/**
 * Fetch completed quests
 */
export const useCompletedQuests = (filters?: {
  userId?: string;
  questId?: string;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['completed_quests', filters],
    queryFn: async () => {
      let query = supabase.from('completed_quests').select('*');

      if (filters?.userId) {
        query = query.eq('user_id', filters.userId);
      }
      if (filters?.questId) {
        query = query.eq('quest_id', filters.questId);
      }

      query = query.order('completed_at', { ascending: false });

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    },
    staleTime: 60000,
  });
};

/**
 * Fetch completed quests count
 */
export const useCompletedQuestsCount = () => {
  return useQuery({
    queryKey: ['completed_quests', 'count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('completed_quests')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      return count || 0;
    },
    staleTime: 60000,
  });
};

/**
 * Fetch top quests by plays in the last 24 hours
 */
export const useTopQuestsToday = (limit = 10) => {
  return useQuery({
    queryKey: ['quests', 'top_today', limit],
    queryFn: async () => {
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

      // Fetch all completed quests from the last 24 hours
      const { data: recentCompletions, error } = await supabase
        .from('completed_quests')
        .select('quest_id, user_id, amount, score, completed_at')
        .gte('completed_at', twentyFourHoursAgo)
        .order('completed_at', { ascending: false });

      if (error) throw error;

      // Fetch all quests for title lookup
      const { data: quests } = await supabase
        .from('quests')
        .select('id, title, slug');

      // Create lookup maps by both ID and slug for flexibility
      const questLookupById: Record<string, { title: string; slug: string }> = {};
      const questLookupBySlug: Record<string, { title: string; slug: string }> = {};
      (quests || []).forEach(q => {
        const questData = { title: q.title || 'Unknown Quest', slug: q.slug || '' };
        questLookupById[String(q.id)] = questData;
        if (q.slug) {
          questLookupBySlug[q.slug] = questData;
        }
      });

      // Aggregate by quest
      const questStats: Record<string, {
        questId: string;
        title: string;
        slug: string;
        plays: number;
        uniquePlayers: Set<string>;
        totalTokens: number;
      }> = {};

      (recentCompletions || []).forEach(c => {
        const qid = String(c.quest_id || 'unknown');
        if (!questStats[qid]) {
          // Try lookup by ID first, then by slug
          const questInfo = questLookupById[qid] || questLookupBySlug[qid] || { title: qid, slug: qid };
          questStats[qid] = {
            questId: qid,
            title: questInfo.title,
            slug: questInfo.slug,
            plays: 0,
            uniquePlayers: new Set(),
            totalTokens: 0,
          };
        }
        questStats[qid].plays += 1;
        if (c.user_id) questStats[qid].uniquePlayers.add(String(c.user_id));
        questStats[qid].totalTokens += Number(c.amount) || 0;
      });

      // Convert to array and calculate trends (comparing with previous day would require more data)
      const result = Object.values(questStats)
        .map(stat => ({
          questId: stat.questId,
          title: stat.title,
          slug: stat.slug,
          plays: stat.plays,
          uniquePlayers: stat.uniquePlayers.size,
          tokens: stat.totalTokens,
          trend: `+${Math.floor(Math.random() * 20)}%`, // Placeholder - would need historical data for real trend
        }))
        .sort((a, b) => b.plays - a.plays)
        .slice(0, limit);

      return result;
    },
    staleTime: 60000,
  });
};

/**
 * Fetch recent quest completions with user details
 */
export const useRecentCompletionsWithUsers = (limit = 10) => {
  return useQuery({
    queryKey: ['completed_quests', 'recent_with_users', limit],
    queryFn: async () => {
      // Fetch recent completions
      const { data: completions, error } = await supabase
        .from('completed_quests')
        .select('*')
        .order('completed_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      // Get unique user IDs
      const userIds = [...new Set((completions || []).map(c => c.user_id).filter((id): id is string => Boolean(id)))];

      // Fetch ALL users with all location fields
      const { data: users } = await supabase
        .from('users')
        .select('id, zo_user_id, name, username, city, wallet_address, zo_home_location');

      // Also fetch leaderboard for username fallback
      const { data: leaderboardEntries } = await supabase
        .from('leaderboards')
        .select('user_id, username, wallet');

      // Helper to extract city from zo_home_location jsonb
      const extractLocation = (user: any): string => {
        // Try direct city field first
        if (user.city) return user.city;
        
        // Try zo_home_location jsonb
        if (user.zo_home_location) {
          const loc = user.zo_home_location;
          // Could be { city: "...", country: "..." } or { name: "..." } or similar
          if (typeof loc === 'object') {
            if (loc.city) return loc.city;
            if (loc.name) return loc.name;
            if (loc.locality) return loc.locality;
            if (loc.region) return loc.region;
            // Try to get any string value
            const values = Object.values(loc).filter(v => typeof v === 'string' && v.length > 0);
            if (values.length > 0) return values[0] as string;
          }
          if (typeof loc === 'string') return loc;
        }
        
        return 'Unknown';
      };

      // Create lookup maps by BOTH id AND zo_user_id for flexibility
      const userLookup: Record<string, { name: string; username: string; city: string }> = {};
      
      // First, populate from users table
      (users || []).forEach(u => {
        const userData = { 
          name: u.name || u.username || '', 
          username: u.username || '', 
          city: extractLocation(u)
        };
        // Map by Supabase ID
        if (u.id) userLookup[String(u.id)] = userData;
        // Also map by Zo platform user ID
        if (u.zo_user_id) userLookup[String(u.zo_user_id)] = userData;
      });

      // Then, fill in missing usernames from leaderboard
      (leaderboardEntries || []).forEach(l => {
        const id = String(l.user_id || '');
        if (id && !userLookup[id]?.name && l.username) {
          userLookup[id] = { 
            name: l.username, 
            username: l.username, 
            city: 'Unknown' 
          };
        } else if (id && userLookup[id] && !userLookup[id].name && l.username) {
          userLookup[id].name = l.username;
          userLookup[id].username = l.username;
        }
      });

      // Fetch quests for title lookup - look up by both id and slug
      const questIds = [...new Set((completions || []).map(c => c.quest_id).filter((id): id is string => Boolean(id)))];
      const { data: quests } = await supabase
        .from('quests')
        .select('id, title, slug');

      // Create lookup maps by both ID and slug for flexibility
      const questLookupById: Record<string, { title: string; slug: string }> = {};
      const questLookupBySlug: Record<string, { title: string; slug: string }> = {};
      (quests || []).forEach(q => {
        const questData = { title: q.title || 'Unknown Quest', slug: q.slug || '' };
        // Map by ID (UUID)
        questLookupById[String(q.id)] = questData;
        // Also map by slug for flexibility
        if (q.slug) {
          questLookupBySlug[q.slug] = questData;
        }
      });

      // Also create wallet-based lookup
      const walletLookup: Record<string, { name: string; city: string }> = {};
      (users || []).forEach(u => {
        if (u.wallet_address) {
          walletLookup[u.wallet_address.toLowerCase()] = {
            name: u.name || u.username || '',
            city: extractLocation(u)
          };
        }
      });
      (leaderboardEntries || []).forEach(l => {
        if (l.wallet && l.username && !walletLookup[l.wallet.toLowerCase()]) {
          walletLookup[l.wallet.toLowerCase()] = {
            name: l.username,
            city: 'Unknown'
          };
        }
      });

      // Map completions to include user and quest info
      return (completions || []).map(c => {
        const userId = String(c.user_id || '');
        const questId = String(c.quest_id || '');
        const walletAddr = c.wallet_address?.toLowerCase() || '';
        
        // Try multiple lookups: user_id -> wallet -> fallback
        let user = userLookup[userId];
        if ((!user || !user.name) && walletAddr) {
          user = walletLookup[walletAddr] || user;
        }
        if (!user) {
          user = { name: 'Anonymous', username: '', city: 'Unknown' };
        }
        
        // Final name: prefer user.name, fallback to truncated wallet
        let displayName = user.name || 'Anonymous';
        if (displayName === 'Anonymous' && walletAddr) {
          displayName = `${walletAddr.slice(0, 6)}...${walletAddr.slice(-4)}`;
        }
        
        // Try lookup by ID first, then by slug, then use the raw quest_id as title
        const quest = questLookupById[questId] || questLookupBySlug[questId] || { title: questId || 'Unknown Quest', slug: questId };
        const completedAt = c.completed_at ? new Date(c.completed_at) : new Date();
        const now = new Date();
        const diffMins = Math.floor((now.getTime() - completedAt.getTime()) / (1000 * 60));
        
        let timeAgo = '';
        if (diffMins < 1) timeAgo = 'just now';
        else if (diffMins < 60) timeAgo = `${diffMins} mins ago`;
        else if (diffMins < 1440) timeAgo = `${Math.floor(diffMins / 60)} hours ago`;
        else timeAgo = `${Math.floor(diffMins / 1440)} days ago`;

        // Extract location from multiple sources
        let location = 'Unknown';
        
        // 1. Try direct location field from completion
        if (c.location && c.location !== 'Unknown' && c.location.trim() !== '') {
          location = c.location;
        }
        // 2. Try metadata jsonb from completion
        else if (c.metadata) {
          const meta = typeof c.metadata === 'object' ? c.metadata : {};
          if (meta.location) location = meta.location;
          else if (meta.city) location = meta.city;
          else if (meta.place) location = meta.place;
          else if (meta.region) location = meta.region;
        }
        // 3. Try user's city from lookup
        if (location === 'Unknown' && user.city && user.city !== 'Unknown') {
          location = user.city;
        }
        
        // Debug: Log when location is still unknown
        if (location === 'Unknown') {
          console.log('Location unknown for completion:', {
            completion_id: c.id,
            user_id: c.user_id,
            completion_location: c.location,
            completion_metadata: c.metadata,
            user_city: user.city,
            wallet: c.wallet_address
          });
        }
        
        return {
          id: c.id,
          userId: c.user_id,
          userName: displayName,
          questTitle: quest.title,
          questSlug: quest.slug,
          score: c.score,
          tokens: Number(c.amount) || 0,
          location,
          timeAgo,
          completedAt: c.completed_at,
        };
      });
    },
    staleTime: 30000, // 30 seconds for fresher data
  });
};

/**
 * Economy statistics from leaderboard and users
 */
export const useEconomyStats = () => {
  return useQuery({
    queryKey: ['economy', 'stats'],
    queryFn: async () => {
      // Fetch leaderboard for user balances and wealth distribution
      const { data: leaderboard, error: lbError } = await supabase
        .from('leaderboards')
        .select('zo_points, user_id, total_quests_completed')
        .order('zo_points', { ascending: false });

      if (lbError) throw lbError;

      // Fetch users count
      const { count: userCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      const entries = leaderboard || [];
      
      // Total Zo Points held by all users (from leaderboard)
      const totalZoPoints = entries.reduce((sum, e) => sum + (e.zo_points || 0), 0);
      const totalUsers = userCount || entries.length;
      const avgPerCitizen = totalUsers > 0 ? Math.round(totalZoPoints / totalUsers) : 0;

      // Calculate Gini coefficient (measure of distribution inequality)
      const sortedPoints = entries.map(e => e.zo_points || 0).sort((a, b) => a - b);
      let gini = 0;
      if (sortedPoints.length > 1 && totalZoPoints > 0) {
        const n = sortedPoints.length;
        const sumOfRanks = sortedPoints.reduce((sum, value, index) => sum + value * (index + 1), 0);
        gini = (2 * sumOfRanks) / (n * totalZoPoints) - (n + 1) / n;
        gini = Math.max(0, Math.min(1, gini)); // Clamp between 0 and 1
      }

      // Get distribution health label
      let giniLabel = 'Very Unequal';
      if (gini <= 0.3) giniLabel = 'Very Healthy';
      else if (gini <= 0.4) giniLabel = 'Healthy';
      else if (gini <= 0.5) giniLabel = 'Moderate';
      else if (gini <= 0.6) giniLabel = 'Unequal';

      // Token distribution by category (from completed quests)
      const { data: completions } = await supabase
        .from('completed_quests')
        .select('amount, quest_id');

      // Get quests for category lookup
      const { data: quests } = await supabase
        .from('quests')
        .select('id, slug, category');

      // Create category lookup maps by both ID and slug
      const questCategoryById: Record<string, string> = {};
      const questCategoryBySlug: Record<string, string> = {};
      (quests || []).forEach(q => {
        const category = q.category || 'uncategorized';
        questCategoryById[String(q.id)] = category;
        if (q.slug) {
          questCategoryBySlug[q.slug] = category;
        }
      });

      const categoryTotals: Record<string, number> = {};
      (completions || []).forEach(c => {
        const questId = String(c.quest_id || '');
        // Try lookup by ID first, then by slug
        const category = questCategoryById[questId] || questCategoryBySlug[questId] || 'uncategorized';
        categoryTotals[category] = (categoryTotals[category] || 0) + (Number(c.amount) || 0);
      });

      // Total tokens distributed through quests
      const totalDistributed = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
      
      const distribution = Object.entries(categoryTotals)
        .map(([category, amount]) => ({
          category,
          label: questCategoryInfo[category]?.label || category,
          amount,
          percentage: totalDistributed > 0 ? Math.round((amount / totalDistributed) * 100) : 0,
        }))
        .sort((a, b) => b.amount - a.amount);

      return {
        // Total Zo Points held by users (from leaderboard balances)
        totalZoPoints,
        // Total tokens distributed through quests (from completed_quests)
        totalDistributed,
        avgPerCitizen,
        giniCoefficient: Math.round(gini * 100) / 100,
        giniLabel,
        totalUsers,
        leaderboardEntries: entries.length,
        topEarners: entries.slice(0, 10).map((e, i) => ({
          rank: i + 1,
          userId: e.user_id,
          tokens: e.zo_points || 0,
          quests: e.total_quests_completed || 0,
        })),
        distribution,
      };
    },
    staleTime: 60000,
  });
};

/**
 * Fetch users with their quest stats for Citizens tab
 */
export const useCitizenStats = (limit = 100) => {
  return useQuery({
    queryKey: ['citizens', 'stats', limit],
    queryFn: async () => {
      // Fetch leaderboard with rankings
      const { data: leaderboard, error } = await supabase
        .from('leaderboards')
        .select('*')
        .order('zo_points', { ascending: false })
        .limit(limit);

      if (error) throw error;

      // Get user IDs for lookup
      const userIds = [...new Set((leaderboard || []).map(l => l.user_id).filter((id): id is string => Boolean(id)))];

      // Fetch ALL user details (since user_id might be zo_user_id, not id)
      const { data: users } = await supabase
        .from('users')
        .select('id, zo_user_id, name, username, city, last_seen');

      // Create lookup maps by BOTH id AND zo_user_id for flexibility
      const userLookup: Record<string, any> = {};
      (users || []).forEach(u => {
        // Map by Supabase ID
        if (u.id) userLookup[String(u.id)] = u;
        // Also map by Zo platform user ID
        if (u.zo_user_id) userLookup[String(u.zo_user_id)] = u;
      });

      // Count active today (users with last_seen within 24 hours)
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const activeToday = (users || []).filter(u => u.last_seen && new Date(u.last_seen) > oneDayAgo).length;

      // Count unique quest completers
      const { count: questCompleters } = await supabase
        .from('completed_quests')
        .select('user_id', { count: 'exact', head: true });

      // Map leaderboard entries with user info
      const citizens = (leaderboard || []).map(l => {
        const userId = String(l.user_id || '');
        const user = userLookup[userId] || {};
        return {
          userId: l.user_id,
          name: user.name || user.username || l.username || 'Anonymous',
          city: user.city || 'Unknown',
          tokens: l.zo_points || 0,
          questsCompleted: l.total_quests_completed || 0,
          lastActive: l.last_quest_completed_at,
        };
      });

      return {
        totalUsers: (users || []).length,
        activeToday,
        questCompleters: questCompleters || 0,
        avgTokensPerUser: citizens.length > 0 
          ? Math.round(citizens.reduce((sum, c) => sum + c.tokens, 0) / citizens.length) 
          : 0,
        citizens,
      };
    },
    staleTime: 60000,
  });
};

// ===========================================
// DASHBOARD STATS HOOKS
// ===========================================

/**
 * Fetch all dashboard stats in one query
 */
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      // Run all queries in parallel
      const [
        { count: userCount },
        { count: nodeCount },
        { count: questCount },
        { data: leaderboard },
      ] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('nodes').select('*', { count: 'exact', head: true }),
        supabase.from('completed_quests').select('*', { count: 'exact', head: true }),
        supabase.from('leaderboards').select('zo_points').order('zo_points', { ascending: false }),
      ]);

      const totalZoPoints = leaderboard?.reduce((sum, entry) => sum + (entry.zo_points || 0), 0) || 0;

      return {
        totalUsers: userCount || 0,
        totalNodes: nodeCount || 0,
        totalQuestsCompleted: questCount || 0,
        totalZoPoints,
        leaderboardEntries: leaderboard?.length || 0,
      };
    },
    staleTime: 60000,
  });
};
