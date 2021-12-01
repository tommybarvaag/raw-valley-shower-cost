import * as SliderPrimitive from "@radix-ui/react-slider";
import { styled } from "stitches.config";

const RangeField = styled(SliderPrimitive.Root, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  width: 200,

  '&[data-orientation="horizontal"]': {
    height: 20
  },

  '&[data-orientation="vertical"]': {
    flexDirection: "column",
    width: 20,
    height: 100
  }
});

const RangeFieldTrack = styled(SliderPrimitive.Track, {
  backgroundColor: "$mainDark",
  position: "relative",
  flexGrow: 1,
  borderRadius: "9999px",

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 }
});

const RangeFieldRange = styled(SliderPrimitive.Range, {
  position: "absolute",
  backgroundColor: "white",
  borderRadius: "9999px",
  height: "100%"
});

const RangeFieldThumb = styled(SliderPrimitive.Thumb, {
  all: "unset",
  display: "block",
  width: 20,
  height: 20,
  backgroundColor: "white",
  boxShadow: "$rangeFieldThumb",
  borderRadius: "$round",
  position: "relative",
  "&:hover": { backgroundColor: "rgb(233, 233, 233)" },
  "&:focus": { boxShadow: "rgb(255 255 255 / 22%) 0px 0px 0px 5px" }
});

const RangeFieldValue = styled("div", {
  position: "absolute",
  top: "-20px",
  width: 20,
  height: 20,
  fontSize: "$1",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start"
});

export { RangeFieldTrack, RangeFieldRange, RangeFieldThumb, RangeFieldValue };
export default RangeField;
