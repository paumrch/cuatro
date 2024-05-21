import AnimatedVideo from "./animated/AnimatedVideo";
import { getHomePageData } from "../lib/api";
import AnimatedElement from "./AnimatedElement";

export default async function Hero({ preview }) {
  const homeData = await getHomePageData(preview);
  const homeHeading = homeData.pages.nodes[0].home.heading;
  const homeSubheading = homeData.pages.nodes[0].home.subheading;

  return (
    <div className="mx-auto px-6 pb-8 lg:px-8">
      <div className="relative isolate pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto">
            <div className="mx-auto text-left">
              <AnimatedElement animation={{ duration: 1 }} delay={1}>
                <p className="mt-6 text-3xl">
                  <span className="font-medium">{homeHeading}</span>
                  <br />
                  {homeSubheading}
                </p>
              </AnimatedElement>
            </div>
            <div className="mt-16 flow-root sm:mt-24 object-contain">
              <AnimatedVideo />
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
}
