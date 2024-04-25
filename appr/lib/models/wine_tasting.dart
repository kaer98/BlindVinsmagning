import 'package:appr/models/evaluation.dart';
import 'package:appr/models/user.dart';
import 'package:appr/models/wine.dart';
import 'package:appr/models/wset_eval.dart';

 // ignore: constant_identifier_names
 enum VisibilityEnum { Blind, SemiBlind, Open }

class WineTasting {
  int id;
  String name;
  List<Wine>? wines;
  User? host;
  List<User>? participents;
  VisibilityEnum? visibility;
  List<Wset>? wineEvaluation;
  DateTime date;
  Wine? winner;
  bool finished;

  WineTasting({
    required this.id,
    required this.name,
    required this.wines,
     this.host,
     this.participents,
    required this.visibility,
     this.wineEvaluation,
    required this.date,
     this.winner,
    required this.finished,
  });
}
