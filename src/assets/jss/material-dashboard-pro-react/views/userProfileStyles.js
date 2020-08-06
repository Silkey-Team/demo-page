import {
  cardTitle,
  grayColor
} from "assets/jss/material-dashboard-pro-react.js";

import
  cardAvatarStyle
 from "assets/jss/material-dashboard-pro-react/components/cardAvatarStyle.js";

const userProfileStyles = {
  cardTitle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
    textAlign: "left",
    color: "#AAAAAA",
    "& small": {
      fontSize: "80%",
      fontWeight: "400"
    }
  },
  cardCategory: {
    marginTop: "10px",
    color: grayColor[0] + " !important",
    textAlign: "center"
  },
  description: {
    color: grayColor[0],
    textAlign: "left",
  },
  updateProfileButton: {
    float: "right"
  },
  cardAvatarProfile: {
    ...cardAvatarStyle.cardAvatarProfile,
    margin: "-90px auto 0",
  },
  inputLabel: {
    color: "#AAAAAA",
    textAlign: "left",
  }
};
export default userProfileStyles;
