import 'dart:convert';

import 'package:appr/data/dummydata.dart';
import 'package:appr/main.dart';
import 'package:appr/models/user.dart';
import 'package:appr/models/wine.dart';
import 'package:appr/models/wine_evaluation.dart';
import 'package:appr/models/wine_tasting.dart';
import 'package:appr/models/wset_eval.dart';
import 'package:appr/screens/wine_tasting_screen.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

class JoinTasting extends StatefulWidget {
  const JoinTasting({super.key});

  @override
  State<JoinTasting> createState() => _JoinTastingState();
}

class _JoinTastingState extends State<JoinTasting> {
  final _formKey = GlobalKey<FormState>();

  var _tastingId;

  void _joinTasting() async {
    final isValid = _formKey.currentState!.validate();
    var appstate = context.read<MyAppState>();
    if (isValid) {
      _formKey.currentState!.save();

      var url =
          Uri.parse("https://vin.jazper.dk/api/tastings/join/$_tastingId");
      var response = await http.get(
        url,
        headers: {
          "Content-Type": "application/json",
          "Cookie": appstate.cookie!
        },
      );
      Map<String, dynamic> jsonMap = json.decode(response.body);
      WineTasting wineTasting = WineTasting(
        visibility: VisibilityEnum.values.firstWhere((element) => element.name == jsonMap["tastingInfo"]['visibility']),
        finished: jsonMap["tastingInfo"]['finished'],
        id: int.parse(_tastingId),
        name: jsonMap["tastingInfo"]['tastingName'],
        host: User(UserId: jsonMap["tastingInfo"]['host']["id"]),
        date: DateTime.parse(jsonMap["tastingInfo"]['date']),
        wines: (jsonMap["tastingInfo"]['wineList'] as List).map((wine) => Wine.fromJson(wine)).toList(),
        wineEvaluation: (jsonMap["tastingInfo"]["evaluations"]as List).map((wineEval) => Wset.fromJson(wineEval)).toList(),
      );
     
      
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => WineTastingScreen(wineTasting),
        ),
      );
   
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Join Tasting'),
        ),
        body: Column(
          children: [
            Form(
              key: _formKey,
              child: TextFormField(
                textAlignVertical: TextAlignVertical.bottom,
                style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                    color: Theme.of(context).colorScheme.onBackground),
                decoration: const InputDecoration(labelText: "Tasting ID"),
                onSaved: (newValue) => _tastingId = newValue,
                validator: (value) => (value == null ||
                        value.isEmpty ||
                        value.trim().length < 1 ||
                        value.trim().length > 5)
                    ? 'Please enter a tasting ID'
                    : null,
              ),
            ),
            ElevatedButton(
              onPressed: () {
                _joinTasting();
                // Navigator.push(
                //   context,
                //   MaterialPageRoute(
                //     builder: (context) => const WineTastingScreen(),
                //   ),
                // );
              },
              child: const Text("Join Tasting"),
            ),
          ],
        ));
  }
}
