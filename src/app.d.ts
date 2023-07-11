// src/app.d.ts

import { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Database } from '$lib/supabase';
import type { Roles, UserMetadata as LocalMetadata } from '$lib/types';
import type { UserMetadata } from '@supabase/supabase-js';

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
			user_metadata: UserMetadata | LocalMetadata | undefined;
		}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
