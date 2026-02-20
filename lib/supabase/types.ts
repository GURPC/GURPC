export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          department: string | null;
          batch_year: string | null;
          bio: string | null;
          research_interests: string[] | null;
          photo_url: string | null;
          google_scholar_url: string | null;
          ieee_url: string | null;
          researchgate_url: string | null;
          orcid_url: string | null;
          github_url: string | null;
          website_url: string | null;
          role: 'member' | 'executive' | 'moderator' | 'advisor' | 'admin';
          is_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          email?: string | null;
          department?: string | null;
          batch_year?: string | null;
          bio?: string | null;
          research_interests?: string[] | null;
          photo_url?: string | null;
          google_scholar_url?: string | null;
          ieee_url?: string | null;
          researchgate_url?: string | null;
          orcid_url?: string | null;
          github_url?: string | null;
          website_url?: string | null;
          role?: 'member' | 'executive' | 'moderator' | 'advisor' | 'admin';
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string | null;
          department?: string | null;
          batch_year?: string | null;
          bio?: string | null;
          research_interests?: string[] | null;
          photo_url?: string | null;
          google_scholar_url?: string | null;
          ieee_url?: string | null;
          researchgate_url?: string | null;
          orcid_url?: string | null;
          github_url?: string | null;
          website_url?: string | null;
          role?: 'member' | 'executive' | 'moderator' | 'advisor' | 'admin';
          is_approved?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      papers: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          doi_url: string | null;
          year: number | null;
          co_authors: string[] | null;
          file_url: string | null;
          status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'published';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          doi_url?: string | null;
          year?: number | null;
          co_authors?: string[] | null;
          file_url?: string | null;
          status?: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'published';
          created_at?: string;
        };
        Update: {
          title?: string;
          doi_url?: string | null;
          year?: number | null;
          co_authors?: string[] | null;
          file_url?: string | null;
          status?: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'published';
        };
        Relationships: [
          {
            foreignKeyName: 'papers_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      research_groups: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          domain: string;
          tags: string[] | null;
          is_public: boolean;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          domain: string;
          tags?: string[] | null;
          is_public?: boolean;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          domain?: string;
          tags?: string[] | null;
          is_public?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'research_groups_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      group_members: {
        Row: {
          id: string;
          group_id: string;
          user_id: string;
          role: 'admin' | 'member';
          joined_at: string;
        };
        Insert: {
          id?: string;
          group_id: string;
          user_id: string;
          role?: 'admin' | 'member';
          joined_at?: string;
        };
        Update: {
          role?: 'admin' | 'member';
        };
        Relationships: [
          {
            foreignKeyName: 'group_members_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'research_groups';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'group_members_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          domain: string | null;
          group_id: string | null;
          status: 'idea' | 'literature_review' | 'experiments' | 'draft' | 'submitted' | 'published';
          progress_percentage: number;
          is_public: boolean;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          domain?: string | null;
          group_id?: string | null;
          status?: 'idea' | 'literature_review' | 'experiments' | 'draft' | 'submitted' | 'published';
          progress_percentage?: number;
          is_public?: boolean;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          domain?: string | null;
          group_id?: string | null;
          status?: 'idea' | 'literature_review' | 'experiments' | 'draft' | 'submitted' | 'published';
          progress_percentage?: number;
          is_public?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'projects_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'projects_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'research_groups';
            referencedColumns: ['id'];
          }
        ];
      };
      project_members: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          role: 'admin' | 'member';
          joined_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          user_id: string;
          role?: 'admin' | 'member';
          joined_at?: string;
        };
        Update: {
          role?: 'admin' | 'member';
        };
        Relationships: [
          {
            foreignKeyName: 'project_members_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'project_members_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      milestones: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          description: string | null;
          is_completed: boolean;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          description?: string | null;
          is_completed?: boolean;
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          is_completed?: boolean;
          completed_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'milestones_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// Convenience types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Paper = Database['public']['Tables']['papers']['Row'];
export type ResearchGroup = Database['public']['Tables']['research_groups']['Row'];
export type GroupMember = Database['public']['Tables']['group_members']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectMember = Database['public']['Tables']['project_members']['Row'];
export type Milestone = Database['public']['Tables']['milestones']['Row'];
