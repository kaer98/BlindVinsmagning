import 'package:flutter/material.dart';
import "package:appr/models/wset_eval.dart";

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

class WSET2FORM extends StatelessWidget {
  const WSET2FORM({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      shrinkWrap: true,
      children: [
        DropdownButtonFormField(
          
          decoration: const InputDecoration(
            labelText: 'Aroma Intensity',
          ),
          items: _getDropDownMenuItems(
              AIntensityEnum.values.map((e) => e.name).toList()),
          onChanged: ((value) {}),
          alignment: Alignment.center,
          isExpanded: true,
          
        ),
        DropdownButtonFormField(
          decoration: const InputDecoration(
            labelText: 'Nose Intensity',
          ),
          items: _getDropDownMenuItems(
              NintensityEnum.values.map((e) => e.name).toList()),
          onChanged: ((value) {}),
          alignment: Alignment.center,
          isExpanded: true,
        ),
        DropdownButtonFormField(
          decoration: const InputDecoration(
            labelText: 'Conclusions Quality',
          ),
          items: _getDropDownMenuItems(
              CQualityEnum.values.map((e) => e.name).toList()),
              
          onChanged: ((value) {}),
          alignment: Alignment.center,
          isExpanded: true,
        ),
        DropdownButtonFormField(
          decoration: const InputDecoration(
            labelText: 'Alcohol Perception',
          ),
          items: _getDropDownMenuItems(
              PAlcoholEnum.values.map((e) => e.name).toList()),
          onChanged: ((value) {}),
          alignment: Alignment.center,
          isExpanded: true,
        ),
        DropdownButtonFormField(
          decoration: const InputDecoration(
            labelText: 'Acidity Perception',
          ),
          items: _getDropDownMenuItems(
              PAcidityEnum.values.map((e) => e.name).toList()),
          onChanged: ((value) {}),
          alignment: Alignment.center,
          isExpanded: true,
        ),
        DropdownButtonFormField(
          decoration: const InputDecoration(
            labelText: 'Sweetness Perception',
          ),
          items: _getDropDownMenuItems(
              PSweetnessEnum.values.map((e) => e.name).toList()),
          onChanged: ((value) {}),
          alignment: Alignment.center,
          isExpanded: true,
        ),
        DropdownButtonFormField(
          decoration: const InputDecoration(
            labelText: 'Tannin Perception',
          ),
          items: _getDropDownMenuItems(
              PTanninEnum.values.map((e) => e.name).toList()),
          onChanged: ((value) {}),
          alignment: Alignment.center,
          isExpanded: true,
        ),
        DropdownButtonFormField(
          decoration: const InputDecoration(
            labelText: 'Body Perception',
          ),
          items: _getDropDownMenuItems(
              PBodyEnum.values.map((e) => e.name).toList()),
          onChanged: ((value) {}),
          alignment: Alignment.center,
          isExpanded: true,
        ),
        DropdownButtonFormField(
          decoration: const InputDecoration(
            labelText: 'Flavor Intensity',
          ),
          items: _getDropDownMenuItems(
              PFlavourIntensityEnum.values.map((e) => e.name).toList()),
          onChanged: ((value) {}),
          alignment: Alignment.center,
          isExpanded: true,
        ),
        DropdownButtonFormField(
          decoration: const InputDecoration(
            labelText: 'Finish Perception',
          ),
          items: _getDropDownMenuItems(
              PFinishEnum.values.map((e) => e.name).toList()),
          onChanged: ((value) {}),
          alignment: Alignment.center,
          isExpanded: true,
        ),
        DropdownButtonFormField(
          decoration: const InputDecoration(
            labelText: 'Color Intensity',
          ),
          items: _getDropDownMenuItems(
              AColorEnum.values.map((e) => e.name).toList()),
          onChanged: ((value) {}),
          alignment: Alignment.center,
          isExpanded: true,
        ),
      ],
    );
  }
}
