import 'package:appr/models/evaluation.dart';
import 'package:appr/models/user.dart';
import 'package:appr/models/wine.dart';

class WineEvaluation {
User user;
Wine wine; 
Evaluation evaluation;

 WineEvaluation({
   required this.wine,
   required this.evaluation,
   required this.user,
 });
}
