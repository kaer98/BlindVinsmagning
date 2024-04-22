import 'package:appr/models/evaluation.dart';
import 'package:appr/models/wine_evaluation.dart';

enum PAlcoholEnum { Low, Medium, High }

enum PAcidityEnum { Low, Medium, High }

enum PSweetnessEnum { Dry, OffDry, Medium, Sweet }

enum PTanninEnum { Low, Medium, High }

enum PBodyEnum { Light, Medium, Full }

enum PFlavorIntensityEnum { Light, Medium, Pronounced }

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

class Wset{
  @override
  String name = 'WSET level 2 Evaluation';
  @override
  String? note;
  String? flavourcharacteristics;
  String? aromacharacteristics;
  PAlcoholEnum? pAlcohol;
  PAcidityEnum? pAcidity;
  PSweetnessEnum? pSweetness;
  PTanninEnum? pTannin;
  PBodyEnum? pBody;
  PFlavorIntensityEnum? pFlavorIntensity;
  PFinishEnum? pFinish;
  AIntensityEnum? aIntensity;
  AColorEnum? aColor;
  NintensityEnum? nIntensity;
  CQualityEnum? cQuality;
  int? id;
  int? wineId;
  int? tastingId;

  factory Wset.fromJson(Map<String, dynamic> json) {


String? note;
  String? flavourcharacteristics;
  String? aromacharacteristics;
  PAlcoholEnum? pAlcohol;
  PAcidityEnum? pAcidity;
  PSweetnessEnum? pSweetness;
  PTanninEnum? pTannin;
  PBodyEnum? pBody;
  PFlavorIntensityEnum? pFlavorIntensity;
  PFinishEnum? pFinish;
  AIntensityEnum? aIntensity;
  AColorEnum? aColor;
  NintensityEnum? nIntensity;
  CQualityEnum? cQuality;
  int? id;
  int? wineId;
  int? tastingId;

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
  if(json["alcohol"]!=null){
    pAlcohol = PAlcoholEnum.values.firstWhere((element) => element.name==json["alcohol"]?.toString());
  }
  if(json["acidity"]!=null){
    pAcidity = PAcidityEnum.values.firstWhere((element) => element.name==json["acidity"]?.toString());
  }
  if(json["sweetness"]!=null){
    pSweetness = PSweetnessEnum.values.firstWhere((element) => element.name==json["sweetness"]?.toString());
  }
  if(json["tannin"]!=null){
    pTannin = PTanninEnum.values.firstWhere((element) => element.name==json["tannin"].toString());
  }
  if(json["body"]!=null){
    pBody = PBodyEnum.values.firstWhere((element) => element.name==json["body"].toString());
  }
  if(json["flavorintensity"]!=null){
    pFlavorIntensity = PFlavorIntensityEnum.values.firstWhere((element) => element.name==json["flavorintensity"].toString());
  }
  if(json["finish"]!=null){
    pFinish = PFinishEnum.values.firstWhere((element) => element.name==json["finish"].toString());
  }
  if(json["aintensity"]!=null){
    aIntensity = AIntensityEnum.values.firstWhere((element) => element.name==json["aintensity"].toString());
  }
  if(json["acolourintensity"]!=null){
    aColor = AColorEnum.values.firstWhere((element) => element.name==json["acolourintensity"].toString());
  }
  if(json["nintensity"]!=null){
    nIntensity = NintensityEnum.values.firstWhere((element) => element.name==json["nintensity"].toString());
  }
  if(json["quality"]!=null){
    cQuality = CQualityEnum.values.firstWhere((element) => element.name==json["quality"].toString());
  }



    return Wset(

      pAlcohol: pAlcohol,
      pAcidity: pAcidity,
      pSweetness: pSweetness,
      pTannin: pTannin,
      pBody: pBody,
      pFlavorIntensity: pFlavorIntensity,
      pFinish: pFinish,
      aIntensity: aIntensity,
      aColor: aColor,
      nIntensity: nIntensity,
      cQuality: cQuality,
      note: note,
      id:id,
      flavourcharacteristics: flavourcharacteristics,
      aromacharacteristics: aromacharacteristics,
      wineId: json['wineid'],
      tastingId: json['tastingid'],
    );
  }

  Wset({
    this.pAlcohol,
    this.pAcidity,
    this.pSweetness,
    this.pTannin,
    this.pBody,
    this.pFlavorIntensity,
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

    
  });
}
