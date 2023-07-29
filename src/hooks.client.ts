import { dev } from '$app/environment';
import { PUBLIC_SENTRY_DSN } from '$env/static/public';
import * as Sentry from '@sentry/sveltekit';
import type { HandleClientError } from '@sveltejs/kit';

Sentry.init({
	dsn: PUBLIC_SENTRY_DSN,
	// Performance Monitoring:
	tracesSampleRate: 1.0, // Capture 100% of the transactions. Adjust this value in production as necessary.
	// Session Replay
	integrations: [new Sentry.Replay()],
	replaysSessionSampleRate: 0.1, // This sets the Replay sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
	beforeSend(event, hint) {
		// if (event.exception) {
		// 	Sentry.showReportDialog({
		// 		eventId: event.event_id
		// 	});
		// }
		return event;
	}
});

export const handleError = (({ error, event }) => {
	Sentry.captureException(error, { extra: { event } });
	if (dev) console.error(error);
	return {
		message: 'Whoops! Something went wrong on the client.'
	};
}) satisfies HandleClientError;
