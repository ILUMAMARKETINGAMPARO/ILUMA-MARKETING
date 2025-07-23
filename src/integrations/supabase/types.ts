export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      api_secrets: {
        Row: {
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          is_configured: boolean | null
          key_name: string
          key_value: string | null
          last_tested_at: string | null
          metadata: Json | null
          service_name: string
          test_status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_configured?: boolean | null
          key_name: string
          key_value?: string | null
          last_tested_at?: string | null
          metadata?: Json | null
          service_name: string
          test_status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_configured?: boolean | null
          key_name?: string
          key_value?: string | null
          last_tested_at?: string | null
          metadata?: Json | null
          service_name?: string
          test_status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      businesses: {
        Row: {
          action_recommandee: string | null
          address: string | null
          ahrefs_rank: number | null
          ai_summary: string | null
          assigned_reason: string | null
          assigned_to: string | null
          backlinks: number | null
          backlinks_educational: number | null
          backlinks_form: number | null
          backlinks_frame: number | null
          backlinks_governmental: number | null
          backlinks_image: number | null
          backlinks_nofollow: number | null
          backlinks_redirect: number | null
          backlinks_text: number | null
          city: string
          contact_person_email: string | null
          contact_person_name: string | null
          contact_person_phone: string | null
          contenu_score: number | null
          conversion_probability: number | null
          country: string | null
          cpc_moyen: number | null
          created_at: string
          crm_status: Database["public"]["Enums"]["crm_status"] | null
          domain_rating: number | null
          estimated_deal_value: number | null
          gmb_url: string | null
          google_place_id: string | null
          google_rating: number | null
          has_photos: boolean | null
          id: string
          ila_score: number | null
          indexed_keywords: number | null
          is_chain: boolean | null
          is_sponsored: boolean | null
          kd_moyen: number | null
          last_analyzed_at: string | null
          last_contact_date: string | null
          lat: number | null
          lead_source: string | null
          linked_domains: number | null
          lng: number | null
          location: unknown | null
          meilleure_page_concurrente: string | null
          name: string
          next_follow_up: string | null
          organic_traffic: number | null
          pages_indexees: number | null
          phone: string | null
          position_score: number | null
          postal_code: string | null
          potential: Database["public"]["Enums"]["business_potential"] | null
          presence_blog: boolean | null
          presence_physique_score: number | null
          priority_level: number | null
          province: string | null
          puntaje_dr: number | null
          puntaje_keywords: number | null
          puntaje_rd: number | null
          puntaje_trafico: number | null
          qualite_blog: number | null
          recommended_action: string | null
          ref_domains: number | null
          ref_domains_dofollow: number | null
          ref_domains_educational: number | null
          ref_domains_governmental: number | null
          ref_ips: number | null
          ref_subnets: number | null
          reputation_score: number | null
          review_count: number | null
          score_batch: number | null
          sector: string
          seo_score: number | null
          serp_rank: number | null
          source: Database["public"]["Enums"]["business_source"] | null
          status: Database["public"]["Enums"]["business_status"] | null
          top10_keywords: number | null
          total_backlinks: number | null
          total_comments: number | null
          total_keywords: number | null
          total_traffic: number | null
          trafic_organique_estime: number | null
          updated_at: string
          website: string | null
        }
        Insert: {
          action_recommandee?: string | null
          address?: string | null
          ahrefs_rank?: number | null
          ai_summary?: string | null
          assigned_reason?: string | null
          assigned_to?: string | null
          backlinks?: number | null
          backlinks_educational?: number | null
          backlinks_form?: number | null
          backlinks_frame?: number | null
          backlinks_governmental?: number | null
          backlinks_image?: number | null
          backlinks_nofollow?: number | null
          backlinks_redirect?: number | null
          backlinks_text?: number | null
          city: string
          contact_person_email?: string | null
          contact_person_name?: string | null
          contact_person_phone?: string | null
          contenu_score?: number | null
          conversion_probability?: number | null
          country?: string | null
          cpc_moyen?: number | null
          created_at?: string
          crm_status?: Database["public"]["Enums"]["crm_status"] | null
          domain_rating?: number | null
          estimated_deal_value?: number | null
          gmb_url?: string | null
          google_place_id?: string | null
          google_rating?: number | null
          has_photos?: boolean | null
          id?: string
          ila_score?: number | null
          indexed_keywords?: number | null
          is_chain?: boolean | null
          is_sponsored?: boolean | null
          kd_moyen?: number | null
          last_analyzed_at?: string | null
          last_contact_date?: string | null
          lat?: number | null
          lead_source?: string | null
          linked_domains?: number | null
          lng?: number | null
          location?: unknown | null
          meilleure_page_concurrente?: string | null
          name: string
          next_follow_up?: string | null
          organic_traffic?: number | null
          pages_indexees?: number | null
          phone?: string | null
          position_score?: number | null
          postal_code?: string | null
          potential?: Database["public"]["Enums"]["business_potential"] | null
          presence_blog?: boolean | null
          presence_physique_score?: number | null
          priority_level?: number | null
          province?: string | null
          puntaje_dr?: number | null
          puntaje_keywords?: number | null
          puntaje_rd?: number | null
          puntaje_trafico?: number | null
          qualite_blog?: number | null
          recommended_action?: string | null
          ref_domains?: number | null
          ref_domains_dofollow?: number | null
          ref_domains_educational?: number | null
          ref_domains_governmental?: number | null
          ref_ips?: number | null
          ref_subnets?: number | null
          reputation_score?: number | null
          review_count?: number | null
          score_batch?: number | null
          sector: string
          seo_score?: number | null
          serp_rank?: number | null
          source?: Database["public"]["Enums"]["business_source"] | null
          status?: Database["public"]["Enums"]["business_status"] | null
          top10_keywords?: number | null
          total_backlinks?: number | null
          total_comments?: number | null
          total_keywords?: number | null
          total_traffic?: number | null
          trafic_organique_estime?: number | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          action_recommandee?: string | null
          address?: string | null
          ahrefs_rank?: number | null
          ai_summary?: string | null
          assigned_reason?: string | null
          assigned_to?: string | null
          backlinks?: number | null
          backlinks_educational?: number | null
          backlinks_form?: number | null
          backlinks_frame?: number | null
          backlinks_governmental?: number | null
          backlinks_image?: number | null
          backlinks_nofollow?: number | null
          backlinks_redirect?: number | null
          backlinks_text?: number | null
          city?: string
          contact_person_email?: string | null
          contact_person_name?: string | null
          contact_person_phone?: string | null
          contenu_score?: number | null
          conversion_probability?: number | null
          country?: string | null
          cpc_moyen?: number | null
          created_at?: string
          crm_status?: Database["public"]["Enums"]["crm_status"] | null
          domain_rating?: number | null
          estimated_deal_value?: number | null
          gmb_url?: string | null
          google_place_id?: string | null
          google_rating?: number | null
          has_photos?: boolean | null
          id?: string
          ila_score?: number | null
          indexed_keywords?: number | null
          is_chain?: boolean | null
          is_sponsored?: boolean | null
          kd_moyen?: number | null
          last_analyzed_at?: string | null
          last_contact_date?: string | null
          lat?: number | null
          lead_source?: string | null
          linked_domains?: number | null
          lng?: number | null
          location?: unknown | null
          meilleure_page_concurrente?: string | null
          name?: string
          next_follow_up?: string | null
          organic_traffic?: number | null
          pages_indexees?: number | null
          phone?: string | null
          position_score?: number | null
          postal_code?: string | null
          potential?: Database["public"]["Enums"]["business_potential"] | null
          presence_blog?: boolean | null
          presence_physique_score?: number | null
          priority_level?: number | null
          province?: string | null
          puntaje_dr?: number | null
          puntaje_keywords?: number | null
          puntaje_rd?: number | null
          puntaje_trafico?: number | null
          qualite_blog?: number | null
          recommended_action?: string | null
          ref_domains?: number | null
          ref_domains_dofollow?: number | null
          ref_domains_educational?: number | null
          ref_domains_governmental?: number | null
          ref_ips?: number | null
          ref_subnets?: number | null
          reputation_score?: number | null
          review_count?: number | null
          score_batch?: number | null
          sector?: string
          seo_score?: number | null
          serp_rank?: number | null
          source?: Database["public"]["Enums"]["business_source"] | null
          status?: Database["public"]["Enums"]["business_status"] | null
          top10_keywords?: number | null
          total_backlinks?: number | null
          total_comments?: number | null
          total_keywords?: number | null
          total_traffic?: number | null
          trafic_organique_estime?: number | null
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      collective_intelligence_metrics: {
        Row: {
          calculated_at: string | null
          context_data: Json | null
          id: string
          metric_type: string
          metric_value: number
          period_end: string | null
          period_start: string | null
        }
        Insert: {
          calculated_at?: string | null
          context_data?: Json | null
          id?: string
          metric_type: string
          metric_value: number
          period_end?: string | null
          period_start?: string | null
        }
        Update: {
          calculated_at?: string | null
          context_data?: Json | null
          id?: string
          metric_type?: string
          metric_value?: number
          period_end?: string | null
          period_start?: string | null
        }
        Relationships: []
      }
      crm_actions: {
        Row: {
          action_data: Json | null
          action_type: string
          business_id: string | null
          completed_date: string | null
          created_at: string | null
          description: string | null
          id: string
          next_action_suggested: string | null
          outcome: string | null
          scheduled_date: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          action_data?: Json | null
          action_type: string
          business_id?: string | null
          completed_date?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          next_action_suggested?: string | null
          outcome?: string | null
          scheduled_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          action_data?: Json | null
          action_type?: string
          business_id?: string | null
          completed_date?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          next_action_suggested?: string | null
          outcome?: string | null
          scheduled_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_actions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "crm_actions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "high_potential_businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      cross_recommendations: {
        Row: {
          confidence_score: number | null
          created_at: string
          expires_at: string | null
          id: string
          priority: number | null
          recommendation_data: Json
          recommendation_type: string
          source_context: string | null
          status: string | null
          target_context: string | null
          user_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          expires_at?: string | null
          id?: string
          priority?: number | null
          recommendation_data: Json
          recommendation_type: string
          source_context?: string | null
          status?: string | null
          target_context?: string | null
          user_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          expires_at?: string | null
          id?: string
          priority?: number | null
          recommendation_data?: Json
          recommendation_type?: string
          source_context?: string | null
          status?: string | null
          target_context?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      emails: {
        Row: {
          ai_priority_score: number | null
          ai_project_detected: boolean | null
          ai_sentiment: string | null
          ai_summary: string | null
          attachments_count: number | null
          body_html: string | null
          body_text: string | null
          business_id: string | null
          created_at: string
          from_email: string
          from_name: string | null
          gmail_id: string
          id: string
          labels: string[] | null
          processed_at: string | null
          received_at: string
          subject: string | null
          thread_id: string | null
          to_email: string
          updated_at: string
        }
        Insert: {
          ai_priority_score?: number | null
          ai_project_detected?: boolean | null
          ai_sentiment?: string | null
          ai_summary?: string | null
          attachments_count?: number | null
          body_html?: string | null
          body_text?: string | null
          business_id?: string | null
          created_at?: string
          from_email: string
          from_name?: string | null
          gmail_id: string
          id?: string
          labels?: string[] | null
          processed_at?: string | null
          received_at: string
          subject?: string | null
          thread_id?: string | null
          to_email: string
          updated_at?: string
        }
        Update: {
          ai_priority_score?: number | null
          ai_project_detected?: boolean | null
          ai_sentiment?: string | null
          ai_summary?: string | null
          attachments_count?: number | null
          body_html?: string | null
          body_text?: string | null
          business_id?: string | null
          created_at?: string
          from_email?: string
          from_name?: string | null
          gmail_id?: string
          id?: string
          labels?: string[] | null
          processed_at?: string | null
          received_at?: string
          subject?: string | null
          thread_id?: string | null
          to_email?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "emails_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emails_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "high_potential_businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      enrichissement_history: {
        Row: {
          ai_confidence_score: number | null
          business_id: string | null
          created_at: string
          data_after: Json | null
          data_before: Json | null
          email_id: string | null
          enrichment_type: string
          id: string
          processed_by: string | null
        }
        Insert: {
          ai_confidence_score?: number | null
          business_id?: string | null
          created_at?: string
          data_after?: Json | null
          data_before?: Json | null
          email_id?: string | null
          enrichment_type: string
          id?: string
          processed_by?: string | null
        }
        Update: {
          ai_confidence_score?: number | null
          business_id?: string | null
          created_at?: string
          data_after?: Json | null
          data_before?: Json | null
          email_id?: string | null
          enrichment_type?: string
          id?: string
          processed_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrichissement_history_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrichissement_history_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "high_potential_businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrichissement_history_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "emails"
            referencedColumns: ["id"]
          },
        ]
      }
      ila_scores: {
        Row: {
          ai_analysis: string | null
          business_id: string | null
          calculated_by: string | null
          calculation_method: string | null
          contenu_score: number
          created_at: string
          data_sources: Json | null
          id: string
          position_score: number
          presence_physique_score: number
          recommended_action: string | null
          reputation_score: number
          seo_score: number
          total_score: number
        }
        Insert: {
          ai_analysis?: string | null
          business_id?: string | null
          calculated_by?: string | null
          calculation_method?: string | null
          contenu_score?: number
          created_at?: string
          data_sources?: Json | null
          id?: string
          position_score?: number
          presence_physique_score?: number
          recommended_action?: string | null
          reputation_score?: number
          seo_score?: number
          total_score?: number
        }
        Update: {
          ai_analysis?: string | null
          business_id?: string | null
          calculated_by?: string | null
          calculation_method?: string | null
          contenu_score?: number
          created_at?: string
          data_sources?: Json | null
          id?: string
          position_score?: number
          presence_physique_score?: number
          recommended_action?: string | null
          reputation_score?: number
          seo_score?: number
          total_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "ila_scores_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ila_scores_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "high_potential_businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ila_scores_calculated_by_fkey"
            columns: ["calculated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      interactions_client: {
        Row: {
          ai_analysis: string | null
          business_id: string | null
          content: string | null
          conversion_probability: number | null
          created_at: string
          email_id: string | null
          engagement_score: number | null
          id: string
          next_action_suggested: string | null
          sentiment_score: number | null
          type: string
          updated_at: string
        }
        Insert: {
          ai_analysis?: string | null
          business_id?: string | null
          content?: string | null
          conversion_probability?: number | null
          created_at?: string
          email_id?: string | null
          engagement_score?: number | null
          id?: string
          next_action_suggested?: string | null
          sentiment_score?: number | null
          type: string
          updated_at?: string
        }
        Update: {
          ai_analysis?: string | null
          business_id?: string | null
          content?: string | null
          conversion_probability?: number | null
          created_at?: string
          email_id?: string | null
          engagement_score?: number | null
          id?: string
          next_action_suggested?: string | null
          sentiment_score?: number | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interactions_client_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_client_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "high_potential_businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_client_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "emails"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_nodes: {
        Row: {
          content: Json
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          node_type: string
          relevance_score: number | null
          tags: string[] | null
          title: string
          updated_at: string
          usage_count: number | null
        }
        Insert: {
          content?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          node_type: string
          relevance_score?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
          usage_count?: number | null
        }
        Update: {
          content?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          node_type?: string
          relevance_score?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          usage_count?: number | null
        }
        Relationships: []
      }
      liaisons_crm: {
        Row: {
          actif: boolean | null
          cible_id: string
          created_at: string
          id: string
          metadata: Json | null
          source_id: string
          type: Database["public"]["Enums"]["liaison_type"]
          updated_at: string
        }
        Insert: {
          actif?: boolean | null
          cible_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          source_id: string
          type: Database["public"]["Enums"]["liaison_type"]
          updated_at?: string
        }
        Update: {
          actif?: boolean | null
          cible_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          source_id?: string
          type?: Database["public"]["Enums"]["liaison_type"]
          updated_at?: string
        }
        Relationships: []
      }
      lilo_interactions: {
        Row: {
          action_taken: string | null
          created_at: string
          emotion_detected: string | null
          id: string
          interaction_data: Json | null
          lilo_response: string | null
          page_context: string
          satisfaction_score: number | null
          session_id: string | null
          user_id: string | null
          user_message: string | null
        }
        Insert: {
          action_taken?: string | null
          created_at?: string
          emotion_detected?: string | null
          id?: string
          interaction_data?: Json | null
          lilo_response?: string | null
          page_context: string
          satisfaction_score?: number | null
          session_id?: string | null
          user_id?: string | null
          user_message?: string | null
        }
        Update: {
          action_taken?: string | null
          created_at?: string
          emotion_detected?: string | null
          id?: string
          interaction_data?: Json | null
          lilo_response?: string | null
          page_context?: string
          satisfaction_score?: number | null
          session_id?: string | null
          user_id?: string | null
          user_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lilo_interactions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      map_interactions: {
        Row: {
          action_type: string
          created_at: string
          id: string
          interaction_data: Json | null
          location_data: Json | null
          page_context: string
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          id?: string
          interaction_data?: Json | null
          location_data?: Json | null
          page_context: string
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          id?: string
          interaction_data?: Json | null
          location_data?: Json | null
          page_context?: string
          user_id?: string | null
        }
        Relationships: []
      }
      module_analytics: {
        Row: {
          action_type: string
          conversion_score: number | null
          created_at: string
          id: string
          interaction_data: Json | null
          module_name: string
          session_id: string | null
          time_spent: number | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          conversion_score?: number | null
          created_at?: string
          id?: string
          interaction_data?: Json | null
          module_name: string
          session_id?: string | null
          time_spent?: number | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          conversion_score?: number | null
          created_at?: string
          id?: string
          interaction_data?: Json | null
          module_name?: string
          session_id?: string | null
          time_spent?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "module_analytics_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      predictive_insights: {
        Row: {
          confidence_score: number | null
          created_at: string
          id: string
          insight_data: Json
          insight_type: string
          shown_to_user: boolean | null
          user_action: string | null
          user_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          insight_data: Json
          insight_type: string
          shown_to_user?: boolean | null
          user_action?: string | null
          user_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          insight_data?: Json
          insight_type?: string
          shown_to_user?: boolean | null
          user_action?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          first_name: string | null
          id: string
          last_name: string | null
          onboarding_completed: boolean | null
          preferences: Json | null
          role: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          onboarding_completed?: boolean | null
          preferences?: Json | null
          role?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          onboarding_completed?: boolean | null
          preferences?: Json | null
          role?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          assigned_to: string[] | null
          budget: number | null
          client_id: string | null
          completed_date: string | null
          created_at: string
          description: string | null
          due_date: string | null
          estimated_revenue: number | null
          id: string
          name: string
          notes: string | null
          priority: Database["public"]["Enums"]["project_priority"] | null
          progress: number | null
          revenue: number | null
          services: string[] | null
          solutions: string[] | null
          start_date: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string[] | null
          budget?: number | null
          client_id?: string | null
          completed_date?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimated_revenue?: number | null
          id?: string
          name: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["project_priority"] | null
          progress?: number | null
          revenue?: number | null
          services?: string[] | null
          solutions?: string[] | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string[] | null
          budget?: number | null
          client_id?: string | null
          completed_date?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimated_revenue?: number | null
          id?: string
          name?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["project_priority"] | null
          progress?: number | null
          revenue?: number | null
          services?: string[] | null
          solutions?: string[] | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "high_potential_businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      promotion_analytics: {
        Row: {
          behavioral_score: number | null
          conversion_probability: number | null
          created_at: string | null
          id: string
          interaction_data: Json | null
          interaction_type: string
          page_context: string | null
          promotion_type: string
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          behavioral_score?: number | null
          conversion_probability?: number | null
          created_at?: string | null
          id?: string
          interaction_data?: Json | null
          interaction_type: string
          page_context?: string | null
          promotion_type: string
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          behavioral_score?: number | null
          conversion_probability?: number | null
          created_at?: string | null
          id?: string
          interaction_data?: Json | null
          interaction_type?: string
          page_context?: string | null
          promotion_type?: string
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      promotions: {
        Row: {
          actif: boolean | null
          code_promo: string | null
          conditions: string | null
          created_at: string
          date_debut: string
          date_fin: string
          description: string | null
          id: string
          max_utilisations: number | null
          nom: string
          services_offerts: string[] | null
          services_requis: number | null
          solutions_offertes: string[] | null
          updated_at: string
          utilisations_actuelles: number | null
        }
        Insert: {
          actif?: boolean | null
          code_promo?: string | null
          conditions?: string | null
          created_at?: string
          date_debut: string
          date_fin: string
          description?: string | null
          id?: string
          max_utilisations?: number | null
          nom: string
          services_offerts?: string[] | null
          services_requis?: number | null
          solutions_offertes?: string[] | null
          updated_at?: string
          utilisations_actuelles?: number | null
        }
        Update: {
          actif?: boolean | null
          code_promo?: string | null
          conditions?: string | null
          created_at?: string
          date_debut?: string
          date_fin?: string
          description?: string | null
          id?: string
          max_utilisations?: number | null
          nom?: string
          services_offerts?: string[] | null
          services_requis?: number | null
          solutions_offertes?: string[] | null
          updated_at?: string
          utilisations_actuelles?: number | null
        }
        Relationships: []
      }
      prospects_enrichis: {
        Row: {
          confidence_score: number | null
          created_at: string
          entreprise: string
          id: string
          processed_by: string | null
          search_query: string | null
          site_web: string | null
          snippet: string | null
          titre: string | null
          updated_at: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          entreprise: string
          id?: string
          processed_by?: string | null
          search_query?: string | null
          site_web?: string | null
          snippet?: string | null
          titre?: string | null
          updated_at?: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          entreprise?: string
          id?: string
          processed_by?: string | null
          search_query?: string | null
          site_web?: string | null
          snippet?: string | null
          titre?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      roi_predictions: {
        Row: {
          business_id: string | null
          calculated_at: string | null
          calculated_by: string | null
          confidence_score: number | null
          factors: Json | null
          id: string
          predicted_revenue: number | null
          predicted_timeline_months: number | null
        }
        Insert: {
          business_id?: string | null
          calculated_at?: string | null
          calculated_by?: string | null
          confidence_score?: number | null
          factors?: Json | null
          id?: string
          predicted_revenue?: number | null
          predicted_timeline_months?: number | null
        }
        Update: {
          business_id?: string | null
          calculated_at?: string | null
          calculated_by?: string | null
          confidence_score?: number | null
          factors?: Json | null
          id?: string
          predicted_revenue?: number | null
          predicted_timeline_months?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "roi_predictions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roi_predictions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "high_potential_businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          actif: boolean | null
          categorie: Database["public"]["Enums"]["service_category"]
          code: string
          couleur: string
          created_at: string
          description: string | null
          duree_moy: string | null
          icon_url: string | null
          id: string
          nom: string
          prix_base: number | null
          updated_at: string
        }
        Insert: {
          actif?: boolean | null
          categorie: Database["public"]["Enums"]["service_category"]
          code: string
          couleur: string
          created_at?: string
          description?: string | null
          duree_moy?: string | null
          icon_url?: string | null
          id?: string
          nom: string
          prix_base?: number | null
          updated_at?: string
        }
        Update: {
          actif?: boolean | null
          categorie?: Database["public"]["Enums"]["service_category"]
          code?: string
          couleur?: string
          created_at?: string
          description?: string | null
          duree_moy?: string | null
          icon_url?: string | null
          id?: string
          nom?: string
          prix_base?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      solutions: {
        Row: {
          actif: boolean | null
          code: string
          couleur: string
          created_at: string
          description: string | null
          icon_url: string | null
          id: string
          is_premium: boolean | null
          nom: string
          updated_at: string
          url_module: string | null
        }
        Insert: {
          actif?: boolean | null
          code: string
          couleur: string
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          is_premium?: boolean | null
          nom: string
          updated_at?: string
          url_module?: string | null
        }
        Update: {
          actif?: boolean | null
          code?: string
          couleur?: string
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          is_premium?: boolean | null
          nom?: string
          updated_at?: string
          url_module?: string | null
        }
        Relationships: []
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      team_sync: {
        Row: {
          created_at: string
          current_activity: string | null
          current_module: string | null
          id: string
          last_activity: string | null
          sync_data: Json | null
          sync_status: string | null
          team_member_id: string | null
        }
        Insert: {
          created_at?: string
          current_activity?: string | null
          current_module?: string | null
          id?: string
          last_activity?: string | null
          sync_data?: Json | null
          sync_status?: string | null
          team_member_id?: string | null
        }
        Update: {
          created_at?: string
          current_activity?: string | null
          current_module?: string | null
          id?: string
          last_activity?: string | null
          sync_data?: Json | null
          sync_status?: string | null
          team_member_id?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          analytics_consent: boolean | null
          created_at: string
          id: string
          language_preference: string | null
          onboarding_completed: boolean | null
          preferred_modules: string[] | null
          ui_preferences: Json | null
          updated_at: string
          user_id: string | null
          user_level: string | null
        }
        Insert: {
          analytics_consent?: boolean | null
          created_at?: string
          id?: string
          language_preference?: string | null
          onboarding_completed?: boolean | null
          preferred_modules?: string[] | null
          ui_preferences?: Json | null
          updated_at?: string
          user_id?: string | null
          user_level?: string | null
        }
        Update: {
          analytics_consent?: boolean | null
          created_at?: string
          id?: string
          language_preference?: string | null
          onboarding_completed?: boolean | null
          preferred_modules?: string[] | null
          ui_preferences?: Json | null
          updated_at?: string
          user_id?: string | null
          user_level?: string | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          conversion_score: number | null
          created_at: string
          device_info: Json | null
          ended_at: string | null
          id: string
          location_data: Json | null
          promotion_data: Json | null
          promotion_viewed: boolean | null
          session_token: string
          started_at: string
          user_id: string | null
        }
        Insert: {
          conversion_score?: number | null
          created_at?: string
          device_info?: Json | null
          ended_at?: string | null
          id?: string
          location_data?: Json | null
          promotion_data?: Json | null
          promotion_viewed?: boolean | null
          session_token: string
          started_at?: string
          user_id?: string | null
        }
        Update: {
          conversion_score?: number | null
          created_at?: string
          device_info?: Json | null
          ended_at?: string | null
          id?: string
          location_data?: Json | null
          promotion_data?: Json | null
          promotion_viewed?: boolean | null
          session_token?: string
          started_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          actif: boolean
          avatar_url: string | null
          couleur: string
          created_at: string
          email_pro: string
          id: string
          nom: string | null
          prenom: string
          role: Database["public"]["Enums"]["user_role"]
          telephone: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          actif?: boolean
          avatar_url?: string | null
          couleur: string
          created_at?: string
          email_pro: string
          id?: string
          nom?: string | null
          prenom: string
          role?: Database["public"]["Enums"]["user_role"]
          telephone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          actif?: boolean
          avatar_url?: string | null
          couleur?: string
          created_at?: string
          email_pro?: string
          id?: string
          nom?: string | null
          prenom?: string
          role?: Database["public"]["Enums"]["user_role"]
          telephone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown | null
          f_table_catalog: unknown | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown | null
          f_table_catalog: string | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      high_potential_businesses: {
        Row: {
          action_recommandee: string | null
          address: string | null
          ahrefs_rank: number | null
          ai_summary: string | null
          assigned_to: string | null
          backlinks: number | null
          backlinks_educational: number | null
          backlinks_form: number | null
          backlinks_frame: number | null
          backlinks_governmental: number | null
          backlinks_image: number | null
          backlinks_nofollow: number | null
          backlinks_redirect: number | null
          backlinks_text: number | null
          city: string | null
          contenu_score: number | null
          country: string | null
          cpc_moyen: number | null
          created_at: string | null
          domain_authority_level: string | null
          domain_rating: number | null
          gmb_url: string | null
          google_place_id: string | null
          google_rating: number | null
          has_photos: boolean | null
          id: string | null
          ila_score: number | null
          indexed_keywords: number | null
          is_chain: boolean | null
          is_sponsored: boolean | null
          kd_moyen: number | null
          last_analyzed_at: string | null
          lat: number | null
          linked_domains: number | null
          lng: number | null
          location: unknown | null
          meilleure_page_concurrente: string | null
          name: string | null
          organic_traffic: number | null
          pages_indexees: number | null
          phone: string | null
          position_score: number | null
          postal_code: string | null
          potential: Database["public"]["Enums"]["business_potential"] | null
          potential_level: string | null
          presence_blog: boolean | null
          presence_physique_score: number | null
          province: string | null
          puntaje_dr: number | null
          puntaje_keywords: number | null
          puntaje_rd: number | null
          puntaje_trafico: number | null
          qualite_blog: number | null
          recommended_action: string | null
          ref_domains: number | null
          ref_domains_dofollow: number | null
          ref_domains_educational: number | null
          ref_domains_governmental: number | null
          ref_ips: number | null
          ref_subnets: number | null
          reputation_score: number | null
          review_count: number | null
          score_batch: number | null
          sector: string | null
          seo_score: number | null
          serp_rank: number | null
          source: Database["public"]["Enums"]["business_source"] | null
          status: Database["public"]["Enums"]["business_status"] | null
          top10_keywords: number | null
          total_backlinks: number | null
          total_comments: number | null
          total_keywords: number | null
          total_traffic: number | null
          trafic_organique_estime: number | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          action_recommandee?: string | null
          address?: string | null
          ahrefs_rank?: number | null
          ai_summary?: string | null
          assigned_to?: string | null
          backlinks?: number | null
          backlinks_educational?: number | null
          backlinks_form?: number | null
          backlinks_frame?: number | null
          backlinks_governmental?: number | null
          backlinks_image?: number | null
          backlinks_nofollow?: number | null
          backlinks_redirect?: number | null
          backlinks_text?: number | null
          city?: string | null
          contenu_score?: number | null
          country?: string | null
          cpc_moyen?: number | null
          created_at?: string | null
          domain_authority_level?: never
          domain_rating?: number | null
          gmb_url?: string | null
          google_place_id?: string | null
          google_rating?: number | null
          has_photos?: boolean | null
          id?: string | null
          ila_score?: number | null
          indexed_keywords?: number | null
          is_chain?: boolean | null
          is_sponsored?: boolean | null
          kd_moyen?: number | null
          last_analyzed_at?: string | null
          lat?: number | null
          linked_domains?: number | null
          lng?: number | null
          location?: unknown | null
          meilleure_page_concurrente?: string | null
          name?: string | null
          organic_traffic?: number | null
          pages_indexees?: number | null
          phone?: string | null
          position_score?: number | null
          postal_code?: string | null
          potential?: Database["public"]["Enums"]["business_potential"] | null
          potential_level?: never
          presence_blog?: boolean | null
          presence_physique_score?: number | null
          province?: string | null
          puntaje_dr?: number | null
          puntaje_keywords?: number | null
          puntaje_rd?: number | null
          puntaje_trafico?: number | null
          qualite_blog?: number | null
          recommended_action?: string | null
          ref_domains?: number | null
          ref_domains_dofollow?: number | null
          ref_domains_educational?: number | null
          ref_domains_governmental?: number | null
          ref_ips?: number | null
          ref_subnets?: number | null
          reputation_score?: number | null
          review_count?: number | null
          score_batch?: number | null
          sector?: string | null
          seo_score?: number | null
          serp_rank?: number | null
          source?: Database["public"]["Enums"]["business_source"] | null
          status?: Database["public"]["Enums"]["business_status"] | null
          top10_keywords?: number | null
          total_backlinks?: number | null
          total_comments?: number | null
          total_keywords?: number | null
          total_traffic?: number | null
          trafic_organique_estime?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          action_recommandee?: string | null
          address?: string | null
          ahrefs_rank?: number | null
          ai_summary?: string | null
          assigned_to?: string | null
          backlinks?: number | null
          backlinks_educational?: number | null
          backlinks_form?: number | null
          backlinks_frame?: number | null
          backlinks_governmental?: number | null
          backlinks_image?: number | null
          backlinks_nofollow?: number | null
          backlinks_redirect?: number | null
          backlinks_text?: number | null
          city?: string | null
          contenu_score?: number | null
          country?: string | null
          cpc_moyen?: number | null
          created_at?: string | null
          domain_authority_level?: never
          domain_rating?: number | null
          gmb_url?: string | null
          google_place_id?: string | null
          google_rating?: number | null
          has_photos?: boolean | null
          id?: string | null
          ila_score?: number | null
          indexed_keywords?: number | null
          is_chain?: boolean | null
          is_sponsored?: boolean | null
          kd_moyen?: number | null
          last_analyzed_at?: string | null
          lat?: number | null
          linked_domains?: number | null
          lng?: number | null
          location?: unknown | null
          meilleure_page_concurrente?: string | null
          name?: string | null
          organic_traffic?: number | null
          pages_indexees?: number | null
          phone?: string | null
          position_score?: number | null
          postal_code?: string | null
          potential?: Database["public"]["Enums"]["business_potential"] | null
          potential_level?: never
          presence_blog?: boolean | null
          presence_physique_score?: number | null
          province?: string | null
          puntaje_dr?: number | null
          puntaje_keywords?: number | null
          puntaje_rd?: number | null
          puntaje_trafico?: number | null
          qualite_blog?: number | null
          recommended_action?: string | null
          ref_domains?: number | null
          ref_domains_dofollow?: number | null
          ref_domains_educational?: number | null
          ref_domains_governmental?: number | null
          ref_ips?: number | null
          ref_subnets?: number | null
          reputation_score?: number | null
          review_count?: number | null
          score_batch?: number | null
          sector?: string | null
          seo_score?: number | null
          serp_rank?: number | null
          source?: Database["public"]["Enums"]["business_source"] | null
          status?: Database["public"]["Enums"]["business_status"] | null
          top10_keywords?: number | null
          total_backlinks?: number | null
          total_comments?: number | null
          total_keywords?: number | null
          total_traffic?: number | null
          trafic_organique_estime?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { oldname: string; newname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { tbl: unknown; col: string }
        Returns: unknown
      }
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_selectivity: {
        Args: { tbl: unknown; att_name: string; geom: unknown; mode?: string }
        Returns: number
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_bestsrid: {
        Args: { "": unknown }
        Returns: number
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_pointoutside: {
        Args: { "": unknown }
        Returns: unknown
      }
      _st_sortablehash: {
        Args: { geom: unknown }
        Returns: number
      }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          g1: unknown
          clip?: unknown
          tolerance?: number
          return_polygons?: boolean
        }
        Returns: unknown
      }
      _st_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      activate_google_maps_api: {
        Args: Record<PropertyKey, never>
        Returns: {
          success: boolean
          message: string
          details: Json
        }[]
      }
      addauth: {
        Args: { "": string }
        Returns: boolean
      }
      addgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
              new_srid_in: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
          | {
              schema_name: string
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
          | {
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
        Returns: string
      }
      box: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box3d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3dtobox: {
        Args: { "": unknown }
        Returns: unknown
      }
      bytea: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      calculate_ila_total_score: {
        Args: {
          seo_score: number
          contenu_score: number
          presence_physique_score: number
          reputation_score: number
          position_score: number
        }
        Returns: number
      }
      calculate_ila_total_score_enhanced: {
        Args: {
          seo_score: number
          contenu_score: number
          presence_physique_score: number
          reputation_score: number
          position_score: number
          domain_rating?: number
          total_traffic?: number
          total_keywords?: number
          ref_domains?: number
        }
        Returns: number
      }
      calculate_predictive_roi: {
        Args: { business_id: string }
        Returns: {
          predicted_revenue: number
          timeline_months: number
          confidence_score: number
        }[]
      }
      cleanup_expired_recommendations: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      disablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      dropgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
            }
          | { schema_name: string; table_name: string; column_name: string }
          | { table_name: string; column_name: string }
        Returns: string
      }
      dropgeometrytable: {
        Args:
          | { catalog_name: string; schema_name: string; table_name: string }
          | { schema_name: string; table_name: string }
          | { table_name: string }
        Returns: string
      }
      enablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geography: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      geography_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geography_gist_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_gist_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_send: {
        Args: { "": unknown }
        Returns: string
      }
      geography_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geography_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry: {
        Args:
          | { "": string }
          | { "": string }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
        Returns: unknown
      }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_sortsupport_2d: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_hash: {
        Args: { "": unknown }
        Returns: number
      }
      geometry_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_recv: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_send: {
        Args: { "": unknown }
        Returns: string
      }
      geometry_sortsupport: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_spgist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_3d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geometry_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometrytype: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      get_business_statistics: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_proj4_from_srid: {
        Args: { "": number }
        Returns: string
      }
      gettransactionid: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      gidx_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gidx_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      json: {
        Args: { "": unknown }
        Returns: Json
      }
      jsonb: {
        Args: { "": unknown }
        Returns: Json
      }
      longtransactionsenabled: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      path: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_asflatgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_geometry_clusterintersecting_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_clusterwithin_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_collect_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_makeline_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_polygonize_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      point: {
        Args: { "": unknown }
        Returns: unknown
      }
      polygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      populate_geometry_columns: {
        Args:
          | { tbl_oid: unknown; use_typmod?: boolean }
          | { use_typmod?: boolean }
        Returns: number
      }
      postgis_addbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_constraint_dims: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: string
      }
      postgis_dropbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_extensions_upgrade: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_full_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_geos_noop: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_geos_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_getbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_hasbbox: {
        Args: { "": unknown }
        Returns: boolean
      }
      postgis_index_supportfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_revision: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libjson_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_liblwgeom_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libprotobuf_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libxml_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_noop: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_proj_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_released: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_svn_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_type_name: {
        Args: {
          geomname: string
          coord_dimension: number
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_typmod_dims: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_srid: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_type: {
        Args: { "": number }
        Returns: string
      }
      postgis_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_wagyu_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      spheroid_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      spheroid_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlength: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dperimeter: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle: {
        Args:
          | { line1: unknown; line2: unknown }
          | { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
        Returns: number
      }
      st_area: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_area2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_asbinary: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_asewkt: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asgeojson: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; options?: number }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
          | {
              r: Record<string, unknown>
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
            }
        Returns: string
      }
      st_asgml: {
        Args:
          | { "": string }
          | {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
          | {
              version: number
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
          | {
              version: number
              geom: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
        Returns: string
      }
      st_ashexewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_askml: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
          | { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
        Returns: string
      }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: {
        Args: { geom: unknown; format?: string }
        Returns: string
      }
      st_asmvtgeom: {
        Args: {
          geom: unknown
          bounds: unknown
          extent?: number
          buffer?: number
          clip_geom?: boolean
        }
        Returns: unknown
      }
      st_assvg: {
        Args:
          | { "": string }
          | { geog: unknown; rel?: number; maxdecimaldigits?: number }
          | { geom: unknown; rel?: number; maxdecimaldigits?: number }
        Returns: string
      }
      st_astext: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_astwkb: {
        Args:
          | {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
          | {
              geom: unknown
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
        Returns: string
      }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_boundary: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_boundingdiagonal: {
        Args: { geom: unknown; fits?: boolean }
        Returns: unknown
      }
      st_buffer: {
        Args:
          | { geom: unknown; radius: number; options?: string }
          | { geom: unknown; radius: number; quadsegs: number }
        Returns: unknown
      }
      st_buildarea: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_centroid: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      st_cleangeometry: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_clipbybox2d: {
        Args: { geom: unknown; box: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_clusterintersecting: {
        Args: { "": unknown[] }
        Returns: unknown[]
      }
      st_collect: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collectionextract: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_collectionhomogenize: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_concavehull: {
        Args: {
          param_geom: unknown
          param_pctconvex: number
          param_allow_holes?: boolean
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_convexhull: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_coorddim: {
        Args: { geometry: unknown }
        Returns: number
      }
      st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_curvetoline: {
        Args: { geom: unknown; tol?: number; toltype?: number; flags?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { g1: unknown; tolerance?: number; flags?: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_dimension: {
        Args: { "": unknown }
        Returns: number
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance: {
        Args:
          | { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_distancesphere: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; radius: number }
        Returns: number
      }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dump: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumppoints: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumprings: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpsegments: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_endpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_envelope: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_expand: {
        Args:
          | { box: unknown; dx: number; dy: number }
          | { box: unknown; dx: number; dy: number; dz?: number }
          | { geom: unknown; dx: number; dy: number; dz?: number; dm?: number }
        Returns: unknown
      }
      st_exteriorring: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_flipcoordinates: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force3d: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; zvalue?: number; mvalue?: number }
        Returns: unknown
      }
      st_forcecollection: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcecurve: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygonccw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygoncw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcerhr: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcesfs: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_generatepoints: {
        Args:
          | { area: unknown; npoints: number }
          | { area: unknown; npoints: number; seed: number }
        Returns: unknown
      }
      st_geogfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geogfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geographyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geohash: {
        Args:
          | { geog: unknown; maxchars?: number }
          | { geom: unknown; maxchars?: number }
        Returns: string
      }
      st_geomcollfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomcollfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometricmedian: {
        Args: {
          g: unknown
          tolerance?: number
          max_iter?: number
          fail_if_not_converged?: boolean
        }
        Returns: unknown
      }
      st_geometryfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometrytype: {
        Args: { "": unknown }
        Returns: string
      }
      st_geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromgeojson: {
        Args: { "": Json } | { "": Json } | { "": string }
        Returns: unknown
      }
      st_geomfromgml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromkml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfrommarc21: {
        Args: { marc21xml: string }
        Returns: unknown
      }
      st_geomfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromtwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_gmltosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_hasarc: {
        Args: { geometry: unknown }
        Returns: boolean
      }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { size: number; cell_i: number; cell_j: number; origin?: unknown }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_intersects: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_isclosed: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_iscollection: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isempty: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_ispolygonccw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_ispolygoncw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isring: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_issimple: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvalid: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvaliddetail: {
        Args: { geom: unknown; flags?: number }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
      }
      st_isvalidreason: {
        Args: { "": unknown }
        Returns: string
      }
      st_isvalidtrajectory: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_length: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_length2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_letters: {
        Args: { letters: string; font?: Json }
        Returns: unknown
      }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { txtin: string; nprecision?: number }
        Returns: unknown
      }
      st_linefrommultipoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_linefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linemerge: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linestringfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linetocurve: {
        Args: { geometry: unknown }
        Returns: unknown
      }
      st_locatealong: {
        Args: { geometry: unknown; measure: number; leftrightoffset?: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          geometry: unknown
          frommeasure: number
          tomeasure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { geometry: unknown; fromelevation: number; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_m: {
        Args: { "": unknown }
        Returns: number
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makepolygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { "": unknown } | { geom: unknown; params: string }
        Returns: unknown
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_maximuminscribedcircle: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_memsize: {
        Args: { "": unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_minimumboundingradius: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_minimumclearance: {
        Args: { "": unknown }
        Returns: number
      }
      st_minimumclearanceline: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_mlinefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mlinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multi: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_multilinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multilinestringfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_ndims: {
        Args: { "": unknown }
        Returns: number
      }
      st_node: {
        Args: { g: unknown }
        Returns: unknown
      }
      st_normalize: {
        Args: { geom: unknown }
        Returns: unknown
      }
      st_npoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_nrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numgeometries: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorring: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpatches: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_offsetcurve: {
        Args: { line: unknown; distance: number; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_orientedenvelope: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { "": unknown } | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_perimeter2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_pointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointonsurface: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_points: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_polyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonize: {
        Args: { "": unknown[] }
        Returns: unknown
      }
      st_project: {
        Args: { geog: unknown; distance: number; azimuth: number }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_x: number
          prec_y?: number
          prec_z?: number
          prec_m?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: string
      }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_reverse: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid: {
        Args: { geog: unknown; srid: number } | { geom: unknown; srid: number }
        Returns: unknown
      }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shiftlongitude: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; vertex_fraction: number; is_outer?: boolean }
        Returns: unknown
      }
      st_split: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_square: {
        Args: { size: number; cell_i: number; cell_j: number; origin?: unknown }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_srid: {
        Args: { geog: unknown } | { geom: unknown }
        Returns: number
      }
      st_startpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_subdivide: {
        Args: { geom: unknown; maxvertices?: number; gridsize?: number }
        Returns: unknown[]
      }
      st_summary: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          zoom: number
          x: number
          y: number
          bounds?: unknown
          margin?: number
        }
        Returns: unknown
      }
      st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_transform: {
        Args:
          | { geom: unknown; from_proj: string; to_proj: string }
          | { geom: unknown; from_proj: string; to_srid: number }
          | { geom: unknown; to_proj: string }
        Returns: unknown
      }
      st_triangulatepolygon: {
        Args: { g1: unknown }
        Returns: unknown
      }
      st_union: {
        Args:
          | { "": unknown[] }
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; gridsize: number }
        Returns: unknown
      }
      st_voronoilines: {
        Args: { g1: unknown; tolerance?: number; extend_to?: unknown }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { g1: unknown; tolerance?: number; extend_to?: unknown }
        Returns: unknown
      }
      st_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_wkbtosql: {
        Args: { wkb: string }
        Returns: unknown
      }
      st_wkttosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_wrapx: {
        Args: { geom: unknown; wrap: number; move: number }
        Returns: unknown
      }
      st_x: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmin: {
        Args: { "": unknown }
        Returns: number
      }
      st_y: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymax: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymin: {
        Args: { "": unknown }
        Returns: number
      }
      st_z: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmflag: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmin: {
        Args: { "": unknown }
        Returns: number
      }
      test_api_connection: {
        Args: { p_service_name: string; p_test_type?: string }
        Returns: Json
      }
      text: {
        Args: { "": unknown }
        Returns: string
      }
      unlockrows: {
        Args: { "": string }
        Returns: number
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          schema_name: string
          table_name: string
          column_name: string
          new_srid_in: number
        }
        Returns: string
      }
      validate_and_activate_google_maps_api: {
        Args: Record<PropertyKey, never>
        Returns: {
          success: boolean
          message: string
          api_status: string
        }[]
      }
    }
    Enums: {
      business_potential: "low" | "medium" | "high" | "premium"
      business_source:
        | "GMB"
        | "manual"
        | "import"
        | "api"
        | "revalviews"
        | "google_places"
      business_status: "prospect" | "client" | "partenaire" | "inactif"
      crm_status:
        | "prospect"
        | "contacted"
        | "meeting_scheduled"
        | "meeting_completed"
        | "proposal_sent"
        | "negotiation"
        | "client"
        | "partner"
        | "lost"
        | "inactive"
      liaison_type:
        | "produit_service"
        | "service_solution"
        | "client_projet"
        | "promotion_service"
      project_priority: "low" | "medium" | "high" | "urgent"
      project_status:
        | "planning"
        | "active"
        | "review"
        | "completed"
        | "paused"
        | "cancelled"
      service_category:
        | "SEO"
        | "Ads"
        | "Design"
        | "Development"
        | "Analytics"
        | "Strategy"
      user_role:
        | "CEO"
        | "COO"
        | "Commercial"
        | "SEO"
        | "Designer"
        | "Developer"
        | "Assistant"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown | null
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      business_potential: ["low", "medium", "high", "premium"],
      business_source: [
        "GMB",
        "manual",
        "import",
        "api",
        "revalviews",
        "google_places",
      ],
      business_status: ["prospect", "client", "partenaire", "inactif"],
      crm_status: [
        "prospect",
        "contacted",
        "meeting_scheduled",
        "meeting_completed",
        "proposal_sent",
        "negotiation",
        "client",
        "partner",
        "lost",
        "inactive",
      ],
      liaison_type: [
        "produit_service",
        "service_solution",
        "client_projet",
        "promotion_service",
      ],
      project_priority: ["low", "medium", "high", "urgent"],
      project_status: [
        "planning",
        "active",
        "review",
        "completed",
        "paused",
        "cancelled",
      ],
      service_category: [
        "SEO",
        "Ads",
        "Design",
        "Development",
        "Analytics",
        "Strategy",
      ],
      user_role: [
        "CEO",
        "COO",
        "Commercial",
        "SEO",
        "Designer",
        "Developer",
        "Assistant",
      ],
    },
  },
} as const