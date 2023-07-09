// src/hooks.server.ts
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://63a919589e724743aa0ab7cd554cdd82@o4504022727327744.ingest.sentry.io/4505499348434944',
	// Performance Monitoring
	tracesSampleRate: 1.0 // Capture 100% of the transactions. Adjust this value in production as necessary.
});

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: SUPABASE_SERVICE_ROLE_KEY,
		event
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	event.locals.role = async () => {
		return (await event.locals.getSession())?.user.user_metadata.role || 'anon';
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
