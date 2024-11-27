import { Button } from "@mui/material";

type Props = {
  value: any;
};

const CopyToClipBoard = (props: Props) => {
  const { value } = props;

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <Button
      variant="outlined"
      onClick={copyToClipBoard}
      size="large"
      sx={{ float: "right" }}
    >
      Copy Code
    </Button>
  );
};

export default CopyToClipBoard;
