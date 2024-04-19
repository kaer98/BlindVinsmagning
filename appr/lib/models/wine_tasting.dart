import 'package:appr/models/user.dart';
import 'package:appr/models/wine.dart';
import 'package:appr/models/wine_evaluation.dart';

enum VisibilityEnum { blind, semi, open }

class WineTasting {
  int id;
  String name;
  List<Wine>? wines;
  User? host;
  List<User>? participents;
  VisibilityEnum? visibility;
  List<WineEvaluation>? wineEvaluation;
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
