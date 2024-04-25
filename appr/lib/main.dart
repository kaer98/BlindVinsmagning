import 'package:appr/models/wine_tasting.dart';
import 'package:appr/screens/start_screen.dart';
import 'package:appr/screens/wine_tasting_screen.dart';
import 'package:flutter/material.dart';
import "package:google_fonts/google_fonts.dart";
import 'package:provider/provider.dart';

final theme = ThemeData(
  useMaterial3: true,
  colorScheme: ColorScheme.fromSeed(
    brightness: Brightness.light,
    seedColor: const Color.fromARGB(255, 97, 189, 196),
    background: Colors.white,
  ),
  textTheme: GoogleFonts.latoTextTheme(),
  canvasColor: const ColorScheme.light().background,
  scaffoldBackgroundColor: const ColorScheme.light().background,
  
);

final darkTheme = ThemeData().copyWith(
  colorScheme: ColorScheme.fromSeed(
    brightness: Brightness.dark,
    seedColor: const Color.fromARGB(255, 21, 43, 44),
    
  ),
  scaffoldBackgroundColor: Colors.black, // Set the background color to black
  textTheme: GoogleFonts.latoTextTheme()
      .apply(bodyColor: const ColorScheme.dark().onBackground),
  canvasColor: Colors.black,
  dialogBackgroundColor: const Color.fromARGB(255, 79, 75, 95),
);

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
        create: (context) => MyAppState(),
        child: MaterialApp(
            theme: theme, darkTheme: darkTheme, home: const StartScreen()));
  }
}

class MyAppState extends ChangeNotifier {
  String? cookie;
  int? userId;
  List<WineTasting> wineTastings = [];
}
