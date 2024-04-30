import 'package:appr/models/wine_tasting.dart';
import 'package:flutter/material.dart';

class WinesInTasting extends StatelessWidget {
  const WinesInTasting(this.wineTasting,{super.key});

  final WineTasting wineTasting;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [Text("Wines in Tasting:"),
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
                itemCount: wineTasting.wines!.length,
                itemBuilder: (
                  context,
                  index,
                ) {
                  return Card(
                    child: ListTile(
                      title: Text(wineTasting.wines![index].name),
                      subtitle: wineTasting.visibility == VisibilityEnum.Open
                          ? Text("Open")
                          : Text(
                              "in glass number: ${(index)+1}"),
                      onTap: () {},
                    ),
                  );
                },
              ),
            )],
    );
  }
}