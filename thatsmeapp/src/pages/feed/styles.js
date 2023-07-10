import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";

export const StyledIconButtonFavoriteIcon = styled(IconButton)(() => ({
  backgroundColor: "transparent",
  color: "white",
  margin: "10px",
  "&:hover": {
    backgroundColor: "rgba(255, 79, 121, 0.7)",
  },
}));

export const StyledIconFavoriteIconPositive = styled(FavoriteIcon)(() => ({
  color: "#FF4F79", 
}));

/* export const AnimationCard = styled(Card)(() => ({
  maxWidth: 345,
  marginTop: "30px",
  backgroundColor: "rgba(245, 245, 245, 0.1)",
  filter: "grayscale(100%)",
  borderRight: "2px solid transparent",
  borderBottom: "2px solid transparent",
  borderTop: "2px solid transparent",
  transition: "transform 0.3s ease-in-out, border-color 0.5s ease-in-out",
  transform: "scaleX(0.95)",
  "&:hover": {
    transform: "scale(1)",
    filter: "grayscale(0%)",
    borderColor: "#F5F5F5",
  },
  "&:hover::after": {
    animation: "$showBorder 0.5s ease-in-out forwards",
  },
  "@keyframes showBorder": {
    "0%": {
      borderRightColor: "transparent",
      borderBottomColor: "transparent",
      borderTopColor: "transparent",
    },
    "100%": {
      borderRightColor: "#F5F5F5",
      borderBottomColor: "#F5F5F5",
      borderTopColor: "#F5F5F5",
    },
  },
})); */

export const AnimationCard = styled(Card)(() => ({
  marginTop: "3rem",
  width: "360px",
  borderRadius: '15px',
  backgroundColor: "transparent",
  border: "1px solid rgba(245, 245, 245, 0.4)",
  transition: "transform 0.3s ease-in-out, border-color 0.3s ease-in-out",
  "&:hover": {
    borderColor: "#F5F5F5",
  },
  "&:hover::after": {
    animation: "$showBorder 0.5s ease-in-out forwards",
  },
  /*  "@keyframes showBorder": {
    "0%": {
      borderRightColor: "transparent",
      borderBottomColor: "transparent",
      borderTopColor: "transparent",
    },
    "100%": {
      borderRightColor: "#F5F5F5",
      borderBottomColor: "#F5F5F5",
      borderTopColor: "#F5F5F5",
    },
  },
  , */
  "@media (max-width: 1000px)": {
    width: "260px",
    marginTop: "30px",
  },
}));