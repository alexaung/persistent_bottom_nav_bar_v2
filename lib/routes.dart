import 'package:flutter/material.dart';
import 'package:thitsarparami/ui/home/home_screen.dart';
import 'package:thitsarparami/ui/root/root_screen.dart';
import 'package:thitsarparami/ui/search/search_screen.dart';

final Map<String, WidgetBuilder> routes = {
  RootScreen.routeName: (ctx) => RootScreen(
        menuScreenContext: ctx,
      ),
  HomeScreen.routeName: (ctx) => const HomeScreen(),
  SearchScreen.routeName: (ctx) => const SearchScreen(),
  
};
