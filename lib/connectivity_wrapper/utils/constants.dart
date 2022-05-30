// Flutter imports:
import 'package:flutter/material.dart';
import 'package:thitsarparami/connectivity_wrapper/widgets/connectivity_screen_wrapper.dart';

// Project imports:


/// More info on why default port is 53
/// here:
/// - https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers
/// - https://www.google.com/search?q=dns+server+port
// ignore: constant_identifier_names
const int DEFAULT_PORT = 53;

/// Default timeout is 10 seconds.
///
/// Timeout is the number of seconds before a request is dropped
/// and an address is considered unreachable
// ignore: constant_identifier_names
const Duration DEFAULT_TIMEOUT = Duration(seconds: 10);

/// Default interval is 2 seconds
///
/// Interval is the time between automatic checks
// ignore: constant_identifier_names
const Duration DEFAULT_INTERVAL = Duration(seconds: 2);

///default value for height
const double defaultHeight = 50.0;

///default padding
const EdgeInsetsGeometry defaultPadding = EdgeInsets.all(8.0);

///default message
const String disconnectedMessage =
    "အင်တာနက်ချိတ်ဆက်မှု မရှိပါ။";

///default message Style
const TextStyle defaultMessageStyle = TextStyle(
  fontSize: 15.0,
  color: Colors.white,
  inherit: false,
);

extension PositionOnScreenExtention on PositionOnScreen {
  bool get isTOP => this == PositionOnScreen.TOP;

  bool get isBOTTOM => this == PositionOnScreen.BOTTOM;

  double? top(double height, bool isOffline) {
    if (isTOP) {
      return isOffline ? 50 : (-height);
    }
    return null;
  }

  double? bottom(double height, bool isOffline) {
    if (isBOTTOM) {
      return isOffline ? 50 : (-height);
    }
    return null;
  }
}