import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  setOpenCheck,
  openCheck,
  quantityPass,
}) {
  console.log(quantityPass);
  return (
    <div>
      <Dialog
        open={openCheck}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenCheck(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          You are not logged In
        </DialogTitle>
        <DialogContent>
          {quantityPass.map((item) => (
            <div className="flex justify-around items-center">
              <h1 className="text-gray-600">
                Item "{item.title}" Out of stock (sold out), please remove it
                from cart and try again{" "}
              </h1>
            </div>
          ))}
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCheck(false)} color="primary">
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
