import 'package:appr/main.dart';
import 'package:appr/models/user.dart';
import 'package:appr/models/wine.dart';
import 'package:appr/models/wset_eval.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'dart:convert';

class OverViewScreen extends StatefulWidget {
  const OverViewScreen(this.TastingId, {super.key});
  final int TastingId;
  @override
  State<OverViewScreen> createState() => _OverViewScreenState();
}

class _OverViewScreenState extends State<OverViewScreen> {
  List<Wset> wset = [];
  List<User> users = [];
  List<Wine> wines = [];
  var _isUsersLoading = true;
  var _isWinesLoading = true;
  var _isTastingLoading = true;

  void GetUsers() {
    var appstate = context.read<MyAppState>();
    var url = Uri.parse("https://vin.jazper.dk/api/users");
    http.get(
      url,
      headers: {"Content-Type": "application/json", "Cookie": appstate.cookie!},
    ).then((response) {
      List<dynamic> jsonMap = json.decode(response.body);
      var users1 = <User>[];
      for (var user in jsonMap) {
        users1.add(User(
            fullName: user["fullname"],
            username: user["username"],
            UserId: user["userid"]));
      }
      setState(() {
        users = users1;
        _isUsersLoading = false;
      });
      print(jsonMap);
    });
  }

  void GetWines() {
    var appstate = context.read<MyAppState>();
    var url = Uri.parse("https://vin.jazper.dk/api/wines");
    var response = http.get(
      url,
      headers: {"Content-Type": "application/json", "Cookie": appstate.cookie!},
    ).then((response) {
      List<dynamic> jsonMap = json.decode(response.body);
      var wines1= <Wine>[];
      for (var wine in jsonMap) {
        wines1.add(Wine.fromJson(wine));
      }
      setState(() {
        wines = wines1;
        _isWinesLoading = false;
      
      });
    });
  }

  void GetTastinginfo() async {
    var appstate = context.read<MyAppState>();
    var url = Uri.parse(
        "https://vin.jazper.dk/api/evaluations/tasting/${widget.TastingId}");

    var response = await http.get(
      url,
      headers: {"Content-Type": "application/json", "Cookie": appstate.cookie!},
    );
    List<dynamic> jsonMap = json.decode(response.body);
    setState(() {
      _isTastingLoading = false;
      wset = jsonMap.map((e) => Wset.fromJson(e)).toList();
    });
    print(response.body);
  }

  @override
  void initState() {
    GetTastinginfo();
    GetUsers();
    GetWines();
    super.initState();
  }
 @override
  void dispose() {
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    if (_isTastingLoading || _isUsersLoading || _isWinesLoading) {
      return const Center(
        child: CircularProgressIndicator(),
      );
    }
    return Scaffold(
      appBar: AppBar(
        title: const Text("Tasting Overview"),
      ),
      body: ListView.builder(
        itemCount: wset.length,
        itemBuilder: (context, index) => Card(
          child: ListTile(
            title: Text(users
                    .firstWhere(
                        (element) => element.UserId == wset[index].UserId)
                    .fullName! +
                " vin:" +
                wines
                    .firstWhere((element) => element.id == wset[index].wineId)
                    .name),
            subtitle: Text(wset[index].completenessPercentage.toString() + "%"),
          ),
        ),
      ),
    );
  }
}
