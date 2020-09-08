import express from 'express';
import transactionService from '../services/transactionService.js';

const transactionRouter = express.Router();

transactionRouter.get('/', async (req, res, next) => {
  try {
    if (!req.query['period']) {
      res.status(400).send({
        error: `It's necessary to inform \"period"\, which format should be yyyy-MM`,
      });
    }
    const { period } = req.query;
    const transactions = await transactionService.getTransactionByPeriod(
      period
    );
    res.status(200).send({ length: transactions.length, transactions });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        'An error occurred when getting transactions for specified period',
    });
  }
});

transactionRouter.post('/', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      res.status(400).send({
        error: `It's necessary to pass the data to add new transaction`,
      });
    } else {
      const newTransaction = req.body;
      const transaction = await transactionService.addTransaction(
        newTransaction
      );
      res.status(200).send(transaction);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || 'An error occurred when saving new transaction',
    });
  }
});

transactionRouter.put('/:id', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      res.status(400).send({
        error: `It's necessary to pass the data to add new transaction`,
      });
    } else {
      const id = req.params.id;
      const transaction = await transactionService.getTransactionById(id);
      if (!transaction.length) {
        res.status(404).send({ message: 'Transaction not found for update.' });
      } else {
        const transactionToUpdate = req.body;
        const updatedTransaction = await transactionService.updateTransaction(
          id,
          transactionToUpdate
        );
        res.status(200).send(updatedTransaction);
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || 'An error occurred when updating transaction',
    });
  }
});

transactionRouter.patch('/:id', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      res.status(400).send({
        error: `It's necessary to pass the data to add new transaction`,
      });
    } else {
      const id = req.params.id;
      const transaction = await transactionService.getTransactionById(id);
      if (!transaction.length) {
        res.status(404).send({ message: 'Transaction not found for update.' });
      } else {
        const patchTransaction = req.body;
        const updatedTransaction = await transactionService.updateTransaction(
          id,
          patchTransaction
        );
        res.status(200).send(updatedTransaction);
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || 'An error occurred when updating transaction',
    });
  }
});

transactionRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const transaction = await transactionService.getTransactionById(id);

    if (!transaction.length) {
      res.status(404).send({ message: 'Transaction not found for delete.' });
    } else {
      const deletedTransaction = await transactionService.deleteTransaction(id);
      res.status(200).send(deletedTransaction);
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || 'An error occurred when updating transaction',
    });
  }
});

export default transactionRouter;
