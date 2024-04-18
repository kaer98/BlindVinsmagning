import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, date, mysqlEnum, text, decimal, index, foreignKey, tinyint, datetime } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const user = mysqlTable("User", {
	id: int("id").autoincrement().notNull(),
	fullName: varchar("fullName", { length: 255 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	birthday: date("birthday", { mode: 'string' }),
	gender: mysqlEnum("gender", ['MALE','FEMALE']),
	username: varchar("username", { length: 255 }),
	password: varchar("password", { length: 255 }),
},
(table) => {
	return {
		userId: primaryKey({ columns: [table.id], name: "User_id"}),
	}
});

export const wset = mysqlTable("WSET", {
	id: int("id").autoincrement().notNull(),
	aIntensity: mysqlEnum("aIntensity", ['Low','Medium','High']),
	nIntensity: mysqlEnum("nIntensity", ['Low','Medium','High']),
	sweetness: mysqlEnum("sweetness", ['Dry','Medium','Sweet']),
	aromaCharacteristics: text("aromaCharacteristics"),
	acidity: mysqlEnum("acidity", ['Low','Medium','High']),
	tannin: mysqlEnum("tannin", ['Low','Medium','High']),
	alcohol: mysqlEnum("alcohol", ['Low','Medium','High']),
	body: mysqlEnum("body", ['Light','Medium','Full']),
	flavourIntensity: mysqlEnum("flavourIntensity", ['Low','Medium','High']),
	flavourCharacteristics: text("flavourCharacteristics"),
	finish: mysqlEnum("finish", ['Short','Medium','Long']),
	quality: mysqlEnum("quality", ['Poor','Fair','Good','Very Good','Excellent']),
},
(table) => {
	return {
		wsetId: primaryKey({ columns: [table.id], name: "WSET_id"}),
	}
});

export const wine = mysqlTable("Wine", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }),
	country: varchar("country", { length: 255 }),
	region: varchar("region", { length: 255 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	prodYear: date("prodYear", { mode: 'string' }),
	producer: varchar("producer", { length: 255 }),
	alcohol: decimal("alcohol", { precision: 5, scale: 2 }),
	type: varchar("type", { length: 255 }),
	grape: varchar("grape", { length: 255 }),
	price: decimal("price", { precision: 10, scale: 2 }),
	currency: varchar("currency", { length: 3 }),
},
(table) => {
	return {
		wineId: primaryKey({ columns: [table.id], name: "Wine_id"}),
	}
});

export const wineEvaluation = mysqlTable("WineEvaluation", {
	id: int("id").autoincrement().notNull(),
	wineId: int("wineId").references(() => wine.id),
	userId: int("userId").references(() => user.id),
	evaluationName: varchar("evaluationName", { length: 255 }),
	note: text("note"),
},
(table) => {
	return {
		userId: index("userId").on(table.userId),
		wineId: index("wineId").on(table.wineId),
		wineEvaluationId: primaryKey({ columns: [table.id], name: "WineEvaluation_id"}),
	}
});

export const wineTasting = mysqlTable("WineTasting", {
	id: int("id").autoincrement().notNull(),
	visibility: mysqlEnum("visibility", ['Public','Private']),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date("date", { mode: 'string' }),
	hostId: int("hostId").references(() => user.id),
	winnerId: int("winnerId").references(() => wine.id),
	finished: tinyint("finished"),
	title: varchar("title", { length: 255 }),
},
(table) => {
	return {
		hostId: index("hostId").on(table.hostId),
		winnerId: index("winnerId").on(table.winnerId),
		wineTastingId: primaryKey({ columns: [table.id], name: "WineTasting_id"}),
	}
});

export const wineTastingParticipants = mysqlTable("WineTasting_Participants", {
	wineTastingId: int("wineTastingId").notNull().references(() => wineTasting.id),
	userId: int("userId").notNull().references(() => user.id),
},
(table) => {
	return {
		userId: index("userId").on(table.userId),
		wineTastingParticipantsWineTastingIdUserId: primaryKey({ columns: [table.wineTastingId, table.userId], name: "WineTasting_Participants_wineTastingId_userId"}),
	}
});

export const wineTastingWines = mysqlTable("WineTasting_Wines", {
	wineTastingId: int("wineTastingId").notNull().references(() => wineTasting.id),
	wineId: int("wineId").notNull().references(() => wine.id),
},
(table) => {
	return {
		wineId: index("wineId").on(table.wineId),
		wineTastingWinesWineTastingIdWineId: primaryKey({ columns: [table.wineTastingId, table.wineId], name: "WineTasting_Wines_wineTastingId_wineId"}),
	}
});

export const prismaMigrations = mysqlTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: datetime("finished_at", { mode: 'string', fsp: 3 }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: datetime("rolled_back_at", { mode: 'string', fsp: 3 }),
	startedAt: datetime("started_at", { mode: 'string', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
	appliedStepsCount: int("applied_steps_count", { unsigned: true }).default(0).notNull(),
},
(table) => {
	return {
		prismaMigrationsId: primaryKey({ columns: [table.id], name: "_prisma_migrations_id"}),
	}
});