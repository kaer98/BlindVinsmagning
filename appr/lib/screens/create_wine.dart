// ignore_for_file: prefer_typing_uninitialized_variables

import 'dart:convert';

import 'package:appr/main.dart';
import 'package:appr/models/wine.dart';
import 'package:flutter/material.dart';
import "package:http/http.dart" as http;
import 'package:provider/provider.dart';

class CreateWineScreen extends StatefulWidget {
  const CreateWineScreen({super.key});

  @override
  State<CreateWineScreen> createState() => _CreateWineScreenState();
}

class _CreateWineScreenState extends State<CreateWineScreen> {
  final _formKey = GlobalKey<FormState>();
  var _name;
  var _country;
  var _region;
  var _type;
  var _producer;
  var _grape;
  var _currency;
  DateTime? _prodYear;
  var _price;
  var _alcohol;

  void _createWine() async {
    ScaffoldMessenger.of(context).clearSnackBars();
    final isValid = _formKey.currentState!.validate();
    var appstate = context.read<MyAppState>();
    if (isValid) {
      _formKey.currentState!.save();
      Wine wine = Wine(
          name: _name,
          country: _country,
          region: _region,
          type: _type,
          producer: _producer,
          grape: _grape,
          currency: _currency,
          prodYear: _prodYear!,
          price: _price,
          alcohol: _alcohol);
      var url = Uri.parse("https://vin.jazper.dk/api/wines");
      var response = await http.post(url,
          headers: {
            "Content-Type": "application/json",
            "Cookie": appstate.cookie!
          },
          body: json.encode({
            "name": wine.name,
            "country": wine.country,
            "region": wine.region,
            "prodyear": wine.prodYear.toString(),
            "producer": wine.producer,
            "alcohol": wine.alcohol,
            "type": wine.type,
            "grape": wine.grape,
            "price": wine.price,
            "currency": wine.currency,
          }));
      print(response.request);
      // Navigator.pop(context);
    }
  }

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
              child: Form(
                key: _formKey,
                child: ListView(
                  shrinkWrap: true,
                  children: [
                    TextFormField(
                      decoration: const InputDecoration(labelText: "Name"),
                      validator: (value) => (value == null ||
                              value.isEmpty ||
                              value.trim().length <= 1 ||
                              value.trim().length > 50)
                          ? 'Please enter a name'
                          : null,
                      onSaved: (newValue) => _name = newValue,
                    ),
                    TextFormField(
                      decoration: const InputDecoration(labelText: "Country"),
                      validator: (value) => (value == null ||
                              value.isEmpty ||
                              value.trim().length <= 1 ||
                              value.trim().length > 50)
                          ? 'Please enter a country'
                          : null,
                      onSaved: (newValue) => _country = newValue,
                    ),
                    TextFormField(
                      decoration: const InputDecoration(labelText: "Region"),
                      validator: (value) => (value == null ||
                              value.isEmpty ||
                              value.trim().length <= 1 ||
                              value.trim().length > 50)
                          ? 'Please enter a region'
                          : null,
                      onSaved: (newValue) => _region = newValue,
                    ),
                    TextFormField(
                      decoration: const InputDecoration(labelText: "Type"),
                      validator: (value) => (value == null ||
                              value.isEmpty ||
                              value.trim().length <= 1 ||
                              value.trim().length > 50)
                          ? 'Please enter a type'
                          : null,
                      onSaved: (newValue) => _type = newValue,
                    ),
                    TextFormField(
                      decoration: const InputDecoration(labelText: "Producer"),
                      validator: (value) => (value == null ||
                              value.isEmpty ||
                              value.trim().length <= 1 ||
                              value.trim().length > 50)
                          ? 'Please enter a producer'
                          : null,
                      onSaved: (newValue) => _producer = newValue,
                    ),
                    TextFormField(
                        decoration: const InputDecoration(labelText: "Grape"),
                        validator: (value) => (value == null ||
                                value.isEmpty ||
                                value.trim().length <= 1 ||
                                value.trim().length > 50)
                            ? 'Please enter a grape'
                            : null,
                        onSaved: (newValue) => _grape = newValue),
                    TextFormField(
                      decoration: const InputDecoration(labelText: "Currency"),
                      validator: (value) => (value == null ||
                              value.isEmpty ||
                              value.trim().length <= 1 ||
                              value.trim().length > 3)
                          ? 'Please enter a currency'
                          : null,
                      onSaved: (newValue) => _currency = newValue,
                    ),
                    TextFormField(
                      decoration:
                          const InputDecoration(labelText: "Production Year"),
                      keyboardType: TextInputType.datetime,
                      validator: (value) => (value == null ||
                              value.isEmpty ||
                              value.trim().length <= 1 ||
                              value.trim().length > 50)
                          ? 'Please enter a production year'
                          : null,
                      onSaved: (newValue) =>
                          _prodYear = DateTime(int.parse(newValue.toString())),
                    ),
                    TextFormField(
                      decoration: const InputDecoration(labelText: "Price"),
                      keyboardType: TextInputType.number,
                      validator: (value) => (value == null ||
                              value.isEmpty ||
                              value.trim().length <= 1 ||
                              value.trim().length > 50)
                          ? 'Please enter a price'
                          : null,
                      onSaved: (newValue) =>
                          _price = double.parse(newValue.toString()),
                    ),
                    TextFormField(
                      decoration: const InputDecoration(labelText: "Alcohol"),
                      keyboardType: TextInputType.number,
                      validator: (value) => (value == null ||
                              value.isEmpty ||
                              value.trim().length <= 1 ||
                              value.trim().length > 50)
                          ? 'Please enter a alcohol'
                          : null,
                      onSaved: (newValue) =>
                          _alcohol = double.parse(newValue.toString()),
                    ),
                  ],
                ),
              ),
            ),
            ElevatedButton(
              onPressed: _createWine,
              child: const Text('Create'),
            ),
          ],
        ),
      ),
    );
  }
}
