import 'package:appr/models/wine_tasting.dart';
import 'package:appr/screens/wine_tasting_screen.dart';
import 'package:flutter/material.dart';

class ResultScreen extends StatelessWidget {
  const ResultScreen(this.wineTastings,{super.key});

  final WineTasting wineTastings;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Result'),
      ),
      body: ListView.builder(
        itemCount: wineTastings.wineEvaluation!.length,
        itemBuilder: (BuildContext context, int index) {
          return Card(
            child: ListTile(
              title: wineTastings.finished?Text(wineTastings.wines!.where((element) => element.id == wineTastings.wineEvaluation![index].wineId).first.name):Text("Wine: ${(index+1).toString()}"),
              subtitle: Text("${wineTastings.wineEvaluation![index].stars} stars"),
              onTap: () => {Navigator.of(context).push(MaterialPageRoute(builder: (context) {
                return WineTastingScreen(wineTastings);
              }))},
            ),
          );
        },
      ),
    );
  }
}
