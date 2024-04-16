import 'package:appj1/models/evaluation.dart';
import 'package:appj1/models/wine.dart';

class WineEvaluation {
String user;
Wine wine; 
Evaluation evaluation;

 WineEvaluation({
   required this.wine,
   required this.evaluation,
   required this.user,
 });
}
