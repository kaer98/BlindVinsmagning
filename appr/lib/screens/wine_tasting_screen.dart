
import 'package:appr/data/dropdownform_wset2.dart';
import 'package:appr/data/dummydata.dart';
import 'package:appr/models/wine_tasting.dart';
import 'package:flutter/material.dart';

class WineTastingScreen extends StatefulWidget {
  const WineTastingScreen(WineTasting wineTasting , {super.key});
  @override
  State<WineTastingScreen> createState() => _WineTastingScreenState();
}

int selectedValue = 1;
List<DropdownMenuItem> items = [
  const DropdownMenuItem(
    value: 1,
    child: Text("1"),
  ),
  const DropdownMenuItem(
    value: 2,
    child: Text("2"),
  ),
  const DropdownMenuItem(
    value: 3,
    child: Text("3"),
  ),
  const DropdownMenuItem(
    value: 4,
    child: Text("4"),
  ),
  const DropdownMenuItem(
    value: 5,
    child: Text("5"),
  ),
];

class _WineTastingScreenState extends State<WineTastingScreen> {
  final WineTasting _wineTasting = wineTasting;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wine Tasting'),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text("Vin nummer"),
              const SizedBox(width: 10,),
              DropdownButton(
                items: items,
                value: selectedValue,
                onChanged: ((value) {
                  setState(() {
                    selectedValue = value as int;
                  });
                }),
                alignment: Alignment.center,
              ),
            ],
          ),
           Text("antal vine: ${_wineTasting.wines!.length}"),
          const Flexible(
            child: Padding(
              padding: EdgeInsets.all(8.0),
              child: WSET2FORM(),
            ),
          ),
          TextFormField(
            minLines: 2,
            maxLines: 5,
            textAlignVertical: TextAlignVertical.bottom,
            style: Theme.of(context)
                .textTheme
                .bodyMedium!
                .copyWith(color: Theme.of(context).colorScheme.onBackground),
            decoration: const InputDecoration(
                labelText: "Notes", filled: true, fillColor: Colors.grey),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text("Save"),
          ),
        ],
      ),
    );
  }
}
