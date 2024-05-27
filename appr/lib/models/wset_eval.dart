// ignore_for_file: constant_identifier_names, non_constant_identifier_names


enum PAlcoholEnum { Low, Medium, High }

enum PAcidityEnum { Low, Medium, High }

enum PSweetnessEnum { Dry, OffDry, Medium, Sweet }

enum PTanninEnum { Low, Medium, High }

enum PBodyEnum { Light, Medium, Full }

enum PFlavourIntensityEnum { Light, Medium, Pronounced }

enum PFinishEnum { Short, Medium, Long }

enum AIntensityEnum { Pale, Medium, Deep }

enum AColorEnum {
  Lemon,
  Gold,
  Amber,
  Pink,
  PinkOrange,
  Orange,
  Purple,
  Ruby,
  Garnet,
  Tawny
}

enum NintensityEnum { Light, Medium, Pronounced }

enum CQualityEnum { Poor, Acceptable, Good, VeryGood, Outstanding }

class Wset {
  String name = 'WSET level 2 Evaluation';
  String? note;
  String? flavourcharacteristics;
  String? aromacharacteristics;
  PAlcoholEnum? pAlcohol;
  PAcidityEnum? pAcidity;
  PSweetnessEnum? pSweetness;
  PTanninEnum? pTannin;
  PBodyEnum? pBody;
  PFlavourIntensityEnum? pFlavourIntensity;
  PFinishEnum? pFinish;
  AIntensityEnum? aIntensity;
  AColorEnum? aColor;
  NintensityEnum? nIntensity;
  CQualityEnum? cQuality;
  int? id;
  int? wineId;
  int? tastingId;
  int? UserId;
  get stars => switch (cQuality??CQualityEnum.Poor) {
    CQualityEnum.Poor=> 1,
    CQualityEnum.Acceptable => 2,
    CQualityEnum.Good => 3,
    CQualityEnum.VeryGood => 4,
    CQualityEnum.Outstanding => 5,
  };

 
  double get completenessPercentage {
    int totalProperties = 14; // Total number of properties in the class
    int nonNullProperties = 0;

    if (pAlcohol != null) nonNullProperties++;
    if (pAcidity != null) nonNullProperties++;
    if (pSweetness != null) nonNullProperties++;
    if (pTannin != null) nonNullProperties++;
    if (pBody != null) nonNullProperties++;
    if (pFlavourIntensity != null) nonNullProperties++;
    if (pFinish != null) nonNullProperties++;
    if (aIntensity != null) nonNullProperties++;
    if (aColor != null) nonNullProperties++;
    if (nIntensity != null) nonNullProperties++;
    if (cQuality != null) nonNullProperties++;
    if (note != null && note!.length>1) nonNullProperties++;
    if (flavourcharacteristics != null) nonNullProperties++;
    if (aromacharacteristics != null) nonNullProperties++;

    return double.parse(((nonNullProperties / totalProperties) * 100).toStringAsFixed(2));
  }

  factory Wset.fromJson(Map<String, dynamic> json) {
    String? note;
    String? flavourcharacteristics;
    String? aromacharacteristics;
    PAlcoholEnum? pAlcohol;
    PAcidityEnum? pAcidity;
    PSweetnessEnum? pSweetness;
    PTanninEnum? pTannin;
    PBodyEnum? pBody;
    PFlavourIntensityEnum? pFlavourIntensity;
    PFinishEnum? pFinish;
    AIntensityEnum? aIntensity;
    AColorEnum? aColor;
    NintensityEnum? nIntensity;
    CQualityEnum? cQuality;
    int? id;
    int? UserId;

    if(json['userid'] != null){
      UserId = json['userid'];
    }
    if (json['note'] != null) {
      note = json['note'];
    }
    if (json['flavourcharacteristics'] != null) {
      flavourcharacteristics = json['flavourcharacteristics'];
    }
    if (json['aromacharacteristics'] != null) {
      aromacharacteristics = json['aromacharacteristics'];
    }
    if (json['id'] != null) {
      id = json['id'];
    }
    if (json["alcohol"] != null) {
      pAlcohol = PAlcoholEnum.values
          .firstWhere((element) => element.name == json["alcohol"]?.toString());
    }
    if (json["acidity"] != null) {
      pAcidity = PAcidityEnum.values
          .firstWhere((element) => element.name == json["acidity"]?.toString());
    }
    if (json["sweetness"] != null) {
      pSweetness = PSweetnessEnum.values.firstWhere(
          (element) => element.name == json["sweetness"]?.toString());
    }
    if (json["tannin"] != null) {
      pTannin = PTanninEnum.values
          .firstWhere((element) => element.name == json["tannin"].toString());
    }
    if (json["body"] != null) {
      pBody = PBodyEnum.values
          .firstWhere((element) => element.name == json["body"].toString());
    }
    if (json["flavourintensity"] != null) {
      pFlavourIntensity = PFlavourIntensityEnum.values.firstWhere(
          (element) => element.name == json["flavourintensity"].toString());
    }
    if (json["finish"] != null) {
      pFinish = PFinishEnum.values
          .firstWhere((element) => element.name == json["finish"].toString());
    }
    if (json["aintensity"] != null) {
      aIntensity = AIntensityEnum.values.firstWhere(
          (element) => element.name == json["aintensity"].toString());
    }
    if (json["acolourintensity"] != null) {
      aColor = AColorEnum.values.firstWhere(
          (element) => element.name == json["acolourintensity"].toString());
    }
    if (json["nintensity"] != null) {
      nIntensity = NintensityEnum.values.firstWhere(
          (element) => element.name == json["nintensity"].toString());
    }
    if (json["quality"] != null) {
      cQuality = CQualityEnum.values
          .firstWhere((element) => element.name == json["quality"].toString());
    }

    return Wset(
      pAlcohol: pAlcohol,
      pAcidity: pAcidity,
      pSweetness: pSweetness,
      pTannin: pTannin,
      pBody: pBody,
      pFlavourIntensity: pFlavourIntensity,
      pFinish: pFinish,
      aIntensity: aIntensity,
      aColor: aColor,
      nIntensity: nIntensity,
      cQuality: cQuality,
      note: note,
      id: id,
      flavourcharacteristics: flavourcharacteristics,
      aromacharacteristics: aromacharacteristics,
      wineId: json['wineid'],
      tastingId: json['tastingid'],
      UserId: UserId,
    );
  }

  Wset({
    this.pAlcohol,
    this.pAcidity,
    this.pSweetness,
    this.pTannin,
    this.pBody,
    this.pFlavourIntensity,
    this.pFinish,
    this.aIntensity,
    this.aColor,
    this.nIntensity,
    this.cQuality,
    this.note,
    this.id,
    this.flavourcharacteristics,
    this.aromacharacteristics,
    this.wineId,
    this.tastingId,
    this.UserId,
  });
}
