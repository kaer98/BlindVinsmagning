import 'dart:convert';

import 'package:appr/main.dart';
import 'package:appr/screens/main_menu.dart';
import 'package:appr/screens/start_screen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  String _username = "";

  String _password = "";

  void _loginFailedSnackBar() {
    ScaffoldMessenger.of(context).clearSnackBars();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text("Login failed"),
      ),
    );
  }

  Future saveForm(MyAppState appState) async {
    var url = Uri.parse("https://vin.jazper.dk/api/auth/login");
    var response = await http.post(url,
        headers: {"Content-Type": "application/json"},
        body: json.encode({
          "username": _username,
          "password": _password,
        }));

    if (response.headers['set-cookie'] != null) {
      appState.cookie = response.headers['set-cookie']!;
      Map<String, dynamic> jsonMap = json.decode(response.body);
      appState.userId = jsonMap['id'];
    } else {
      appState.cookie = null;
    }

    if (appState.cookie != null) {
       if (!mounted) return;
      Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) {
        return const MainMenu();
      }));
    } else {
      _loginFailedSnackBar();
    }
  }

  @override
  Widget build(BuildContext context) {
    var appState = context.watch<MyAppState>();

    return Scaffold(
      appBar: AppBar(
        title: const Text("Login"),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) {
                return const StartScreen();
              }),
            );
          },
        ),
      ),
      body: Center(
        child: Column(
          children: [
            TextFormField(
              decoration: const InputDecoration(labelText: "Username"),
              onChanged: (value) => _username = value,
            ),
            TextFormField(
              decoration: const InputDecoration(labelText: "Password"),
              obscureText: true,
              onChanged: (value) => _password = value,
            ),
            ElevatedButton(
              onPressed: () {
                saveForm(appState);
              },
              child: const Text("Login"),
            ),
          ],
        ),
      ),
    );
  }
}
