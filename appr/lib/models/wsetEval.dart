import 'package:appr/models/evaluation.dart';

enum PAlcoholEnum { low, medium, high }
enum PAcidityEnum { low, medium, high }
enum PSweetnessEnum { dry,offDry, medium, sweet }
enum PTanninEnum { low, medium, high }
enum PBodyEnum { light, medium, full }
enum PFlavorIntensityEnum { light, medium, pronounced }
enum PFinishEnum { short, medium, long }
enum AIntensityEnum { pale, medium, deep }
enum AColorEnum {lemon,gold,amber, pink, pinkOrange, orange, purple, ruby, garnet, tawny}
enum NintensityEnum { light, medium, pronounced }
enum CQualityEnum { poor, acceptable, good, veryGood, outstanding }



class Wset extends Evaluation {
  @override
  String name = 'WSET level 2 Evaluation';
  String? note;
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



  Wset({required this.name, required this.note}) : super(name: name, note: note);
}