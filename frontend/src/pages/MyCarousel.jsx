import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MyCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const courseImages = [
  "https://appxcontent.kaxa.in/subject/2024-07-07-0.9522250790418232.png",
  "https://appxcontent.kaxa.in/subject/2024-07-05-0.8025085370209641.jpeg",
  "https://appxcontent.kaxa.in/subject/2024-07-05-0.3715048534115637.jpeg" 
  ];
  return (
    <div className="mt-20">
      <Carousel
        plugins={[plugin.current]}
        className="w-[100%]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {courseImages.map((image) => (
            <CarouselItem key={image}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex  items-center justify-center p-6">
                    <img
                      className="w-full h-auto object-cover rounded"
                      src={image}
                      alt="course-image"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      
      </Carousel>
    </div>
  );
};

export default MyCarousel;
