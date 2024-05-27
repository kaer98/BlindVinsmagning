import 'package:appr/main.dart';
import 'package:appr/screens/main_menu.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import 'dart:convert';

class RegisterAnonScreen extends StatefulWidget {
   const RegisterAnonScreen({super.key});

  @override
  State<RegisterAnonScreen> createState() => _RegisterAnonScreenState();
}

class _RegisterAnonScreenState extends State<RegisterAnonScreen> {
  final _formKey = GlobalKey<FormState>();

  var username;

  void _registerFailedSnackBar() {
    ScaffoldMessenger.of(context).clearSnackBars();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text("Register failed"),
      ),
    );
  }

  void _register() async {
    final isValid = _formKey.currentState!.validate();
    var appstate = context.read<MyAppState>();
    
      if (isValid ) {

        _formKey.currentState!.save();
        var url = Uri.parse("https://vin.jazper.dk/api/auth/signup");
        var response = await http.post(url,
            headers: {"Content-Type": "application/json"},
            body: json.encode({
              "fullname": username,
              "birthday": DateTime.now().toString(),
              "gender": "Male",
              "username": username,
              "password": username,
              "confirmPassword": username,
            }));
            if (response.statusCode != 201) {
              _registerFailedSnackBar();
            } else {
            appstate.userId = json.decode(response.body)['id'];
            appstate.cookie = response.headers['set-cookie'];
            Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) {
              return const MainMenu();
            }));
      }}
    
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Register Anonymously'),
      ),
      body: Column(
        children: [
          TextFormField(
            decoration: const InputDecoration(
              labelText: 'Username',
            ),
            onSaved: (newValue) => username = newValue,
            validator: (value) => (value == null ||
                    value.isEmpty ||
                    value.trim().length <= 1 ||
                    value.trim().length > 50)
                ? 'Please enter a name'
                : null,
          ),
          const SizedBox(
            height: 20,
          ),
          Center(
            child: ElevatedButton(
              onPressed: _register,
              child: const Text('Register Anonymously'),
            ),
          ),
        ],
      ),
    );
  }
}
