import 'dart:math';

import 'package:appr/main.dart';
import 'package:appr/screens/main_menu.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'dart:convert';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

enum Gender { MALE, FEMALE }

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  DateTime? _selectedDate;
  final formatter = DateFormat("dd-MM-yyyy");
  var gender;
  var _username;
  var _password;
  var _confirmPassword;
  var _fullName;

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

  

  void _register() async {
    ScaffoldMessenger.of(context).clearSnackBars();
    final isValid = _formKey.currentState!.validate();
    var appstate = context.read<MyAppState>();
    if (_password == _confirmPassword) {
      if (isValid && _selectedDate != null) {

        _formKey.currentState!.save();
        var url = Uri.parse("https://vin.jazper.dk/api/auth/signup");
        var response = await http.post(url,
            headers: {"Content-Type": "application/json"},
            body: json.encode({
              "fullName": _fullName,
              "birthday": _selectedDate.toString(),
              "gender":gender,
              "username": _username,
              "password": _password,
              "confirmPassword": _confirmPassword,
            }));
            appstate.userId = json.decode(response.body)['id'];
            appstate.cookie = response.headers['set-cookie'];
            Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) {
              return const MainMenu();
            }));
      }
      
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Passwords do not match"),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Register'),
      ),
      body: ListView(
        children: [
          Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                TextFormField(
                  textAlignVertical: TextAlignVertical.bottom,
                  decoration: const InputDecoration(labelText: "Full Name"),
                  onSaved: (value) => _fullName = value.toString(),
                  validator: (value) => (value == null ||
                          value.isEmpty ||
                          value.trim().length <= 1 ||
                          value.trim().length > 50)
                      ? 'Please enter a name'
                      : null,
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
                      icon: Icon(
                        Icons.date_range,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                  ],
                ),
                TextFormField(
                  textAlignVertical: TextAlignVertical.bottom,
                  decoration: const InputDecoration(labelText: "Username"),
                  onSaved: (value) => _username = value,
                  validator: (value) => (value == null ||
                          value.isEmpty ||
                          value.trim().length <= 1 ||
                          value.trim().length > 50)
                      ? 'Please enter a Username'
                      : null,
                ),
                TextFormField(
                  textAlignVertical: TextAlignVertical.bottom,
                  decoration: const InputDecoration(labelText: "Password"),
                  onSaved: (value) => _password = value,
                  validator: (value) => (value == null ||
                          value.isEmpty ||
                          value.trim().length <= 1 ||
                          value.trim().length > 50)
                      ? 'Please enter a password'
                      : null,
                ),
                TextFormField(
                  textAlignVertical: TextAlignVertical.bottom,
                  decoration:
                      const InputDecoration(labelText: "Confirm Password"),
                  onSaved: (value) => _confirmPassword = value,
                  validator: (value) => (value == null ||
                          value.isEmpty ||
                          value.trim().length <= 1 ||
                          value.trim().length > 50)
                      ? 'Please enter a password again'
                      : null,
                ),
                DropdownButtonFormField(
                  items: _getDropDownMenuItems(
                      Gender.values.map((e) => e.name).toList()),
                  onChanged: ((value) {
                    gender = value;
                  }),
                  isExpanded: true,
                  validator: (value) =>
                      value == null ? "Please select gender" : null,
                ),
                ElevatedButton(
                  onPressed: () {
                    _register();
                  },
                  child: const Text("register"),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
