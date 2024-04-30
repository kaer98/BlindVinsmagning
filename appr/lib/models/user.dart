// ignore_for_file: constant_identifier_names

enum Gender {Male,Female}

class User{
  String? fullName;
  Gender? gender;
  DateTime? birthDate;
  String? username;
  int? userId;

  User({this.fullName,this.userId, this.gender, this.birthDate, this.username});

}