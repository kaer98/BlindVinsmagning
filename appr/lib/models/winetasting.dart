enum Vis {
  blind,
  semi,
  open,
}

extension VisExtension on Vis{
   String? get visb {
  switch (this) {
  case Vis.blind:
   return "blind";
  case Vis.semi:
   return "semi";
  case Vis.open:
   return "open";
  default:
   return null;
}
}
}

class Winetast {

String wine, visb, host, participents, evaluation; 
DateTime date;
bool status;

 

 Winetast({
   required this.wine,
   required this.visb,
   required this.date,
   required this.host,
   required this.participents,
   required this.evaluation,
   required this.status,
 });
}