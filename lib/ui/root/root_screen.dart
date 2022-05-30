import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar_v2/persistent-tab-view.dart';
import 'package:thitsarparami/connectivity_wrapper/connectivity_wrapper.dart';
import 'package:thitsarparami/ui/home/home_screen.dart';
import 'package:thitsarparami/ui/search/search_screen.dart';

BuildContext? testContext;

class RootScreen extends StatefulWidget {
  static const routeName = '/';
  final BuildContext menuScreenContext;
  const RootScreen({Key? key, required this.menuScreenContext})
      : super(key: key);

  @override
  RootScreenState createState() => RootScreenState();
}

class RootScreenState extends State<RootScreen> {
  PersistentTabController? _controller;
  bool _hideNavBar = false;
  @override
  void initState() {
    super.initState();

    _controller = PersistentTabController(initialIndex: 0);
    _hideNavBar = false;
  }

  List<Widget> _buildScreens() {
    return [
      HomeScreen(
        menuScreenContext: widget.menuScreenContext,
        hideStatus: _hideNavBar,
        onScreenHideButtonPressed: () {
          setState(() {
            _hideNavBar = !_hideNavBar;
          });
        },
      ),
      SearchScreen(
        menuScreenContext: widget.menuScreenContext,
        hideStatus: _hideNavBar,
        tabController: _controller,
        onScreenHideButtonPressed: () {
          setState(() {
            _hideNavBar = !_hideNavBar;
          });
        },
      ),
    ];
  }

  List<PersistentBottomNavBarItem> _navBarsItems() {
    return [
      PersistentBottomNavBarItem(
        icon: const Icon(Icons.home_outlined),
        title: "Home",
        inactiveColorPrimary:
            Theme.of(context).bottomNavigationBarTheme.unselectedItemColor,
        inactiveColorSecondary: Theme.of(context).primaryColorLight,
        routeAndNavigatorSettings: const RouteAndNavigatorSettings(
          initialRoute: '/',
        ),
      ),
      PersistentBottomNavBarItem(
        icon: const Icon(Icons.search),
        title: "Search",
        inactiveColorPrimary:
            Theme.of(context).bottomNavigationBarTheme.unselectedItemColor,
        inactiveColorSecondary: Theme.of(context).primaryColorLight,
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: ConnectivityScreenWrapper(
        child: PersistentTabView(
          context,
          controller: _controller,
          screens: _buildScreens(),
          items: _navBarsItems(),
          confineInSafeArea: true,
          backgroundColor: Theme.of(context).backgroundColor,
          handleAndroidBackButtonPress: true,
          resizeToAvoidBottomInset: true,
          stateManagement: true,
          navBarHeight: MediaQuery.of(context).viewInsets.bottom > 0
              ? 0.0
              : kBottomNavigationBarHeight,
          hideNavigationBarWhenKeyboardShows: true,
          margin: const EdgeInsets.all(0.0),
          popActionScreens: PopActionScreensType.all,
          bottomScreenMargin: 0.0,
          selectedTabScreenContext: (context) {
            testContext = context;
          },
          hideNavigationBar: _hideNavBar,
          decoration: const NavBarDecoration(
            border: Border(
                top: BorderSide(
                    color: Colors.grey, width: 0.2, style: BorderStyle.solid)),
          ),
          popAllScreensOnTapOfSelectedTab: true,
          itemAnimationProperties: const ItemAnimationProperties(
            duration: Duration(milliseconds: 400),
            curve: Curves.ease,
          ),
          screenTransitionAnimation: const ScreenTransitionAnimation(
            animateTabTransition: true,
            curve: Curves.easeInOut,
            duration: Duration(milliseconds: 500),
          ),
          navBarStyle:
              NavBarStyle.style1, // Choose the nav bar style with this property
        ),
      ),
    );
  }
}
