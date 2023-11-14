import db from "../db";

export class UserService {
	async getUsersName(
		userId: string,
	): Promise<{ firstName: string; lastName: string } | null> {
		const userRecord = await db.prisma.user.findFirst({
			where: { id: userId },
		});
		return userRecord;
	}
}
