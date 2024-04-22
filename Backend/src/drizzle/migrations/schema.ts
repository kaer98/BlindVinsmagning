import { pgTable, pgEnum, serial, text, foreignKey, integer, varchar, unique, date, boolean, numeric } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

  export const GenderEnum = pgEnum("GenderEnum", ['Male', 'Female']);
  export const VisibilityEnum = pgEnum("VisibilityEnum", ['Open', 'SemiBlind', 'Blind']);
  export const AIntensityEnum = pgEnum("AIntensityEnum", ['High', 'Medium', 'Low']);
  export const NIntensityEnum = pgEnum("NIntensityEnum", ['High', 'Medium', 'Low']);
  export const SweetnessEnum = pgEnum("SweetnessEnum", ['Sweet', 'Medium', 'Dry', 'OffDry']);
  export const AcidityEnum = pgEnum("AcidityEnum", ['High', 'Medium', 'Low']);
  export const TanninEnum = pgEnum("TanninEnum", ['High', 'Medium', 'Low']);
  export const AlcoholEnum = pgEnum("AlcoholEnum", ['High', 'Medium', 'Low']);
  export const BodyEnum = pgEnum("BodyEnum", ['Full', 'Medium', 'Light']);
  export const FlavourIntensityEnum = pgEnum("FlavourIntensityEnum", ['High', 'Medium', 'Low']);
  export const FinishEnum = pgEnum("FinishEnum", ['Long', 'Medium', 'Short']);
  export const QualityEnum = pgEnum("QualityEnum", ['Excellent', 'Good', 'Poor', 'Acceptable', 'VeryGood', 'Outstanding']);
  export const AColourIntensityEnum = pgEnum("AColorIntensityEnum", ['Lemon', 'Gold', 'Amber', 'Pink', 'PinkOrange', 'Orange', 'Ruby', 'Garnet', 'Tawny', 'Purple']);


export const evaluations = pgTable("Evaluations", {
	id: serial("Id").primaryKey().notNull(),
	note: text("Note"),
	name: varchar("Name", { length: 100 }),
	userid: integer("UserId").references(() => users.id),
	tastingid: integer("TastingId").references(() => winetastings.id),
	wineid: integer("WineId").references(() => wines.id),
	aintensity: AIntensityEnum("AIntensity"),
	nintensity: NIntensityEnum("NIntensity"),
	sweetness: SweetnessEnum("Sweetness"),
	aromacharacteristics: text("AromaCharacteristics"),
	acidity: AcidityEnum("Acidity"),
	tannin: TanninEnum("Tannin"),
	alcohol: AlcoholEnum("Alcohol"),
	body: BodyEnum("Body"),
	flavourintensity: FlavourIntensityEnum("FlavourIntensity"),
	flavourcharacteristics: text("FlavourCharacteristics"),
	finish: FinishEnum("Finish"),
	quality: QualityEnum("Quality"),
	acolourintensity: AColourIntensityEnum("AColourIntensity"),
});

export const users = pgTable("Users", {
	id: serial("Id").primaryKey().notNull(),
	fullname: varchar("FullName", { length: 100 }).notNull(),
	birthday: date("BirthDay").notNull(),
	gender: GenderEnum("Gender").notNull(),
	username: varchar("Username", { length: 50 }).notNull(),
	password: varchar("Password", { length: 100 }).notNull(),
},
(table) => {
	return {
		usersUsernameKey: unique("users_username_key").on(table.username),
	}
});

export const winetastings = pgTable("WineTastings", {
	id: serial("Id").primaryKey().notNull(),
	name: varchar("Name", { length: 100 }),
	visibility: VisibilityEnum("Visibility"),
	date: date("Date"),
	hostid: integer("HostId").references(() => users.id),
	winnerid: integer("WinnerId").references(() => wines.id),
	finished: boolean("Finished"),
});

export const wines = pgTable("Wines", {
	id: serial("Id").primaryKey().notNull(),
	name: varchar("Name", { length: 100 }),
	country: varchar("Country", { length: 100 }),
	region: varchar("Region", { length: 100 }),
	prodyear: date("ProdYear"),
	producer: varchar("Producer", { length: 100 }),
	alcohol: numeric("Alcohol"),
	type: varchar("Type", { length: 50 }),
	grape: varchar("Grape", { length: 100 }),
	price: numeric("Price"),
	currency: varchar("Currency", { length: 3 }),
});

export const tastingwines = pgTable("TastingWines", {
	id: serial("Id").primaryKey().notNull(),
	tastingid: integer("TastingId").references(() => winetastings.id),
	wineid: integer("WineId").references(() => wines.id),
});

export const tastingparticipants = pgTable("TastingParticipants", {
	id: serial("Id").primaryKey().notNull(),
	tastingid: integer("TastingId").references(() => winetastings.id),
	userid: integer("UserId").references(() => users.id),
});