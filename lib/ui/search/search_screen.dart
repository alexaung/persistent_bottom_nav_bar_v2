import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';

class SearchScreen extends StatelessWidget {
  static const routeName = '/search';
  final BuildContext? menuScreenContext;
  final PersistentTabController? tabController;
  final Function? onScreenHideButtonPressed;
  final bool hideStatus;
  const SearchScreen(
      {Key? key,
      this.menuScreenContext,
      this.tabController,
      this.onScreenHideButtonPressed,
      this.hideStatus = false})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text("Search"));
  }
}