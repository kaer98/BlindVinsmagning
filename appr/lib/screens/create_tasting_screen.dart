import 'dart:convert';

import 'package:appr/main.dart';
import 'package:appr/models/wine.dart';
import 'package:appr/screens/create_wine.dart';
import 'package:flutter/material.dart';
import 'package:list_picker/list_picker.dart';
import "package:intl/intl.dart";
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

final formatter = DateFormat("E-dd-MM-yyyy");

class CreateTastingScreen extends StatefulWidget {
  const CreateTastingScreen({super.key});

  @override
  State<CreateTastingScreen> createState() => _CreateTastingScreenState();
}

class _CreateTastingScreenState extends State<CreateTastingScreen> {
  int _amountOfWines = 1;
   List<Wine>? _wineList;
   bool _isLoading = true;

void getWines() async {
    var appState = context.read<MyAppState>();
    var url = Uri.parse("https://vin.jazper.dk/api/wines");
    var response = await http.get(url, headers: {"Cookie": appState.cookie!});
    if (response.statusCode == 200) {
      List<dynamic> jsonMap = json.decode(response.body);
      List<Wine> wines = [];
      for (var wine in jsonMap) {
        wines.add(Wine.fromJson(wine));
      }
      _wineList = wines;
      setState(() {
        _isLoading = false;
      });
    }
  }

  var _selectedWines = [];
  DateTime? _selectedDate;
  final wineController = TextEditingController();
  Map<String, TextEditingController> _wineControllers = {};

  void _openCreateWineOverLay() {
    showModalBottomSheet(
      constraints: BoxConstraints(
        maxHeight: MediaQuery.of(context).size.height,
        maxWidth: MediaQuery.of(context).size.width,
      ),
      useSafeArea: true,
      isScrollControlled: true,
      context: context,
      builder: (ctx) => const CreateWineScreen(),
    );
  }

  void _precentDatePicker() async {
    final now = DateTime.now();
    final pickedDate = await showDatePicker(
      context: context,
      initialDate: now,
      firstDate: DateTime(now.year - 1, now.month, now.day),
      lastDate: DateTime(now.year + 1, now.month, now.day),
    );
    setState(() {
      _selectedDate = pickedDate;
    });
  }

  List<DropdownMenuItem> _getDropDownMenuItems(List<String> e) {
    final List<DropdownMenuItem> items = [];
    for (var value in e) {
      items.add(DropdownMenuItem(
        value: value,
        child: Center(
            child: Text(
          value,
          textAlign: TextAlign.center,
        )),
      ));
    }
    return items;
  }

  @override
  void initState() {
    super.initState();
    getWines();
    
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Center(
        child: CircularProgressIndicator(),
      );
    }
    return Scaffold(
      appBar: AppBar(
        title: const Text('Create Tasting'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(50, 8, 50, 8),
            child: TextFormField(
              decoration: const InputDecoration(labelText: "Titel"),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(150, 8, 150, 8),
            child: TextFormField(
              decoration: const InputDecoration(labelText: "Antal vine"),
              initialValue: "1",
              keyboardType: TextInputType.number,
              maxLength: 2,
              maxLines: 1,
              onChanged: (value) {
                if (value.isEmpty) {
                  _amountOfWines = 0;
                  return;
                }
                if (int.tryParse(value) != null) {
                  _amountOfWines = int.parse(value);
                  setState(() {});
                }
              },
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _amountOfWines,
              itemBuilder: (BuildContext context, int index) {
                return ListTile(
                  title: ListPickerField(
                    
                    label: "wine number ${index + 1}",
                    items: _wineList!.map((e) => e.toString()).toList(),
                    controller: _wineControllers.putIfAbsent(
                        index.toString(), () => TextEditingController()),


                  ),
                );
              },
            ),
          ),
          Container(
            alignment: Alignment.centerRight,
            child: ElevatedButton(
              onPressed: _openCreateWineOverLay,
              child: const Text("Opret Vin"),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: DropdownButtonFormField(
              items: _getDropDownMenuItems(["blind", "semiblind", "åben"]),
              onChanged: (onChanged) {},
              decoration: const InputDecoration(
                labelText: "Type af smagning",
                hintText: "Vine",
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: DropdownButtonFormField(
              items: _getDropDownMenuItems(["Wset", "WSET2", "WSET3"]),
              onChanged: (onChanged) {},
              decoration: const InputDecoration(
                labelText: "EvalueringsModel",
                hintText: "Vine",
              ),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                _selectedDate == null
                    ? "No Date Chosen"
                    : formatter.format(_selectedDate!),
              ),
              IconButton(
                onPressed: _precentDatePicker,
                icon: Icon(
                  
                  Icons.date_range,
                  color: Theme.of(context).colorScheme.primary
                ),
              ),
            ],
          ),
          ElevatedButton(
            onPressed: () {
              for (var ctl in _wineControllers.values) {
                print(ctl.text);
                print(ctl.value);

              }
            },
            child: const Text("Opret Smagning"),
          ),
        ],
      ),
    );
  }
}
