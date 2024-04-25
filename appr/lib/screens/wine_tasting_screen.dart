import 'dart:convert';

import 'package:appr/main.dart';
import 'package:appr/models/wine.dart';
import 'package:appr/models/wine_tasting.dart';
import 'package:appr/models/wset_eval.dart';
import 'package:appr/screens/results_screen.dart';
import 'package:appr/screens/tasting_overview_screen.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

class WineTastingScreen extends StatefulWidget {
  const WineTastingScreen(this.wineTasting, {super.key});
  final WineTasting wineTasting;
  @override
  State<WineTastingScreen> createState() =>
      _WineTastingScreenState();
}

class _WineTastingScreenState extends State<WineTastingScreen> {

  

  List<DropdownMenuItem> wineDropDownMenuItems = [];
  int selectedWine = 1;
  Map<Wine,Wset> evalMap = <Wine, Wset>{};
  var noteControllerMap = <Wine, TextEditingController>{};
  var flavourcharacteristicsControllerMap = <Wine, TextEditingController>{};
  var aromacharacteristicsControllerMap = <Wine, TextEditingController>{};

  void updateEval() async{
    
     var url = Uri.parse("https://vin.jazper.dk/api/evaluations/${widget.wineTasting.id}");
       var appstate = context.read<MyAppState>();
       for(var e in evalMap.entries){
        var body =json.encode({
            "aIntensity": e.value.aIntensity?.name,
            "nIntensity": e.value.nIntensity?.name,
            "quality": e.value.cQuality?.name,
            "alcohol": e.value.pAlcohol?.name,
            "aromacharacteristics": e.value.aromacharacteristics,
            "flavourcharacteristics": e.value.flavourcharacteristics,
            "acidity": e.value.pAcidity?.name,
            "sweetness": e.value.pSweetness?.name,
            "tannin": e.value.pTannin?.name,
            "body": e.value.pBody?.name,
            "flavourintensity": e.value.pFlavourIntensity?.name,
            "finish": e.value.pFinish?.name,
            "acolourintensity": e.value.aColor?.name,
            "note": e.value.note,
            "wineId": e.key.id,
          });
         var response = await http.put(url,
          headers: {"Content-Type": "application/json",
          "Cookie": appstate.cookie!},
         body: body);
        var tasting = widget.wineTasting.wineEvaluation!.firstWhere((element) => element.wineId == e.key.id);
        tasting.aIntensity = e.value.aIntensity;
        tasting.nIntensity = e.value.nIntensity;
        tasting.cQuality = e.value.cQuality;
        tasting.pAlcohol = e.value.pAlcohol;
        tasting.aromacharacteristics = e.value.aromacharacteristics;
        tasting.flavourcharacteristics = e.value.flavourcharacteristics;
        tasting.pAcidity = e.value.pAcidity;
        tasting.pSweetness = e.value.pSweetness;
        tasting.pTannin = e.value.pTannin;
        tasting.pBody = e.value.pBody;
        tasting.pFlavourIntensity = e.value.pFlavourIntensity;
        tasting.pFinish = e.value.pFinish;
        tasting.aColor = e.value.aColor;
        tasting.note = e.value.note;
          print(body);
          print(response.body);
       }
       
      
  }

  void makeWineList() {
    int i = 1;
    for (var wine in widget.wineTasting.wines!) {
      wineDropDownMenuItems.add(DropdownMenuItem(
        value: i,
        child: widget.wineTasting.visibility == VisibilityEnum.Open
            ? Text(wine.name)
            : Text(i.toString()),
      ));
      i++;
    }
  }

  void makeEvalMap() {
    evalMap.clear();
    for (int i=0;i<widget.wineTasting.wines!.length;i++) {
      evalMap[widget.wineTasting.wines![i]] = widget.wineTasting.wineEvaluation!.firstWhere((element) => element.wineId == widget.wineTasting.wines![i].id);
      noteControllerMap[widget.wineTasting.wines![i]] = TextEditingController(text: evalMap[widget.wineTasting.wines![i]]!.note );
      flavourcharacteristicsControllerMap[widget.wineTasting.wines![i]] = TextEditingController(text: evalMap[widget.wineTasting.wines![i]]!.flavourcharacteristics );
      aromacharacteristicsControllerMap[widget.wineTasting.wines![i]] = TextEditingController(text: evalMap[widget.wineTasting.wines![i]]!.aromacharacteristics );

    }
  }

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

  void makeEval () async{
    
      var url = Uri.parse("https://vin.jazper.dk/api/evaluations");
      var appstate = context.read<MyAppState>();
      for(var wine in widget.wineTasting.wines!){
        var response =http.post(url,
          headers: {"Content-Type": "application/json",
          "Cookie": appstate.cookie!},
          body: json.encode({
            "name" : widget.wineTasting.name,
            "wineId": wine.id,
            "tastingId": widget.wineTasting.id,
          }));
          widget.wineTasting.wineEvaluation!.add(Wset(wineId: wine.id, tastingId: widget.wineTasting.id, ));
        //  print(response.body);
      }

  }

