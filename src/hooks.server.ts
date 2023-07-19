// src/hooks.server.ts
import { PUBLIC_SENTRY_DSN, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import * as Sentry from '@sentry/sveltekit';
import { dev } from '$app/environment';

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
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

export const handleError = (({ error, event }) => {
	Sentry.captureException(error, { extra: { event } });
	if (dev) console.error(error);
	return {
		message: 'Whoops!'
	};
}) satisfies HandleServerError;
