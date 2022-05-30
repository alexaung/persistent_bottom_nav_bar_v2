import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  static const routeName = '/home';
  final BuildContext? menuScreenContext;
  final Function? onScreenHideButtonPressed;
  final bool hideStatus;
  const HomeScreen(
      {Key? key,
      this.menuScreenContext,
      this.onScreenHideButtonPressed,
      this.hideStatus = false})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text("Home"));
  }
}