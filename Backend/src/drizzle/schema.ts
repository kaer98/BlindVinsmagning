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
  
  
  

export const wset = pgTable("WSETs", {
	id: serial("id").primaryKey().notNull(),
	aintensity: AIntensityEnum("aintensity"),
	nintensity: NIntensityEnum("nintensity"),
	sweetness: SweetnessEnum("sweetness"),
	aromacharacteristics: text("aromacharacteristics"),
	acidity: AcidityEnum("acidity"),
	tannin: TanninEnum("tannin"),
	alcohol: AlcoholEnum("alcohol"),
	body: BodyEnum("body"),
	flavourintensity: FlavourIntensityEnum("flavourintensity"),
	flavourcharacteristics: text("flavourcharacteristics"),
	finish: FinishEnum("finish"),
	quality: QualityEnum("quality"),
});



export const evaluations = pgTable("Evaluations", {
	id: serial("id").primaryKey().notNull(),
	note: text("note"),
	wsetid: integer("wsetid").references(() => wset.id),
	name: varchar("name", { length: 100 }),
	userid: integer("userid").references(() => users.id),
	tastingid: integer("tastingid").references(() => winetastings.id),
	wineid: integer("wineid").references(() => wines.id),
});

export const users = pgTable("Users", {
	id: serial("id").primaryKey().notNull(),
	fullname: varchar("fullname", { length: 100 }).notNull(),
	birthday: date("birthday").notNull(),
	gender: GenderEnum("gender").notNull(),
	username: varchar("username", { length: 50 }).notNull(),
	password: varchar("password", { length: 100 }).notNull(),
},
(table) => {
	return {
		usersUsernameKey: unique("users_username_key").on(table.username),
	}
});

export const winetastings = pgTable("WineTastings", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 100 }),
	visibility: VisibilityEnum("visibility"),
	date: date("date"),
	hostid: integer("hostid").references(() => users.id),
	winnerid: integer("winnerid").references(() => wines.id),
	finished: boolean("finished"),
});

export const wines = pgTable("Wines", {
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

export const tastingwines = pgTable("TastingWines", {
	id: serial("id").primaryKey().notNull(),
	tastingid: integer("tastingid").references(() => winetastings.id),
	wineid: integer("wineid").references(() => wines.id),
});

export const tastingparticipants = pgTable("TastingParticipants", {
	id: serial("id").primaryKey().notNull(),
	tastingid: integer("tastingid").references(() => winetastings.id),
	userid: integer("userid").references(() => users.id),
});