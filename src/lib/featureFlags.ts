// import { get, type EdgeConfigValue } from '@vercel/edge-config';
// import type { Roles } from './types';

// // "mt-all": "",
// // "mt-anon": "",
// // "mt-logged-in": "",
// // "mt-student": "",
// // "mt-teacher": "",
// // "mt-school-contact": ""

// const maintainanceText: Record<Roles & ('all' | 'logged-in'), Promise<EdgeConfigValue | undefined>> = {
//   'all': get('mt-all'),
//   'anon': get('mt-anon'),
//   'logged-in': get('mt-logged-in'),
//   'student': get('mt-student'),
//   'teacher': get('mt-teacher'),
//   'school-contact': get('mt-school-contact')
// }

// export const getMaintainentMessage =  async (userRole: Roles & ('all' | 'logged-is')) => {
//   if (userRole === 'all' || userRole === 'anon') {
//     return await maintainanceText[userRole];
//   }
//   return await (maintainanceText[userRole]);
// }
