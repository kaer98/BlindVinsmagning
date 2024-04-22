import 'package:appr/models/user.dart';
import 'package:appr/models/wine.dart';
import 'package:appr/models/wine_evaluation.dart';
import 'package:appr/models/wine_tasting.dart';
import 'package:appr/models/wset_eval.dart';

Wset wset = Wset(
  pAlcohol: PAlcoholEnum.Medium,
  pAcidity: PAcidityEnum.Medium,
  pSweetness: PSweetnessEnum.Medium,
  pTannin: PTanninEnum.Medium,
  pBody: PBodyEnum.Medium,
  pFlavorIntensity: PFlavorIntensityEnum.Medium,
  pFinish: PFinishEnum.Medium,
  aIntensity: AIntensityEnum.Medium,
  aColor: AColorEnum.Gold,
  nIntensity: NintensityEnum.Medium,
  cQuality: CQualityEnum.Good,
  note: "This is a note",
);

Wine wine = Wine(
  id: 1,
  name: "Wine",
  producer: "Producer",
  country: "Country",
  region: "Region",
  prodYear: DateTime.now(),
  grape: "Grape",
  type: "Type",
  currency: "Currency",
  price: 22.2,
  alcohol: 22.2,
);
User user = User(
    fullName: "poul jense",
    gender: Gender.MALE,
    birthDate: DateTime.now(),
    username: "username");


User user2 = User(
    fullName: "jens",
    birthDate: DateTime.now(),
    gender: Gender.MALE,
    username: "username2");

 WineTasting wineTasting = WineTasting(
  id: 1,
  name: "WineTasting test",
  wines: [wine],
  host: user,
  participents: [user, user2],
  visibility: VisibilityEnum.Blind,
  wineEvaluation: [],
  date: DateTime.now(),
  winner: wine,
  finished: false,
);
