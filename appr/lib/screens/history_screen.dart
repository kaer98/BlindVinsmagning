import 'package:appr/models/wine_tasting.dart';
import 'package:flutter/material.dart';
import 'package:appr/data/dummydata.dart';

class HistoryScreen extends StatelessWidget {
 HistoryScreen({required this.history, super.key});

  final bool history;
  final List<WineTasting> _wineTastings = [wineTasting];



  

  @override
  Widget build(BuildContext context) {
    List<WineTasting> _futureWineTastings =
      _wineTastings.where((element) => element.date.isAfter(DateTime.now())).toList();
    return Scaffold(
        appBar: AppBar(
          title: history? const Text('History'):const Text("Plans"),
        ),
        body: history ?ListView.builder(
          itemCount: _wineTastings.length,
          itemBuilder: (context, index) {
            return Card(
              child: ListTile(
                title: Text(_wineTastings[index].name),
                subtitle: Text(
                  _wineTastings[index].date.toString(),
                ),
                onTap: () => {},
              ),
            );
          },
        ):ListView.builder(
          itemCount: _futureWineTastings.length,
          itemBuilder: (context, index) {
            return Card(
              child: ListTile(
                title: Text(_futureWineTastings[index].name),
                subtitle: Text(
                  _futureWineTastings[index].date.toString(),
                ),
                onTap: () => {},
              ),
            );
          },
        ));
  }
}
