import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Blog from "components/blogs/ThreeColSimpleWithImage.js";
import Footer from "components/footers/MiniCenteredFooter.js";

export default () => (
  <AnimationRevealPage>
    <Header />
    <Blog />
    <Footer />
  </AnimationRevealPage>
);
