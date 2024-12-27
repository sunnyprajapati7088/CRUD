import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import {TransactionForm} from './components/TransactionForm';
import {TransactionList} from './components/TransactionList';
import {EditTransactionModal} from './components/EditTransactionModal';
import { 
  addTransaction, 
  fetchTransactions, 
  updateTransaction, 
  deleteTransaction 
} from './services/transactionService';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (err) {
      setError('Failed to load transactions');
    }
  };

  const handleAddTransaction = async (formData) => {
    try {
      await addTransaction(formData);
      await loadTransactions();
    } catch (err) {
      setError('Failed to add transaction');
    }
  };

  const handleUpdateTransaction = async (formData) => {
    try {
      await updateTransaction(editingTransaction.id, formData);
      await loadTransactions();
      setEditingTransaction(null);
    } catch (err) {
      setError('Failed to update transaction');
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      await loadTransactions();
    } catch (err) {
      setError('Failed to delete transaction');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Transaction Management
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add New Transaction
          </Typography>
          <TransactionForm onSubmit={handleAddTransaction} />
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Transactions
          </Typography>
          <TransactionList
            transactions={transactions}
            onEdit={setEditingTransaction}
            onDelete={handleDeleteTransaction}
          />
        </Box>

        {editingTransaction && (
          <EditTransactionModal
            open={!!editingTransaction}
            onClose={() => setEditingTransaction(null)}
            onSubmit={handleUpdateTransaction}
            transaction={editingTransaction}
          />
        )}
      </Box>
    </Container>
  );
}

export default App;