import 'dart:convert';

import 'package:appr/main.dart';
import 'package:appr/models/wine.dart';
import 'package:appr/models/wine_tasting.dart';
import 'package:appr/models/wset_eval.dart';
import 'package:appr/screens/results_screen.dart';
import 'package:appr/screens/wine_tasting_screen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

class HistoryScreen extends StatefulWidget {
  HistoryScreen({required this.history, required this.wineTastings, super.key});

  final bool history;
  final List<WineTasting> wineTastings;

  @override
  State<HistoryScreen> createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {

  void getTastingById(int id) async {
    var appstate = context.read<MyAppState>();
    var url = Uri.parse("https://vin.jazper.dk/api/tastings/join/$id");
    var response = await http.get(
      url,
      headers: {"Content-Type": "application/json", "Cookie": appstate.cookie!},
    );
    Map<String, dynamic> jsonMap = json.decode(response.body);
    WineTasting wineTasting = WineTasting(
      visibility: VisibilityEnum.values.firstWhere(
          (element) => element.name == jsonMap["tastingInfo"]['visibility']),
      finished: jsonMap["tastingInfo"]['finished'],
      id: int.parse(id.toString()),
      name: jsonMap["tastingInfo"]['tastingName'],
      date: DateTime.parse(jsonMap["tastingInfo"]['date']),
      wines: (jsonMap["tastingInfo"]['wineList'] as List)
          .map((wine) => Wine.fromJson(wine))
          .toList(),
      wineEvaluation: (jsonMap["tastingInfo"]["evaluations"] as List)
          .map((wineEval) => Wset.fromJson(wineEval))
          .toList(),
    );widget.history?
     Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => ResultScreen(wineTasting),
        ),
      ):Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => WineTastingScreen(wineTasting),
      ));
   
  }

  @override
  Widget build(BuildContext context) {
    List<WineTasting> _futureWineTastings = widget.wineTastings
        .where((element) => element.date.isAfter(DateTime.now()))
        .toList();
    List<WineTasting> _pastWineTastings = widget.wineTastings
        .where((element) => element.date.isBefore(DateTime.now()))
        .toList();
    return Scaffold(
        appBar: AppBar(
          title: widget.history ? const Text('History') : const Text("Plans"),
        ),
        body: widget.history
            ? ListView.builder(
                itemCount: _pastWineTastings.length,
                itemBuilder: (context, index) {
                  return Card(
                    child: ListTile(
                      title: Text(_pastWineTastings[index].name),
                      subtitle: Text(
                        _pastWineTastings[index].date.toString(),
                      ),
                      onTap: () => {
                        getTastingById(_pastWineTastings[index].id),
                        
                      },
                    ),
                  );
                },
              )
            : ListView.builder(
                itemCount: _futureWineTastings.length,
                itemBuilder: (context, index) {
                  return Card(
                    child: ListTile(
                      title: Text(_futureWineTastings[index].name),
                      subtitle: Text(
                        _futureWineTastings[index].date.toString(),
                      ),
                      onTap: () => {
                        getTastingById(_futureWineTastings[index].id),
                    
                       
                      },
                    ),
                  );
                },
              ));
  }
}
