import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import AddMajorCategory from "../AddMajorCategory.jsx";

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
        <DialogTitle id="alert-dialog-slide-title">Add Category</DialogTitle>
        <DialogContent>
          <DialogContentText
            className="h-80 w-96"
            id="alert-dialog-slide-description"
          >
            <AddMajorCategory />
          </DialogContentText>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancle
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
