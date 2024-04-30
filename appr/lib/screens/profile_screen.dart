import 'dart:convert';

import 'package:appr/main.dart';
import 'package:appr/models/wine_tasting.dart';
import 'package:appr/screens/history_screen.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final formatter = DateFormat("dd-MM-yyyy");
  final _emailController = TextEditingController();
  final _nameController = TextEditingController();
  List<WineTasting> wineTasting = [];

  DateTime? _selectedDate;
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

  void getProfile() async {
    var appState = context.read<MyAppState>();
    var url = Uri.parse("https://vin.jazper.dk/api/users/${appState.userId}");
    var response = await http.get(url, headers: {"Cookie": appState.cookie!});
    if (response.statusCode == 200) {
      Map<String, dynamic> jsonMap = json.decode(response.body);
      setState(() {
        _nameController.text = jsonMap['fullname'];
        _selectedDate = DateTime.parse(jsonMap['birthday']);
        _emailController.text = jsonMap['username'];
      });
    }
  }

  void getTastings() async {
    var appState = context.read<MyAppState>();
    var url = Uri.parse(
        "https://vin.jazper.dk/api/tastings?userJoinedId=${appState.userId}");
    var response = await http.get(url, headers: {"Cookie": appState.cookie!});
    if (response.statusCode == 200) {
      List<dynamic> jsonMap = json.decode(response.body);
      List<WineTasting> tastings = [];
      for (var tasting in jsonMap) {
        tastings.add(WineTasting(
            id: tasting["id"],
            name: tasting["name"],
            wines: null,
            visibility: VisibilityEnum.values.firstWhere(
                (element) => element.name == tasting["visibility"].toString()),
            date: DateTime.parse(tasting["date"]),
            finished: tasting["finished"],
         ));
            
      }
      appState.wineTastings = tastings;
      wineTasting = tastings;
    }
  }

  @override
  void initState() {
    getProfile();
    getTastings();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(8, 8, 90, 8),
            child: TextFormField(
              decoration: const InputDecoration(label: Text("navn")),
              controller: _nameController,
              maxLength: 50,
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const Text("Birthday: "),
              Text(
                _selectedDate == null
                    ? "No Date Chosen"
                    : formatter.format(_selectedDate!),
              ),
              IconButton(
                onPressed: _precentDatePicker,
                icon:  Icon(
                  Icons.date_range,
                  color: Theme.of(context).colorScheme.primary,
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(8, 8, 90, 8),
            child: TextFormField(
              decoration: const InputDecoration(label: Text("email")),
              controller: _emailController,
            ),
          ),
          ElevatedButton(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return HistoryScreen(
                    history: false,
                    wineTastings: wineTasting,
                  );
                }));
              },
              child: const Text("Plans")),
          ElevatedButton(
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return HistoryScreen(
                    history: true,
                    wineTastings: wineTasting,
                  );
                }));
              },
              child: const Text("History")),
          ElevatedButton(onPressed: () {}, child: const Text("Save")),
          ElevatedButton(onPressed: () {}, child: const Text("Cancel")),
        ],
      ),
    );
  }
}
