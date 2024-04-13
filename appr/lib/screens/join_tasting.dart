import 'package:appr/screens/wine_tasting_screen.dart';
import 'package:flutter/material.dart';

class JoinTasting extends StatelessWidget {
  const JoinTasting({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Join Tasting'),
        ),
        body: Column(
          children: [
            TextFormField(
              textAlignVertical: TextAlignVertical.bottom,
              style: Theme.of(context)
                  .textTheme
                  .bodyMedium!
                  .copyWith(color: Theme.of(context).colorScheme.onBackground),
              decoration: const InputDecoration(labelText: "Tasting ID"),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const WineTastingScreen(),
                  ),
                );
              },
              child: const Text("Join Tasting"),
            ),
          ],
        ));
  }
}
