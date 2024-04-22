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
   final _formKey = GlobalKey<FormState>();
    var _name;
  var _selectedWines = [];
  DateTime? _selectedDate;
  final wineController = TextEditingController();
  Map<String, TextEditingController> _wineControllers = {};
  var _visability;


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
      
      setState(() {
        _isLoading = false;
        _wineList = wines;
      });
    }
  }



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


  void _createTasting() async {
    ScaffoldMessenger.of(context).clearSnackBars();
    final isValid = _formKey.currentState!.validate();
    var appstate = context.read<MyAppState>();
    if (isValid) {
      
      _formKey.currentState!.save();
      for(var ctl in _wineControllers.values) {
        _selectedWines.add(int.parse(ctl.text.split("%").elementAt(1).split("\n").elementAt(1)));
        }
      
     
      var url = Uri.parse("https://vin.jazper.dk/api/tastings");
      var response = await http.post(url,
          headers: {"Content-Type": "application/json",
          "Cookie": appstate.cookie!},
          body: json.encode({
            "name": _name,
            "visibility": _visability,
            "date": _selectedDate.toString(),
            "wines":_selectedWines,
          }));
      Navigator.pop(context);
      print(response.body);
    }
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
      body: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(50, 8, 50, 8),
              child: TextFormField(
                decoration: const InputDecoration(labelText: "Titel"),
                validator: (value) => (value == null ||
                        value.isEmpty ||
                        value.trim().length <= 1 ||
                        value.trim().length > 50)
                    ? 'Please enter a title'
                    : null,
                    onSaved: (newValue) => _name = newValue,
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
                items: _getDropDownMenuItems(["Blind", "Semiblind", "Open"]),
                onChanged: (onChanged) {},
                onSaved: (newValue) => _visability = newValue,

                validator: (value) => (value == null ||
                        value.isEmpty ||
                        value.trim().length <= 1 ||
                        value.trim().length > 50)
                    ? 'Please enter a type'
                    : null,
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
                _createTasting();
              },
              child: const Text("Opret Smagning"),
            ),
          ],
        ),
      ),
    );
  }
}
