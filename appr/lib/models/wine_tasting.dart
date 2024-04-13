import 'package:appr/models/user.dart';
import 'package:appr/models/wine.dart';
import 'package:appr/models/wine_evaluation.dart';

enum VisibilityEnum { blind, semi, open }

class WineTasting {
  int id;
  List<Wine>? wines;
  User host;
  List<User> participents;
  VisibilityEnum? visibility;
  WineEvaluation wineEvaluation;
  DateTime date;
  Wine winner;
  bool finished;

  WineTasting({
    required this.id,
    required this.wines,
    required this.host,
    required this.participents,
    required this.visibility,
    required this.wineEvaluation,
    required this.date,
    required this.winner,
    required this.finished,
  });
}
