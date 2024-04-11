import 'package:appr/models/evaluation.dart';
import 'package:appr/models/wine.dart';

enum Winevisenum { blind, semi, open }

class Winetast {
Wine wine;
String host, participents;
Winevisenum? winevis; 
Evaluation evaluation;
DateTime date;
bool status;

 

 Winetast({
   required this.wine,
   required this.date,
   required this.winevis,
   required this.host,
   required this.participents,
   required this.evaluation,
   required this.status,
 });
}