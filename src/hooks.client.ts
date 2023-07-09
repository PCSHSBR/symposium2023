import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://63a919589e724743aa0ab7cd554cdd82@o4504022727327744.ingest.sentry.io/4505499348434944',
	// Performance Monitoring:
	tracesSampleRate: 1.0, // Capture 100% of the transactions. Adjust this value in production as necessary.
	// Session Replay
	integrations: [new Sentry.Replay()],
	replaysSessionSampleRate: 0.1, // This sets the Replay sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