  @override
  void initState() {
    super.initState();
    makeWineList();
    if(widget.wineTasting.wineEvaluation!.isEmpty){
     makeEval();
    }
    makeEvalMap();
    
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.wineTasting.name),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text("Vin nummer"),
              const SizedBox(
                width: 10,
              ),
              DropdownButton(
                items: wineDropDownMenuItems,
                value: selectedWine,
                onChanged: ((value) {
                  setState(() {
                    selectedWine = value;
                  });
                }),
                alignment: Alignment.center,
              ),
            ],
          ),
          Text("antal vine: ${widget.wineTasting.wines!.length}"),
          if(widget.wineTasting.host!.UserId == context.read<MyAppState>().userId)
          ElevatedButton(onPressed: (){Navigator.push(context,
                        MaterialPageRoute(builder: (context) {
                      return OverViewScreen(widget.wineTasting.id);
                    }));}, child: Text("Overview")),
          Flexible(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: ListView(
                shrinkWrap: true,
                children: [
                  DropdownButtonFormField(
                    decoration: const InputDecoration(
                      labelText: 'Aroma Intensity',
                    ),
                    items: _getDropDownMenuItems(
                        AIntensityEnum.values.map((e) => e.name).toList()),
                    value: evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                        .aIntensity
                        ?.name,
                    onChanged: (value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                                .aIntensity =
                            AIntensityEnum.values
                                .firstWhere((element) => element.name == value);
                      });
                    },
                    alignment: Alignment.center,
                    isExpanded: true,
                  ),
                  DropdownButtonFormField(
                    decoration: const InputDecoration(
                      labelText: 'Nose Intensity',
                    ),
                    items: _getDropDownMenuItems(
                        NintensityEnum.values.map((e) => e.name).toList()),
                    value: evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                        .nIntensity
                        ?.name,
                    onChanged: (value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                                .nIntensity =
                            NintensityEnum.values
                                .firstWhere((element) => element.name == value);
                      });
                    },
                    alignment: Alignment.center,
                    isExpanded: true,
                  ),
                  DropdownButtonFormField(
                    decoration: const InputDecoration(
                      labelText: 'Conclusions Quality',
                    ),
                    items: _getDropDownMenuItems(
                        CQualityEnum.values.map((e) => e.name).toList()),
                    onChanged: ((value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                                .cQuality =
                            CQualityEnum.values
                                .firstWhere((element) => element.name == value);
                      });
                    }),
                    value: evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                        .cQuality
                        ?.name,
                    alignment: Alignment.center,
                    isExpanded: true,
                  ),
                   DropdownButtonFormField(
                    decoration: const InputDecoration(
                      labelText: 'Flavorintensity',
                    ),
                    items: _getDropDownMenuItems(
                        PFlavourIntensityEnum.values.map((e) => e.name).toList()),
                    onChanged: ((value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                                .pFlavourIntensity =
                            PFlavourIntensityEnum.values
                                .firstWhere((element) => element.name == value);
                      });
                    }),
                    value: evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                        .pFlavourIntensity
                        ?.name,
                    alignment: Alignment.center,
                    isExpanded: true,
                  ),
                  DropdownButtonFormField(
                    decoration: const InputDecoration(
                      labelText: 'Alcohol Perception',
                    ),
                    items: _getDropDownMenuItems(
                        PAlcoholEnum.values.map((e) => e.name).toList()),
                    onChanged: ((value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                                .pAlcohol =
                            PAlcoholEnum.values
                                .firstWhere((element) => element.name == value);
                      });
                    }),
                    value: evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                        .pAlcohol
                        ?.name,
                    alignment: Alignment.center,
                    isExpanded: true,
                  ),
                 
                  TextFormField(
                    minLines: 1,
                    maxLines: 1,
                    textAlignVertical: TextAlignVertical.bottom,
                    onChanged: (value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!.aromacharacteristics =
                            value;
                        aromacharacteristicsControllerMap[
                                widget.wineTasting.wines![selectedWine - 1]]!
                            .text = value;
                      });
                    },
                    controller: aromacharacteristicsControllerMap[widget.wineTasting
                        .wines![selectedWine - 1]] ??= TextEditingController(),
                    decoration: const InputDecoration(
                        labelText: "Armoa Charactaristics",),
                  ),
              TextFormField(
                    minLines: 1,
                    maxLines: 1,
                    textAlignVertical: TextAlignVertical.bottom,
                    onChanged: (value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!.flavourcharacteristics =
                            value;
                        flavourcharacteristicsControllerMap[
                                widget.wineTasting.wines![selectedWine - 1]]!
                            .text = value;
                      });
                    },
                    controller: flavourcharacteristicsControllerMap[widget.wineTasting
                        .wines![selectedWine - 1]] ??= TextEditingController(),
                    decoration: const InputDecoration(
                        labelText: "flavour Charactaristics",),
                  ),
                  
                  DropdownButtonFormField(
                    decoration: const InputDecoration(
                      labelText: 'Acidity Perception',
                    ),
                    items: _getDropDownMenuItems(
                        PAcidityEnum.values.map((e) => e.name).toList()),
                    onChanged: ((value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                                .pAcidity =
                            PAcidityEnum.values
                                .firstWhere((element) => element.name == value);
                      });
                    }),
                    value: evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                        .pAcidity
                        ?.name,
                    alignment: Alignment.center,
                    isExpanded: true,
                  ),
                  DropdownButtonFormField(
                    decoration: const InputDecoration(
                      labelText: 'Sweetness Perception',
                    ),
                    items: _getDropDownMenuItems(
                        PSweetnessEnum.values.map((e) => e.name).toList()),
                    onChanged: ((value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                                .pSweetness =
                            PSweetnessEnum.values
                                .firstWhere((element) => element.name == value);
                      });
                    }),
                    value: evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                        .pSweetness
                        ?.name,
                    alignment: Alignment.center,
                    isExpanded: true,
                  ),
                  DropdownButtonFormField(
                    decoration: const InputDecoration(
                      labelText: 'Tannin Perception',
                    ),
                    items: _getDropDownMenuItems(
                        PTanninEnum.values.map((e) => e.name).toList()),
                    onChanged: ((value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                                .pTannin =
                            PTanninEnum.values
                                .firstWhere((element) => element.name == value);
                      });
                    }),
                    value: evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                        .pTannin
                        ?.name,
                    alignment: Alignment.center,
                    isExpanded: true,
                  ),
                  DropdownButtonFormField(
                    decoration: const InputDecoration(
                      labelText: 'Body Perception',
                    ),
                    items: _getDropDownMenuItems(
                        PBodyEnum.values.map((e) => e.name).toList()),
                    onChanged: ((value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!.pBody =
                            PBodyEnum.values
                                .firstWhere((element) => element.name == value);
                      });
                    }),
                    value: evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                        .pBody
                        ?.name,
                    alignment: Alignment.center,
                    isExpanded: true,
                  ),
                  DropdownButtonFormField(
                    decoration: const InputDecoration(
                      labelText: 'Flavor Intensity',
                    ),
                    items: _getDropDownMenuItems(PFlavourIntensityEnum.values
                        .map((e) => e.name)
                        .toList()),
                    onChanged: ((value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                                .pFlavourIntensity =
                            PFlavourIntensityEnum.values
                                .firstWhere((element) => element.name == value);
                      });
                    }),
                    value: evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                        .pFlavourIntensity
                        ?.name,
                    alignment: Alignment.center,
                    isExpanded: true,
                  ),
                  DropdownButtonFormField(
                    decoration: const InputDecoration(
                      labelText: 'Finish Perception',
                    ),
                    items: _getDropDownMenuItems(
                        PFinishEnum.values.map((e) => e.name).toList()),
                    onChanged: ((value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                                .pFinish =
                            PFinishEnum.values
                                .firstWhere((element) => element.name == value);
                      });
                    }),
                    value: evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                        .pFinish
                        ?.name,
                    alignment: Alignment.center,
                    isExpanded: true,
                  ),
                  DropdownButtonFormField(
                    decoration: const InputDecoration(
                      labelText: 'Color',
                    ),
                    items: _getDropDownMenuItems(
                        AColorEnum.values.map((e) => e.name).toList()),
                    onChanged: ((value) {
                      setState(() {
                        evalMap[widget.wineTasting.wines![selectedWine - 1]]!.aColor =
                            AColorEnum.values
                                .firstWhere((element) => element.name == value);
                      });
                    }),
                    value: evalMap[widget.wineTasting.wines![selectedWine - 1]]!
                        .aColor
                        ?.name,
                    alignment: Alignment.center,
                    isExpanded: true,
                  ),
                ],
              ),
            ),
          ),
          TextFormField(
            minLines: 2,
            maxLines: 5,
            textAlignVertical: TextAlignVertical.bottom,
            onChanged: (value) {
              setState(() {
                evalMap[widget.wineTasting.wines![selectedWine - 1]]!.note = value;
                noteControllerMap[widget.wineTasting.wines![selectedWine - 1]]!.text =
                    value;
              });
            },
            controller:
                noteControllerMap[widget.wineTasting.wines![selectedWine - 1]] ??=
                    TextEditingController(),
            decoration: const InputDecoration(
                labelText: "Notes", filled: true, fillColor: Colors.grey),
          ),
          Row(
            children: [
              ElevatedButton(
                onPressed: () {
                 updateEval();
                },
                child: const Text("Save"),
              ),
              ElevatedButton(
                onPressed: () {
                  updateEval();
                  Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) {
                    return ResultScreen(widget.wineTasting);
                  }));
                },
                child: const Text("Afslut"),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
