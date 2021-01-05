/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// sections for this page
import SectionDescription from "views/PresentationPage/Sections/SectionDescription.js";
import SectionComponents from "views/PresentationPage/Sections/SectionComponents.js";
import SectionCards from "views/PresentationPage/Sections/SectionCards.js";
import SectionContent from "views/PresentationPage/Sections/SectionContent.js";
import SectionOverview from "views/PresentationPage/Sections/SectionOverview.js";

import presentationStyle from "assets/jss/material-kit-pro-react/views/presentationStyle.js";

import { version } from "../../../package.json";

const useStyles = makeStyles(presentationStyle);

export default function PresentationPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <div>
      <Header
        brand="Silkey DEMO Page"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "info",
        }}
      />
      <Parallax image={require("assets/img/bg4.jpg")} className={classes.parallax}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1>
                  Silkey DEMO Page
                  <span className={classes.proBadge}>PRO</span>
                </h1>
                <h3 className={classes.title}>A Badass Material-UI Kit based on Material Design.</h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <SectionDescription />
        <SectionComponents />
        <SectionCards />
        <SectionContent />
        <SectionOverview />
      </div>
      <Footer
        theme="white"
        content={
          <div>
            <div className={classes.left}>
              <a href="https://silkey.io" target="_blank" className={classes.footerBrand}>
                Silkey Home Page
              </a>
            </div>
            <div className={classes.right}>
              <a href="https://silkey.io" target="_blank" className={classes.footerBrand}>
                {`v${version} ${process.env.REACT_APP_ENV !== "production" ? `[${process.env.REACT_APP_ENV}]` : ""}`}
              </a>
            </div>
          </div>
        }
      />
    </div>
  );
}
