export function isPropertyExist(obj: any, prop: string[]) {
	return prop.every((p) => obj.hasOwnProperty(p));
}
