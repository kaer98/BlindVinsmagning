import { pgTable, foreignKey, pgEnum, serial, text, varchar, integer, unique, date, boolean, numeric } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const aintensityEnum = pgEnum("AIntensityEnum", ['High', 'Medium', 'Low', 'Pale', 'Deep'])
export const acidityEnum = pgEnum("AcidityEnum", ['High', 'Medium', 'Low'])
export const alcoholEnum = pgEnum("AlcoholEnum", ['High', 'Medium', 'Low'])
export const bodyEnum = pgEnum("BodyEnum", ['Full', 'Medium', 'Light'])
export const finishEnum = pgEnum("FinishEnum", ['Long', 'Medium', 'Short'])
export const flavourIntensityEnum = pgEnum("FlavourIntensityEnum", ['High', 'Medium', 'Low', 'Light', 'Pronounced'])
export const genderEnum = pgEnum("GenderEnum", ['Male', 'Female'])
export const nintensityEnum = pgEnum("NIntensityEnum", ['High', 'Medium', 'Low', 'Light', 'Pronounced'])
export const qualityEnum = pgEnum("QualityEnum", ['Excellent', 'Good', 'Poor', 'Acceptable', 'VeryGood', 'Outstanding'])
export const sweetnessEnum = pgEnum("SweetnessEnum", ['Sweet', 'Medium', 'Dry', 'OffDry'])
export const tanninEnum = pgEnum("TanninEnum", ['High', 'Medium', 'Low'])
export const visibilityEnum = pgEnum("VisibilityEnum", ['Open', 'SemiBlind', 'Blind'])
export const acolorIntensityEnum = pgEnum("AColorIntensityEnum", ['Lemon', 'Gold', 'Amber', 'Pink', 'PinkOrange', 'Orange', 'Ruby', 'Garnet', 'Tawny', 'Purple'])


export const evaluations = pgTable("Evaluations", {
	id: serial("Id").primaryKey().notNull(),
	note: text("Note"),
	name: varchar("Name", { length: 100 }),
	userId: integer("UserId").references(() => users.id),
	tastingId: integer("TastingId").references(() => wineTastings.id),
	wineId: integer("WineId").references(() => wines.id),
	aintensity: aintensityEnum("AIntensity"),
	nintensity: nintensityEnum("NIntensity"),
	sweetness: sweetnessEnum("Sweetness"),
	aromaCharacteristics: text("AromaCharacteristics"),
	acidity: acidityEnum("Acidity"),
	tannin: tanninEnum("Tannin"),
	alcohol: alcoholEnum("Alcohol"),
	body: bodyEnum("Body"),
	flavourIntensity: flavourIntensityEnum("FlavourIntensity"),
	flavourCharacteristics: text("FlavourCharacteristics"),
	finish: finishEnum("Finish"),
	quality: qualityEnum("Quality"),
	acolourIntensity: acolorIntensityEnum("AColourIntensity"),
});

export const users = pgTable("Users", {
	id: serial("Id").primaryKey().notNull(),
	fullName: varchar("FullName", { length: 100 }).notNull(),
	birthDay: date("BirthDay").notNull(),
	gender: genderEnum("Gender").notNull(),
	username: varchar("Username", { length: 50 }).notNull(),
	password: varchar("Password", { length: 100 }).notNull(),
},
(table) => {
	return {
		usersUsernameKey: unique("users_username_key").on(table.username),
	}
});

export const wineTastings = pgTable("WineTastings", {
	id: serial("Id").primaryKey().notNull(),
	name: varchar("Name", { length: 100 }),
	visibility: visibilityEnum("Visibility"),
	date: date("Date"),
	hostId: integer("HostId").references(() => users.id),
	winnerId: integer("WinnerId").references(() => wines.id),
	finished: boolean("Finished"),
});

export const wines = pgTable("Wines", {
	id: serial("Id").primaryKey().notNull(),
	name: varchar("Name", { length: 100 }),
	country: varchar("Country", { length: 100 }),
	region: varchar("Region", { length: 100 }),
	prodYear: date("ProdYear"),
	producer: varchar("Producer", { length: 100 }),
	alcohol: numeric("Alcohol"),
	type: varchar("Type", { length: 50 }),
	grape: varchar("Grape", { length: 100 }),
	price: numeric("Price"),
	currency: varchar("Currency", { length: 3 }),
});

export const tastingParticipants = pgTable("TastingParticipants", {
	id: serial("Id").primaryKey().notNull(),
	tastingId: integer("TastingId").references(() => wineTastings.id),
	userId: integer("UserId").references(() => users.id),
});

export const tastingWines = pgTable("TastingWines", {
	id: serial("Id").primaryKey().notNull(),
	tastingId: integer("TastingId").references(() => wineTastings.id),
	wineId: integer("WineId").references(() => wines.id),
});