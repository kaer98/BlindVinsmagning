enum Gender {Male,Female}

class User{
  String? fullName;
  Gender? gender;
  DateTime? birthDate;
  String? username;
  int? UserId;

  User({this.fullName,this.UserId, this.gender, this.birthDate, this.username});

}