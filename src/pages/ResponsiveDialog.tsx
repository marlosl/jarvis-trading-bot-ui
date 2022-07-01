import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface Props {
  title: string;
  contentText: string;
  confirmLabel: string;
  cancelLabel: string;
  opened: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ResponsiveDialog: FC<Props> = (props) => {
  const [isOpened, setOpened] = React.useState<boolean>(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleConfirm = () => {
    props.onConfirm();
    setOpened(false);
  };

  const handleCancel = () => {
    props.onCancel();
    setOpened(false);
  };

  return (
      <Dialog
        fullScreen={fullScreen}
        open={props.opened}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            {props.cancelLabel}
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            {props.confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default ResponsiveDialog;