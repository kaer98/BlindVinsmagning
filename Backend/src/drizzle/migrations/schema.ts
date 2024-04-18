import { pgTable, uniqueIndex, pgEnum, serial, timestamp, text, date, numeric } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const genderEnum = pgEnum("GenderEnum", ['FEMALE', 'MALE'])


export const user = pgTable("User", {
	id: serial("id").primaryKey().notNull(),
	birthday: timestamp("birthday", { precision: 3, mode: 'string' }).notNull(),
	fullName: text("fullName").notNull(),
	gender: genderEnum("gender").notNull(),
	password: text("password").notNull(),
	username: text("username").notNull(),
},
(table) => {
	return {
		usernameKey: uniqueIndex("User_username_key").on(table.username),
	}
});

export const wine = pgTable("Wine", {
	id: serial("id").primaryKey().notNull(),
	country: text("country").notNull(),
	region: text("region").notNull(),
	prodYear: date("prodYear").notNull(),
	producer: text("producer").notNull(),
	alcohol: numeric("alcohol", { precision: 65, scale:  30 }).notNull(),
	type: text("type").notNull(),
	grape: text("grape").notNull(),
	price: numeric("price", { precision: 65, scale:  30 }).notNull(),
	currentcy: text("currentcy").notNull(),
	name: text("name").notNull(),
});