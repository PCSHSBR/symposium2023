// src/app.d.ts

import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from './DatabaseDefinitions';
import type { Roles, UserMetadata } from '$lib/types';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
			role(): Promise<Roles>;
		}
		interface PageData {
			session: Session | null;
			role: Roles;
			user_metadata: UserMetadata;
		}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
