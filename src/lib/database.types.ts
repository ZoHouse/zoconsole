export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type NodeType = 
  | 'schelling_point' | 'degen_lounge' | 'zo_studio' | 'flo_zone'
  | 'bored_room' | 'liquidity_pool' | 'multiverse' | 'battlefield'
  | 'bio_hack' | 'cafe' | '420' | 'showcase'
  | 'culture_house' | 'hacker_house' | 'founder_house' | 'staynode';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string | null
          username: string | null
          email: string | null
          phone: string | null
          phone_number: string | null
          pfp: string | null
          role: string | null
          zo_user_id: string | null
          zo_token: string | null
          zo_token_expiry: string | null
          zo_device_id: string | null
          zo_device_secret: string | null
          zo_synced_at: string | null
          zo_sync_status: string | null
          wallet_address: string | null
          founder_nfts_count: number | null
          total_reputation_score: number | null
          created_at: string | null
          updated_at: string | null
          last_seen: string | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
        Relationships: []
      }
      nodes: {
        Row: {
          id: string
          name: string | null
          type: NodeType | null
          description: string | null
          city: string | null
          country: string | null
          latitude: number | null
          longitude: number | null
          status: string | null
          features: string[] | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
        Relationships: []
      }
      leaderboards: {
        Row: {
          id: string
          user_id: string | null
          username: string | null
          zo_points: number | null
          total_quests_completed: number | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
        Relationships: []
      }
      completed_quests: {
        Row: {
          id: string
          user_id: string | null
          quest_id: string | null
          score: number | null
          completed_at: string | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
        Relationships: []
      }
      quests: {
        Row: {
          id: string
          title: string | null
          description: string | null
          status: string | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { node_type: NodeType }
    CompositeTypes: { [_ in never]: never }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type Node = Database['public']['Tables']['nodes']['Row']
