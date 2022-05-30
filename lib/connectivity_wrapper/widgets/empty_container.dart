// Flutter imports:
import 'package:flutter/material.dart';

class EmptyContainer extends StatelessWidget {
  const EmptyContainer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const SizedBox(
      width: 0.0,
      height: 0.0,
    );
  }
}