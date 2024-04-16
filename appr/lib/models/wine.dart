

class Wine {
  String name, country, region, type, producer, grape, currency;
  int id;
  DateTime prodYear;
  double price, alcohol;

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
  
  @override
  String toString() {
    return "Wine: $name, $country, $region, $type, $producer, $grape, $currency, $prodYear, $price, $alcohol";
  }
}
