import 'package:appr/models/evaluation.dart';
import 'package:appr/models/wine.dart';

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
