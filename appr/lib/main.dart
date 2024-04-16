import 'package:appr/screens/login_screen.dart';
import 'package:appr/screens/main_menu.dart';
import 'package:flutter/material.dart';
import "package:google_fonts/google_fonts.dart";
import 'package:provider/provider.dart';
import "dart:io";

final theme = ThemeData(
  useMaterial3: true,
  colorScheme: ColorScheme.fromSeed(
    brightness: Brightness.light,
    seedColor: const Color.fromARGB(255, 97, 189, 196),
  ),
  textTheme: GoogleFonts.latoTextTheme(),
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
  dialogBackgroundColor: Color.fromARGB(255, 79, 75, 95),
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
            theme: theme, darkTheme: darkTheme, home: const LoginScreen()));
  }
}

class MyAppState extends ChangeNotifier {
  String? cookie;
  int? userId;
}
