import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useToggle from "../../hooks/useToggle";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  const { toggleHandler, isToggle } = useToggle();


  return (
    <TextField
      margin="normal"
      InputLabelProps={{
        style: {
          color: "#1976d2",
        },
      }}
      name={props.name}
      label={props.label}
      type={isToggle ? "password" : "text"}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "#1976d2",
        },

        endAdornment: (
          <InputAdornment position="end">
            {props.type === "password" && (
              <IconButton
                aria-label={
                  props.type ? "hide the password" : "display the password"
                }
                onClick={toggleHandler}
                edge="end"
              >
                {isToggle ? (
                  <VisibilityOff color="primary" />
                ) : (
                  <Visibility color="primary" />
                )}
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomizedInput;
