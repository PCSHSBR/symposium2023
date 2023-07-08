import { z } from 'zod';

export const studentMembers = z.object({
	title_th: z.string().min(1),
	title_en: z.string().min(1),
	firstname_th: z.string().min(1),
	firstname_en: z.string().min(1),
	lastname_th: z.string().min(1),
	lastname_en: z.string().min(1),
	phone_number: z.string().min(1).max(10),
	email: z.string().email()
});
export type StudentMembers = z.infer<typeof studentMembers>;

export const studentRegisterProjectFormSchema = z.object({
	presentation_type: z.number().int().min(1).max(3),
	project_field: z.number().int().min(1).max(6),
	project_title_th: z.string().min(1),
	project_title_en: z.string().min(1),
	school: z.number().int().min(1).max(12),
	student_members: z.array(studentMembers)
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
		phone: z.string().regex(/^(0|\+66)[2-9]{1}[0-9]{7,8}$/, {
			message: 'โปรดกรอกเฉพาะตัวเลข ไม่ต้องมีเครื่องหมายขีดหรือช่องว่าง'
		}),
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
