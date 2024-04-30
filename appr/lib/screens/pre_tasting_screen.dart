import 'package:appr/main.dart';
import 'package:appr/models/wine_tasting.dart';
import 'package:appr/screens/wine_tasting_screen.dart';
import 'package:appr/widgets/wines_in_tasting.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class PreTastingScreen extends StatelessWidget {
  const PreTastingScreen(this.wineTasting, {super.key});

  final WineTasting wineTasting;

  @override
  Widget build(BuildContext context) {
    var appState = context.read<MyAppState>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Pre Tasting'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text("CODE: ${wineTasting.id}"),
            const SizedBox(
              height: 20,
            ),
            wineTasting.visibility == VisibilityEnum.Blind &&
                    wineTasting.host?.userId != appState.userId
                ? const Text("This is a blind tasting")
                : WinesInTasting(wineTasting, appState.userId!),
            const SizedBox(
              height: 20,
              width: 20,
            ),
            const Text("Participating in this wine tasting:"),
            Container(
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.black,
                ),
              ),
              height: 250,
              child: ListView.builder(
                scrollDirection: Axis.vertical,
                shrinkWrap: true,
                itemCount: wineTasting.participents!.length,
                itemBuilder: (
                  context,
                  index,
                ) {
                  return Card(
                    child: ListTile(
                      title:
                          Text("${wineTasting.participents![index].fullName}"),
                      onTap: () {},
                    ),
                  );
                },
              ),
            ),
            ElevatedButton(
                onPressed: () {
                  Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => WineTastingScreen(wineTasting)));
                },
                child: const Text("Start Tasting")),
          ],
        ),
      ),
    );
  }
}
