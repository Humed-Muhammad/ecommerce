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

export default function AlertDialogSlide({ setOpen, open }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          You are not logged In
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you don't have an account{" "}
            <Link to="/register" className="border-b-2 border-gray-700 px-2">
              Register
            </Link>{" "}
            or{" "}
            <Link to="/login" className="border-b-2 border-blue-500 px-2">
              Login
            </Link>{" "}
            If you have!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
