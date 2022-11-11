import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import SimpleContactUs from "components/forms/SimpleContactUs";

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
     <SimpleContactUs/>
      <Footer />
    </AnimationRevealPage>
  );
};
