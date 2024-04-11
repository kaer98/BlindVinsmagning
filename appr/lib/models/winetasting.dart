import 'package:appr/models/evaluation.dart';

enum Visenum { blind, semi, open }

class Winetast {
String wine, host, participents, evaluation;
Visenum? vis; 
DateTime date;
bool status;

 

 Winetast({
   required this.wine,
   required this.date,
   required this.vis,
   required this.host,
   required this.participents,
   required this.evaluation,
   required this.status,
 });
}