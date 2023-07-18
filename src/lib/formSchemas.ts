import { z } from 'zod';

export const phoneNumberSchema = z.string().regex(/^(0|\+66)[2-9]{1}[0-9]{7,8}$/, {
	message: 'โปรดกรอกเฉพาะตัวเลข ไม่ต้องมีเครื่องหมายขีดหรือช่องว่าง'
});

export const simpleStringSchema = z.string({
	required_error: 'อย่าเว้นว่างช่องนี้ไว้'
});

export const studentMembers = z.object({
	title_th: simpleStringSchema,
	title_en: simpleStringSchema.optional(),
	firstname_th: simpleStringSchema,
	firstname_en: simpleStringSchema.optional(),
	lastname_th: simpleStringSchema,
	lastname_en: simpleStringSchema.optional(),
	phone_number: phoneNumberSchema.optional(),
	email: z.string().email()
});

export const teacherAdvisor = z.object({
	title_th: simpleStringSchema,
	title_en: simpleStringSchema.optional(),
	firstname_th: simpleStringSchema,
	firstname_en: simpleStringSchema.optional(),
	lastname_th: simpleStringSchema,
	lastname_en: simpleStringSchema.optional(),
	phone_number: phoneNumberSchema.optional(),
	email: z.string().email()
});

export const specialAdvisor = z.object({
	title_th: simpleStringSchema,
	title_en: simpleStringSchema.optional(),
	firstname_th: simpleStringSchema,
	firstname_en: simpleStringSchema.optional(),
	lastname_th: simpleStringSchema,
	lastname_en: simpleStringSchema.optional(),
	academic_ranks: simpleStringSchema.optional(),
	institution: simpleStringSchema,
	institution_address: simpleStringSchema,
	email: z.string().optional()
});
export type StudentMembers = z.infer<typeof studentMembers>;
export type TeacherAdvisor = z.infer<typeof teacherAdvisor>;
export type SpecialAdvisor = z.infer<typeof specialAdvisor>;

export const studentRegisterProjectFormSchema = z.object({
	presentation_type: z.number().int().min(1).max(3),
	project_field: z.number().int().min(1).max(6),
	project_title_th: simpleStringSchema,
	project_title_en: simpleStringSchema,
	school: z.number().int().min(1).max(12),
	student_members: z.array(studentMembers),
	teacher_advisor: z.array(teacherAdvisor),
	special_advisor: z.array(specialAdvisor)
});

export type StudentRegisterProjectFormSchema = z.infer<typeof studentRegisterProjectFormSchema>;

export const userWelcomeMetadataSchema = z
	.object({
		title_th: z.string(),
		title_en: z.string(),
		firstname_th: z.string(),
		firstname_en: z.string(),
		lastname_th: z.string(),
		lastname_en: z.string(),
		phone: phoneNumberSchema,
		password: z
			.string()
			.min(8, {
				message: 'รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร'
			})
			.max(32, {
				message: 'รหัสผ่านต้องไม่ยาวกว่า 32 ตัวอักษร'
			}),
		retype_password: z
			.string()
			.min(8, {
				message: 'รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร'
			})
			.max(32, {
				message: 'รหัสผ่านต้องไม่ยาวกว่า 32 ตัวอักษร'
			})
	})
	.superRefine(({ password, retype_password }, ctx) => {
		if (password !== retype_password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'รหัสผ่านไม่ตรงกัน',
				path: ['retype_password']
			});
		}
	});
