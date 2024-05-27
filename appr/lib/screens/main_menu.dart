import 'package:appr/main.dart';
import 'package:appr/screens/create_tasting_screen.dart';
import 'package:appr/screens/join_tasting.dart';
import 'package:appr/screens/profile_screen.dart';
import 'package:appr/screens/start_screen.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class MainMenu extends StatelessWidget {
  const MainMenu({super.key});

  final _spacing = 10.0;

  @override
  Widget build(BuildContext context) {
    var appState = context.read<MyAppState>();
    return Scaffold(
      appBar: AppBar(
        title: const Text('Main Menu'),
      ),
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
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) {
                        return const JoinTasting();
                      },
                    ),
                  );
                },
                child: const Text('Join WineTasting'),
              ),
              SizedBox(height: _spacing),
              ElevatedButton(
                onPressed: () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) {
                    return const CreateTastingScreen();
                  }));
                  
                },
                child: const Text('Create Tasting'),
              ),
              SizedBox(height: _spacing),
              appState.userId != null
                  ? ElevatedButton(
                      onPressed: () {
                        Navigator.push(context,
                            MaterialPageRoute(builder: (context) {
                          return const ProfileScreen();
                        }));
                        
                      },
                      child: const Text('Profile'),
                    )
                  : SizedBox(height: _spacing,),
                  SizedBox(height: _spacing),
              ElevatedButton(
                onPressed: () {
                  appState.userId = null;
                  appState.cookie = null;
                  Navigator.pushReplacement(context,
                      MaterialPageRoute(builder: (context) {
                    return const StartScreen();
                  }));
                },
                child: const Text('Log out'),
              ),
            
            ],
          ),
        ],
      ),
    );
  }
}
