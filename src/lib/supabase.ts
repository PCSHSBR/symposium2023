export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			field: {
				Row: {
					description: string | null;
					id: number;
					name: string;
					presentation_type_id: number;
				};
				Insert: {
					description?: string | null;
					id?: number;
					name: string;
					presentation_type_id: number;
				};
				Update: {
					description?: string | null;
					id?: number;
					name?: string;
					presentation_type_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'field_presentation_type_id_fkey';
						columns: ['presentation_type_id'];
						referencedRelation: 'presentation_type';
						referencedColumns: ['id'];
					}
				];
			};
			presentation_type: {
				Row: {
					description: string | null;
					id: number;
					is_onsite: boolean;
					type: string;
				};
				Insert: {
					description?: string | null;
					id?: number;
					is_onsite: boolean;
					type: string;
				};
				Update: {
					description?: string | null;
					id?: number;
					is_onsite?: boolean;
					type?: string;
				};
				Relationships: [];
			};
			projects: {
				Row: {
					abstract: string | null;
					code: string | null;
					created_at: string | null;
					field: number | null;
					id: number;
					presentation_type: number | null;
					school: number | null;
					special_advisor: Json[] | null;
					student_members: Json[] | null;
					teacher_advisor: Json[] | null;
					team_contact_user_id: string | null;
					title_en: string | null;
					title_th: string | null;
				};
				Insert: {
					abstract?: string | null;
					code?: string | null;
					created_at?: string | null;
					field?: number | null;
					id?: number;
					presentation_type?: number | null;
					school?: number | null;
					special_advisor?: Json[] | null;
					student_members?: Json[] | null;
					teacher_advisor?: Json[] | null;
					team_contact_user_id?: string | null;
					title_en?: string | null;
					title_th?: string | null;
				};
				Update: {
					abstract?: string | null;
					code?: string | null;
					created_at?: string | null;
					field?: number | null;
					id?: number;
					presentation_type?: number | null;
					school?: number | null;
					special_advisor?: Json[] | null;
					student_members?: Json[] | null;
					teacher_advisor?: Json[] | null;
					team_contact_user_id?: string | null;
					title_en?: string | null;
					title_th?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'projects_field_fkey';
						columns: ['field'];
						referencedRelation: 'field';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'projects_presentation_type_fkey';
						columns: ['presentation_type'];
						referencedRelation: 'presentation_type';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'projects_school_fkey';
						columns: ['school'];
						referencedRelation: 'schools';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'projects_team_contact_user_id_fkey';
						columns: ['team_contact_user_id'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			roles: {
				Row: {
					display: string | null;
					ref: string;
				};
				Insert: {
					display?: string | null;
					ref: string;
				};
				Update: {
					display?: string | null;
					ref?: string;
				};
				Relationships: [];
			};
			schools: {
				Row: {
					id: number;
					province: string;
					ref: string;
				};
				Insert: {
					id?: number;
					province: string;
					ref: string;
				};
				Update: {
					id?: number;
					province?: string;
					ref?: string;
				};
				Relationships: [];
			};
			user_roles: {
				Row: {
					id: number;
					role: string;
					user: string;
				};
				Insert: {
					id?: number;
					role: string;
					user: string;
				};
				Update: {
					id?: number;
					role?: string;
					user?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'user_roles_role_fkey';
						columns: ['role'];
						referencedRelation: 'roles';
						referencedColumns: ['ref'];
					},
					{
						foreignKeyName: 'user_roles_user_fkey';
						columns: ['user'];
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
