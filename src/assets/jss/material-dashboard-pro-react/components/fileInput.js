const button = {
  display: "none",
  position: "absolute",
  bottom: "8px",
  padding: "8px",
  "& svg": {
    marginRight: "0px",
  },
}

const fileInputStyle = {
  fileinput: {
    position: "relative",
    zIndex: "3",
    "&:hover": {
      "& button": {
        display: "block"
      }
    }
  },
  input: {
    display: "none"
  },
  thumbnail: {
    width: "130px !important",
    height: "130px !important",
    objectFit: "cover",
  },
  buttonWrapper: {
    position: "relative",
    zIndex: "3"
  },
  addButton: {
    ...button,
    left: "calc(50% - 19px)",
  },
  changeButton: {
    ...button,
    left: "calc(50% - 38px - 5px)",
  },
  removeButton: {
    ...button,
    left: "calc(50% + 5px)",
  }
};

export default fileInputStyle;
