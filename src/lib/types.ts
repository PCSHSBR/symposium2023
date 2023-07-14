export type Roles = 'anon' | 'staff' | 'teacher' | 'student-team-contact' | 'school-contact';

export interface UserMetadata {
	role: Roles;
	invited_by: string;
	title_th: string;
	firstname_th: string;
	lastname_th: string;
	title_en: string;
	firstname_en: string;
	lastname_en: string;
	phone: string;
}

export interface RoleDescription {
	name: string;
	desc: string;
}

export interface CalendarSchema {
	'start-date': string;
	'end-date': string;
	'start-time': string;
	'end-time': string;
	name: string;
	description: string;
}

/**
 * For using with <RenderStyledText />
 */
export type StyledText = string;
