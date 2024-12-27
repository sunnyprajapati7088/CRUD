import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import {TransactionForm} from './TransactionForm';

export const EditTransactionModal = ({ open, onClose, onSubmit, transaction }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Transaction</DialogTitle>
      <DialogContent>
        <TransactionForm
          initialData={transaction} 
          onSubmit={(formData) => {
            onSubmit(formData);
            onClose();
          }} 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};