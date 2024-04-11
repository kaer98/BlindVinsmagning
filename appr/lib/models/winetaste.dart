import 'package:appr/models/evaluation.dart';
import 'package:appr/models/wine.dart';

class Winetaste {
String user;
Wine wine; 
Evaluation evaluation;

 Winetaste({
   required this.wine,
   required this.evaluation,
   required this.user,
 });
}
