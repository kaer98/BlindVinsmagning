import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class CreateWineScreen extends StatefulWidget {
  const CreateWineScreen({super.key});

  @override
  State<CreateWineScreen> createState() => _CreateWineScreenState();
}

class _CreateWineScreenState extends State<CreateWineScreen> {
  @override
  Widget build(BuildContext context) {
    final keyboardSpace = MediaQuery.of(context).viewInsets.bottom;
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        title: const Text('Create Wine'),
      ),
      body: Padding(
        padding: EdgeInsets.fromLTRB(8, 8, 8, keyboardSpace),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Flexible(
              child: ListView(
                shrinkWrap: true,
                children: [
                  TextFormField(
                    textAlignVertical: TextAlignVertical.bottom,
                    style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground),
                    decoration: const InputDecoration(labelText: "Name"),
                    
                  ),
                  TextFormField(
                    textAlignVertical: TextAlignVertical.bottom,
                    style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground),
                    decoration: const InputDecoration(labelText: "Country"),
                  ),
                  TextFormField(
                    textAlignVertical: TextAlignVertical.bottom,
                    style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground),
                    decoration: const InputDecoration(labelText: "Region"),
                  ),
                  TextFormField(
                    textAlignVertical: TextAlignVertical.bottom,
                    style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground),
                    decoration: const InputDecoration(labelText: "Type"),
                  ),
                  TextFormField(
                    textAlignVertical: TextAlignVertical.bottom,
                    style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground),
                    decoration: const InputDecoration(labelText: "Producer"),
                  ),
                  TextFormField(
                    textAlignVertical: TextAlignVertical.bottom,
                    style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground),
                    decoration: const InputDecoration(labelText: "Grape"),
                  ),
                  TextFormField(
                    textAlignVertical: TextAlignVertical.bottom,
                    style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground),
                    decoration: const InputDecoration(labelText: "Currency"),
                  ),
                  TextFormField(
                    textAlignVertical: TextAlignVertical.bottom,
                    style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground),
                    decoration:
                        const InputDecoration(labelText: "Production Year"),
                  ),
                  TextFormField(
                    textAlignVertical: TextAlignVertical.bottom,
                    style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground),
                    decoration: const InputDecoration(labelText: "Price"),
                  ),
                  TextFormField(
                    textAlignVertical: TextAlignVertical.bottom,
                    style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        color: Theme.of(context).colorScheme.onBackground),
                    decoration: const InputDecoration(labelText: "Alcohol"),
                  ),
                ],
              ),
            ),
            ElevatedButton(
              onPressed: () {},
              child: const Text('Create'),
            ),
          ],
        ),
      ),
    );
  }
}
