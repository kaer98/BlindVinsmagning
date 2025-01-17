import 'package:appr/screens/login_screen.dart';
import 'package:appr/screens/main_menu.dart';
import 'package:appr/screens/register_anon_screen.dart';
import 'package:appr/screens/register_screen.dart';
import 'package:flutter/material.dart';

class StartScreen extends StatelessWidget {
  const StartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
      
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            
            children: [
              ElevatedButton(
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) {
                        return const LoginScreen();
                      },
                    ),
                  );
                },
                child: const Text('Login'),
              ),
              ElevatedButton(
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) {
                        return const RegisterScreen();
                      },
                    ),
                  );
                },
                child: const Text('Register'),
              ),
              ElevatedButton(onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) {
                        return const RegisterAnonScreen();
                      },
                    ),
                  );
                }, child: const Text("Anonym"))
            ],
          ),
        ],
      ),
    );
  }
}
