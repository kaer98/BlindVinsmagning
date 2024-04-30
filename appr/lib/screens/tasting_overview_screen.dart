import 'package:appr/main.dart';
import 'package:appr/models/user.dart';
import 'package:appr/models/wine.dart';
import 'package:appr/models/wset_eval.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'dart:convert';

class OverViewScreen extends StatefulWidget {
  const OverViewScreen(this.tastingId, {super.key});
  final int tastingId;
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

  void _getUsers() {
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
            userId: user["userid"]));
      }
      setState(() {
        users = users1;
        _isUsersLoading = false;
      });
    });
  }

  void _getWines() {
    var appstate = context.read<MyAppState>();
    var url = Uri.parse("https://vin.jazper.dk/api/wines");
    http.get(
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

  void _getTastingInfo() async {
    var appstate = context.read<MyAppState>();
    var url = Uri.parse(
        "https://vin.jazper.dk/api/evaluations/tasting/${widget.tastingId}");

    var response = await http.get(
      url,
      headers: {"Content-Type": "application/json", "Cookie": appstate.cookie!},
    );
    List<dynamic> jsonMap = json.decode(response.body);
    setState(() {
      _isTastingLoading = false;
      wset = jsonMap.map((e) => Wset.fromJson(e)).toList();
    });
  }

  @override
  void initState() {
    _getTastingInfo();
    _getUsers();
    _getWines();
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
            title: Text("${users
                    .firstWhere(
                        (element) => element.userId == wset[index].UserId)
                    .fullName!} vin:${wines
                    .firstWhere((element) => element.id == wset[index].wineId)
                    .name}"),
            subtitle: Text("${wset[index].completenessPercentage}%"),
          ),
        ),
      ),
    );
  }
}
