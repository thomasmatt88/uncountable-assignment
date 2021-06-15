import { Menu, Button, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    fontSize: "15pt",
  },
});

const DropdownMenu = ({ type, menuItems, onSelectAxis }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = (event) => {
    const { myValue } = event.currentTarget.dataset;
    setAnchorEl(null);
    onSelectAxis(myValue);
  };

  return (
    <div>
      <Button
        className={classes.button}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Select {type}-Axis
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleItemClick}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={item} data-my-value={item} onClick={handleItemClick}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
