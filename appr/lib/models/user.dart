enum Gender {MALE,FEMALE}

class User{
  String fullName;
  Gender gender;
  DateTime birthDate;
  String username;

  User({required this.fullName, required this.gender, required this.birthDate, required this.username});

}