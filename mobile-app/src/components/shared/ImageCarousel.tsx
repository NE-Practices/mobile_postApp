import * as React from "react";
import {
  Image,
  View,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProductCarouselProps {
  images: ImageSourcePropType[];
  renderItem?: (item: {
    index: number;
    item: ImageSourcePropType;
  }) => JSX.Element;
}

function ImageCarousel({ images, renderItem }: ProductCarouselProps) {
  const width = useWindowDimensions().width;
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <SafeAreaView className="flex-col h-80 mt-4 relative items-center">
      <Carousel
        loop
        width={width}
        height={width / 1.3}
        autoPlay
        data={images}
        scrollAnimationDuration={2000}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item, index }) =>
          renderItem ? (
            renderItem({ item, index })
          ) : (
            <Image
              key={index}
              resizeMode="cover"
              className="w-full h-full"
              source={item}
            />
          )
        }
        key={images.length}
      />
      <View className="flex-row absolute bottom-2 gap-x-2">
        {images.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 mt-2 rounded-full ${
              index === activeIndex ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

export default ImageCarousel;
