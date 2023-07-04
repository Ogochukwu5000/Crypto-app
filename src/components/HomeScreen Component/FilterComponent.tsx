import React, { memo } from "react";
import { Text, Pressable, StyleProp, ViewStyle } from "react-native";

interface FilterComponentProps {
  filterDay: string;
  filterText: string;
  selectedRange: string;
  setSelectedRange: (range: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const FilterComponent = ({
  filterDay,
  filterText,
  selectedRange,
  setSelectedRange,
  containerStyle,
}: FilterComponentProps): JSX.Element => {
  const isFilterSelected = (filter: string) => filter === selectedRange;

  return (
    <Pressable
      style={[
        {
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 5,
          backgroundColor: isFilterSelected(filterDay) ? "rgba(255, 255, 255, 0.2)" : "transparent",
        },
        containerStyle,
      ]}
      onPress={() => setSelectedRange(filterDay)}
    >
      <Text style={{ color: isFilterSelected(filterDay) ? "white" : "grey" }}>{filterText}</Text>
    </Pressable>
  );
};

export default memo(FilterComponent);