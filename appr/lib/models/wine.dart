

class Wine {
  String name, country, region, type, producer, grape, currency;
  int id;
  DateTime prodYear;
  double price, alcohol;

  get getProdYear => prodYear.year;

  Wine({
    required this.id,
    required this.name,
    required this.country,
    required this.region,
    required this.type,
    required this.producer,
    required this.grape,
    required this.currency,
    required this.prodYear,
    required this.price,
    required this.alcohol,
  });

  factory Wine.fromJson(Map<String, dynamic> json) {
    print(json['prodyear']);
    return Wine(
      id: json['id'],
      name: json['name'],
      country: json['country'],
      region: json['region'],
      type: json['type'],
      producer: json['producer'],
      grape: json['grape'],
      currency: json['currency'],
      prodYear: DateTime.parse(json['prodyear']),
      price: double.parse(json['price']),
      alcohol: double.parse(json['alcohol']),
    );
  }
  
  @override
  String toString() {
    return "Name: $name \nCountry: $country \nRegion: $region \nType: $type \nProducer: $producer \nGrape: $grape \nProduction Year: $getProdYear \nPrice: $price $currency \nAlcohol: $alcohol%\n$id";
  }
}
