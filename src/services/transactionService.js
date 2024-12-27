import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const COLLECTION_NAME = 'transactions';

export const addTransaction = async (transaction) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...transaction,
      date: new Date(transaction.date),
      amount: Number(transaction.amount),
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const fetchTransactions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate()
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const updateTransaction = async (id, updatedData) => {
  try {
    const transactionRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(transactionRef, {
      ...updatedData,
      date: new Date(updatedData.date),
      amount: Number(updatedData.amount),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};