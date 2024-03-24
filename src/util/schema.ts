export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          public: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          public?: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          public?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projectTech: {
        Row: {
          project_id: number
          tech_id: number
        }
        Insert: {
          project_id: number
          tech_id: number
        }
        Update: {
          project_id?: number
          tech_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_projectTech_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_projectTech_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "tech"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          actual: number
          created_at: string
          description: string | null
          estimation: number | null
          id: number
          name: string
          notes: string | null
          project_id: number | null
          public: boolean
          test_actual: number | null
          test_estimation: number | null
          user_id: string | null
        }
        Insert: {
          actual: number
          created_at?: string
          description?: string | null
          estimation?: number | null
          id?: number
          name: string
          notes?: string | null
          project_id?: number | null
          public?: boolean
          test_actual?: number | null
          test_estimation?: number | null
          user_id?: string | null
        }
        Update: {
          actual?: number
          created_at?: string
          description?: string | null
          estimation?: number | null
          id?: number
          name?: string
          notes?: string | null
          project_id?: number | null
          public?: boolean
          test_actual?: number | null
          test_estimation?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      taskTech: {
        Row: {
          task_id: number
          tech_id: number
        }
        Insert: {
          task_id: number
          tech_id: number
        }
        Update: {
          task_id?: number
          tech_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_taskTech_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_taskTech_tech_id_fkey"
            columns: ["tech_id"]
            isOneToOne: false
            referencedRelation: "tech"
            referencedColumns: ["id"]
          },
        ]
      }
      tech: {
        Row: {
          created_at: string
          id: number
          link: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          link: string
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          link?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_project_with_tech: {
        Args: {
          project_name: string
          project_desc: string
          project_public: boolean
          tech_ids: number[]
        }
        Returns: undefined
      }
      create_task: {
        Args: {
          project_id: number
          task_name: string
          task_desc: string
          task_public: boolean
          task_estimation: number
          task_test_estimation: number
          tech_ids: number[]
        }
        Returns: undefined
      }
      edit_project_with_tech: {
        Args: {
          var_project_id: number
          project_name: string
          project_desc: string
          project_public: boolean
          tech_ids_to_add: number[]
          tech_ids_to_remove: number[]
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
