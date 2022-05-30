// Flutter imports:
import 'package:flutter/material.dart';

// Package imports:
import 'package:provider/provider.dart';
import 'package:thitsarparami/connectivity_wrapper/connectivity_wrapper.dart';
import 'package:thitsarparami/connectivity_wrapper/utils/constants.dart';

enum PositionOnScreen {
  // ignore: constant_identifier_names
  TOP,
  // ignore: constant_identifier_names
  BOTTOM,
}

class ConnectivityScreenWrapper extends StatelessWidget {
  /// The [child] contained by the ConnectivityScreenWrapper.
  final Widget? child;

  /// The decoration to paint behind the [child].
  final Decoration? decoration;

  /// The color to paint behind the [child].
  final Color? color;

  /// Disconnected message.
  final String? message;

  /// If non-null, the style to use for this text.
  final TextStyle? messageStyle;

  /// widget height.
  final double? height;

  /// How to align the offline widget.
  final PositionOnScreen positionOnScreen;

  /// How to align the offline widget.
  final Duration? duration;

  /// Disable the user interaction with child widget
  final bool disableInteraction;

  /// Disable the user interaction with child widget
  final Widget? disableWidget;

  /// How the text should be aligned horizontally.
  final TextAlign? textAlign;

  const ConnectivityScreenWrapper({
    Key? key,
    this.child,
    this.color,
    this.decoration,
    this.message,
    this.messageStyle,
    this.height,
    this.textAlign,
    this.duration,
    this.positionOnScreen = PositionOnScreen.TOP,
    this.disableInteraction = false,
    this.disableWidget,
  })  : assert(
            color == null || decoration == null,
            'Cannot provide both a color and a decoration\n'
            'The color argument is just a shorthand for "decoration: new BoxDecoration(color: color)".'),
        super(key: key);

  @override
  Widget build(BuildContext context) {
    final bool isOffline = Provider.of<ConnectivityStatus>(context) !=
        ConnectivityStatus.CONNECTED;

    double newHeight = height ?? defaultHeight;

    final Widget offlineWidget = AnimatedPositioned(
      top: positionOnScreen.top(newHeight, isOffline),
      bottom: positionOnScreen.bottom(newHeight, isOffline),
      duration: duration ?? const Duration(milliseconds: 300),
      child: AnimatedContainer(
        height: newHeight,
        width: MediaQuery.of(context).size.width,
        decoration:
            decoration ?? BoxDecoration(color: color ?? Colors.red.shade500),
        duration: duration ?? const Duration(milliseconds: 300),
        child: Center(
          child: Text(
            message ?? disconnectedMessage,
            style: messageStyle ?? defaultMessageStyle,
            textAlign: textAlign,
          ),
        ),
      ),
    );

    return AbsorbPointer(
      absorbing: (disableInteraction && isOffline),
      child: Stack(
        children: (<Widget?>[
          if (child != null) child,
          if (disableInteraction && isOffline)
            if (disableWidget != null) disableWidget,
          offlineWidget,
        ].whereType<Widget>().toList()),
      ),
    );
  }
}
