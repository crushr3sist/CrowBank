import { PrismaClient } from "@prisma/client";

namespace db {
	export const prisma = new PrismaClient();
}

export default db;
