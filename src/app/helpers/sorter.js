const transactionServices = require('../../backend/services/transactionServices');
exports.sortTransactions = async (accountID, credits, debits) => {
    //combine two arrays into a new array?
    let transactions = credits.concat(debits);
    //Sort an array based on key value?               
    //sort an array based on key value?
    // Rearrange elements of the main array based on the sorted key-value array
    let ids = [];
    transactions.map(transaction => {
        ids = ids.concat(transaction.ID);
    });
    transactions = await transactionServices.findByIDs(ids, true, true);
    transactions.map(transaction => {
        if (transaction.debtorID == accountID) {
            transaction.amount = transaction.amount * -1;
        }
    });

    transactions.sort((a, b) => {
        if (a.ID < b.ID) {
            return 1;
        }
        if (a.ID > b.ID) {
            return -1;
        }
        return 0;
    });

    return transactions;
};