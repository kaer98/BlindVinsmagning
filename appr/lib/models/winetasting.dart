import 'package:appr/models/evaluation.dart';
import 'package:appr/models/wine.dart';

enum Visibilityenum { blind, semi, open }

class Winetast {
Wine wine;
String host, participents;
Visibilityenum? visibility; 
Evaluation evaluation;
DateTime date;
bool status;

 

 Winetast({
   required this.wine,
   required this.date,
   required this.visibility,
   required this.host,
   required this.participents,
   required this.evaluation,
   required this.status,
 });
}