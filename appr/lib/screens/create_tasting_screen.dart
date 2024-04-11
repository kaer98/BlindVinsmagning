import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class CreateTastingScreen extends StatefulWidget {
  const CreateTastingScreen({super.key});

  @override
  State<CreateTastingScreen> createState() => _CreateTastingScreenState();
}

class _CreateTastingScreenState extends State<CreateTastingScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Create Tasting'),
      ),
      body: SizedBox(
        width: double.maxFinite,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            TextFormField(
              decoration: const InputDecoration(labelText: "Wine"),
              
            ),
        
          ],
        ),
      ),
    );
  }
}