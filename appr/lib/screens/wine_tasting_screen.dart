import 'package:flutter/material.dart';

class WineTastingScreen extends StatefulWidget {
  const WineTastingScreen({super.key});

  @override
  State<WineTastingScreen> createState() => _WineTastingScreenState();
}

class _WineTastingScreenState extends State<WineTastingScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wine Tasting'),
      ),
      body: const Center(
        child: Text('Wine Tasting Screen'),
      ),
    );
  }
}
