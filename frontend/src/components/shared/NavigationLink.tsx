import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  return (
    <Link className="nav-link" to={props.to} onClick={props.onClick}>
      <Button
        variant="contained"
        size="large"
        sx={{
          bgcolor: props.bg,
          color: props.textColor,
        }}
      >
        {props.text}
      </Button>
    </Link>
  );
};

export default NavigationLink;
