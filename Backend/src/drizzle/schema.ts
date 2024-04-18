import { pgTable, unique, pgEnum, serial, varchar, date, foreignKey, integer, boolean, numeric, text } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const genderEnum = pgEnum("GenderEnum", ['MALE', 'FEMALE'])
export const genderenum = pgEnum("genderenum", ['Other', 'Female', 'Male'])
export const visibilityenum = pgEnum("visibilityenum", ['Private', 'Public'])
export const aintensityenum = pgEnum("aintensityenum", ['High', 'Medium', 'Low'])
export const nintensityenum = pgEnum("nintensityenum", ['High', 'Medium', 'Low'])
export const sweetnessenum = pgEnum("sweetnessenum", ['Sweet', 'Medium', 'Dry'])
export const acidityenum = pgEnum("acidityenum", ['High', 'Medium', 'Low'])
export const taninenum = pgEnum("taninenum", ['High', 'Medium', 'Low'])
export const alchoholenum = pgEnum("alchoholenum", ['High', 'Medium', 'Low'])
export const bodyenum = pgEnum("bodyenum", ['Full', 'Medium', 'Light'])
export const flavourintensityenum = pgEnum("flavourintensityenum", ['High', 'Medium', 'Low'])
export const finishenum = pgEnum("finishenum", ['Long', 'Medium', 'Short'])
export const qualityenum = pgEnum("qualityenum", ['Excellent', 'Good', 'Fair', 'Poor'])


export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	fullname: varchar("fullname", { length: 100 }).notNull(),
	birthday: date("birthday").notNull(),
	gender: genderenum("gender").notNull(),
	username: varchar("username", { length: 50 }).notNull(),
	password: varchar("password", { length: 100 }).notNull(),
},
(table) => {
	return {
		usersUsernameKey: unique("users_username_key").on(table.username),
	}
});

export const winetastings = pgTable("winetastings", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 100 }),
	visibility: visibilityenum("visibility"),
	date: date("date"),
	hostid: integer("hostid").references(() => users.id),
	winnerid: integer("winnerid").references(() => wines.id),
	finished: boolean("finished"),
	participants: integer("participants").array(),
	wines: integer("wines").array(),
});

export const wines = pgTable("wines", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 100 }),
	country: varchar("country", { length: 100 }),
	region: varchar("region", { length: 100 }),
	prodyear: date("prodyear"),
	producer: varchar("producer", { length: 100 }),
	alcohol: numeric("alcohol"),
	type: varchar("type", { length: 50 }),
	grape: varchar("grape", { length: 100 }),
	price: numeric("price"),
	currency: varchar("currency", { length: 3 }),
});

export const wineevaluations = pgTable("wineevaluations", {
	id: serial("id").primaryKey().notNull(),
	wineid: integer("wineid").references(() => wines.id),
	evaluationname: varchar("evaluationname", { length: 100 }),
	note: text("note"),
	userid: integer("userid").references(() => users.id),
});

export const evaluations = pgTable("evaluations", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 100 }),
	note: text("note"),
});

export const wset = pgTable("wset", {
	id: serial("id").primaryKey().notNull(),
	evaluationid: integer("evaluationid").references(() => evaluations.id),
	aintensity: aintensityenum("aintensity"),
	nintensity: nintensityenum("nintensity"),
	sweetness: sweetnessenum("sweetness"),
	aromacharacteristics: text("aromacharacteristics"),
	acidity: acidityenum("acidity"),
	tannin: taninenum("tannin"),
	alcohol: alchoholenum("alcohol"),
	body: bodyenum("body"),
	flavourintensity: flavourintensityenum("flavourintensity"),
	flavourcharacteristics: text("flavourcharacteristics"),
	finish: finishenum("finish"),
	quality: qualityenum("quality"),
});