import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import { format } from 'date-fns';

export const TransactionForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    description: initialData?.description || '',
    amount: initialData?.amount || '',
    type: initialData?.type || 'expense',
    date: initialData?.date ? format(initialData.date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        select
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
        fullWidth
      >
        <MenuItem value="income">Income</MenuItem>
        <MenuItem value="expense">Expense</MenuItem>
      </TextField>
      <TextField
        type="date"
        label="Date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" color="primary">
        {initialData ? 'Update' : 'Add'} Transaction
      </Button>
    </Box>
  );
};