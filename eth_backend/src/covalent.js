const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
require('dotenv').config();
let api_key = 'ckey_50495a40ea56443893e45c79ba7';

const serviceAccount = require('X://GitHub//CrYnTr//eth_backend//src//ethind-2a7d7-firebase-adminsdk-1v2f0-c30336a8d1.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const getwbal = async function (walletaddress,chain) {
 let Ids ;
    switch (chain){
        case '0': Ids = '1';break; //eth main
        case '1': Ids = '80001'; break; //polygon test
        case '2': Ids = '137';break; //polygon main
        case '3': Ids = '56';break; //binance main
        case '4': Ids = '1284';break; //Moonbeam main
    }

    const resp = await fetch (
        'https://api.covalenthq.com/v1/'+Ids+'/address/'+walletaddress+'/balances_v2/?key='+api_key+'');

    var dat = await resp.json();
    console.log(dat);
    var final_name = [];
    var final_symbol = [];
    var final_balance = []; 
    var final_usd = []; 
    for(var i = 0;i < dat.data.items.length; i++){
        
        final_name.push(dat.data.items[i].contract_name);
        final_symbol.push(dat.data.items[i].contract_ticker_symbol);
        final_balance.push(dat.data.items[i].balance);
        final_usd.push(dat.data.items[i].quote);
    } 
    return [final_name,final_symbol,final_balance,final_usd];
    };

const newaddr = async function (walletaddress) {
    const address =   walletaddress; 
    const docRef = db.collection('users').doc(walletaddress);
    output = await getwbal(walletaddress,'1');
    await docRef.set({
    'Currencies': output[0],
    'Symbols' : output[1],
    'balance' : output[2],
    'usd' : output[3]
    });       
       };
const getdata = async function (walletaddress) {
    const user = db.collection('users').doc(walletaddress);
    // Create a query against the collection
    user.orderByChild('height').on('child_added', (snapshot) => {
        console.log(snapshot.key + ' was ' + snapshot.val().height + ' meters tall');
      });
    users = await user.get();

    return [users.val().Currencies,users.val().Symbols,users.val().balance,users.val().usd];
    //return [users];
           };

// name,symbol,balance,
    module.exports = {
        getwbal,newaddr,getdata
     }