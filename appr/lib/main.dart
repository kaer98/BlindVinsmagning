import 'package:appr/screens/main_menu.dart';
import 'package:flutter/material.dart';
import "package:google_fonts/google_fonts.dart";


final theme = ThemeData(
  useMaterial3: true,
  
  colorScheme: ColorScheme.fromSeed(
    brightness: Brightness.light,
    seedColor: const Color.fromARGB(255, 97, 189, 196),
  ),
  textTheme: GoogleFonts.latoTextTheme() , );
  
  final darkTheme = ThemeData().copyWith(
    colorScheme: ColorScheme.fromSeed(
      brightness: Brightness.dark,
      seedColor: const Color.fromARGB(255, 21, 43, 44),
    ),
    scaffoldBackgroundColor: Colors.black, // Set the background color to black
    textTheme: GoogleFonts.latoTextTheme().apply(bodyColor: const ColorScheme.dark().onBackground),
  );

void main() {
  runApp( const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(theme: theme,darkTheme: darkTheme, home: const MainMenu());
  }
}
