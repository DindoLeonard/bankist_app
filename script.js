'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90, -200, -50],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Dindo Leonard',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 5555,
};

const account6 = {
  owner: 'France Cabrera',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.2, // %
  pin: 6666,
};

const account7 = {
  owner: 'Zac Salazar',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30, 400, 300],
  interestRate: 1.2, // %
  pin: 7777,
};

const account8 = {
  owner: 'Jam Jaramilla',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -90],
  interestRate: 1.2, // %
  pin: 8888,
};

const accounts = [
  account1,
  account2,
  account3,
  account4,
  account5,
  account6,
  account7,
  account8,
];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// it is a good practice to always put variables inside a function rather than doing it globally

///////////// DISPLAY MOVEMENTS
function displayMovements(movements, sort = false) {
  // sort in here we toggle the sort method if sort is true, and continue with the movements variable if sort value is false(by default)
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // clearing the default html in the containerHTML, which is the example template by assigning it with blank string
  containerMovements.innerHTML = ``;
  // doing a forEach array function for each value
  movs.forEach(function (mov, i) {
    // creating a dynamic string to insert in the dynamic html template of either it will be positive(deposit) or negative(withdrawal)
    const type = mov > 0 ? `deposit` : `withdrawal`;
    // making a dynamic html template for every variable to insert inside the div element
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;
    // the inserAdjacentHTML is a function to insert a string html template inside the html element.
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

// calling out the displayMovements function which takes the account1 object with it's key movements which gives an array of transactions/numbers
// displayMovements(account1.movements);
// way to display the current html elements that was added in the containerMovement <div> element.
console.log(containerMovements.innerHTML);

////////////////// DISPLAY BALANCE
// created a function that takes an array then uses array.reduce method to return the sum of all elements in the array
const calcDisplayBalance = function (acc) {
  currentAccount.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${currentAccount.balance} Php`;
};

//////////////////////// DISPLAY SUMMARY
const calcDisplaySummary = function (acc) {
  // display the total deposits in the "IN" text content
  const incomes = acc.movements
    // first filter all the deposits(positive numbers)
    .filter(mov => mov > 0)
    // then get the sum by doing the array reduce method
    .reduce((acc, curr) => acc + curr);
  //then change the text content of the label in the dom
  labelSumIn.textContent = `${incomes} Php`;

  const out = acc.movements
    // first filter all the withdrawals(positive numbers)
    .filter(mov => mov < 0)
    // then get the sum by doing the array reduce method
    .reduce((acc, curr) => acc + curr, 0);
  //then change the text content of the label in the dom
  labelSumOut.textContent = `${Math.abs(out)} Php`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(deposits => deposits >= 1)
    .reduce((acc, curr) => acc + curr);

  labelSumInterest.textContent = `${interest} Php`;
};
/////////////////// UPDATE UI
function updateUI(acc) {
  // display movements
  displayMovements(acc.movements);
  // display total
  calcDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
}

/////////////////// CREATING ACCOUNTS
// create a function that takes the array of accounts to create a username with their initials in lowercase
function createAccounts(accs) {
  // used for each to iterate to the accounts array
  accs.forEach(function (user) {
    // created a new property with each object that was iterated
    user.username = user.owner
      // converted to lowercase
      .toLowerCase()
      // split the name to create a list with the first name and last name
      .split(' ')
      // maping each to return only the first letter
      .map(name => name[0])
      // join all the first letter array to form a string
      .join('');
  });
}

createAccounts(accounts);
console.log(accounts);
//////// EVENT HANDLERS
let currentAccount;

///////////////// LOGIN
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();
  // get account
  currentAccount = accounts.find(
    element => element.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  console.log(currentAccount?.pin);
  // go through pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI
    document.querySelector('.app').style.opacity = 100;
    labelWelcome.textContent = `Welcome, ${currentAccount.owner}`;
    // clear input
    inputLoginUsername.value = ``;
    inputLoginPin.value = ``;
    inputLoginPin.blur();

    // update UI
    updateUI(currentAccount);
  }
});

///////////// TRANSFERING

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();

  const recepient = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  const amount = Number(inputTransferAmount.value);
  console.log(recepient);

  // const currentAmount = currentAccount.movements.reduce(
  //   (acc, curr) => acc + curr,
  //   0
  // );

  if (
    recepient &&
    currentAccount.balance > 0 &&
    inputTransferTo.value !== currentAccount.username
  ) {
    currentAccount?.movements.push(amount * -1);
    recepient?.movements.push(amount);
  }
  // minus ammount to current account logged in.
  // if(currentAccount > 0)
  // add ammount to the recepient
  // clear entries
  inputTransferAmount.value = ``;
  inputTransferTo.value = ``;
  inputTransferAmount.blur();
  // update UI
  updateUI(currentAccount);
});

//////////////// CLOSE ACCOUNT
btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  const account = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  if (account === currentAccount.username && pin === currentAccount.pin) {
    const index = accounts.findIndex(function (acc) {
      return acc.username === account;
    });
    accounts.splice(index, 1);
  }
  console.log(accounts);
  // hide UI
  containerApp.style.opacity = 0;
  // clear close account entries
  inputCloseUsername.value = inputClosePin.value = ``;
  inputClosePin.blur();
});

/////////////// REQUEST LOAN
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (currentAccount.movements.some(mov => mov > amount * 0.1)) {
    console.log('accepted');
    currentAccount.movements.push(amount);
  }
  inputLoanAmount.value = ``;
  inputLoanAmount.blur();
  updateUI(currentAccount);
});

let sortStats = false; // setting a default sortStat to false so that when I use it, I will simply type "!sortStats"
/////////////// SORTING
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovements(currentAccount.movements, !sortStats);
  // the 2nd paramets is oposite of current sortStats=false, will result to !sortStats == true
  sortStats = !sortStats; // flip the current global sortStats value to oposite
  // it will then create a toggle if button is pressed.
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////////////////

/*
/////////////////////////////////////////////////////////////////// SIMPLE ARRAY METHOD

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE METHOD
const x = arr.slice(1, 4); // start point and end point
console.log(x); // end parameter is not going to be included
// length will be difference of end and start
console.log(arr.slice(-3)); // it will start from the "c"
console.log(arr.slice(1, -2)); // ["b", "c"]

// SPLICE
// does mutate the orignal array
console.log(arr.splice(2)); // ["c","d","e"]
console.log(arr); // ["a","b"]
const n = arr.splice(-1);
// it takes the value that was splice and leaves out the remaining
// kinda like list.pop() on python
console.log(n); // you can assign the value that was spliced to a variable.

// REVERSE
// does mutate the orignal array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //  will return a reversed order array
console.log(arr2); // the array is now reverse and mutated the original array

// CONCAT
// doesn't mutate the original array
const letters = arr.concat(arr2); // join/concat the array
console.log(letters);
console.log([...arr, ...arr2]); // same as concat

// JOIN
console.log(letters.join('-'));
// join the array with the "-" in between each element


/////////////////////////////////////////////////////////////////// LOOPING ARRAY : forEach()

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i}: You withdrew ${Math.abs(movement)}`);
  }
}
console.log('-----FOR EACH-----');
// for each is like a for loop
// saves the variable as a parameter inside the function
// forEach pre-defined parameters (currentElement, index, array) the array will be separated by commas
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index}: You withdrew ${Math.abs(movement)}`);
  }
}); // same as the for loop at top

// forEach doesn't have a way to break from loop compared to for loop.


// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// currencies.set('what', 'ok'); // way to add new key/value to a Map

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
  console.log(map);
});

// SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique); // will only return 3 values, doesn't do duplicates

currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`); // USD: USD
}); // doesn't have keys,

*/

/*
///////////////////////////////////////////////////////////////////////// CODING CHALLENGE #1

Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
�
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far �
GOOD LUCK �



const julia = [3, 5, 2, 12, 7];
const kate = [4, 1, 15, 8, 3];
const juliaCorrected = julia.slice(1, -2);

function checkDogs(arr1, arr2) {
  const newArr = [...arr1, ...arr2];
  newArr.forEach(function (dogAge, i) {
    const dogResult =
      dogAge >= 3
        ? `Dog number ${i} is an adult, and is ${dogAge} years old`
        : `Dog number ${i} is still a puppy`;
    console.log(dogResult);
  });
}

checkDogs(juliaCorrected, kate);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);


///////////////////////////////////////////////////////////////////////// DATA TRANSFORMATION WITH MAP, FILTER and REDUCE

// MAP

const eurToUsd = 1.1;

// in here we use the conventional way of doing a functional map method for arrays
const eurToUsdArray = movements.map(function (mov) {
  return mov * eurToUsd;
});
console.log(movements);
console.log(eurToUsdArray);

// here we are using a simple forloop method to create a new array which is declared as an empty array
const eurToUsdFor = [];
for (const mov of movements) {
  eurToUsdFor.push(mov * eurToUsd);
}
console.log(eurToUsdFor);

// in here we are using an arrow method of map function
const eurToUsdArrow = movements.map(mov => mov * eurToUsd);
console.log(eurToUsdArrow);

// inside the map you can declare the value and the index then after the arrow the value will be returned as an element of the new Array
const newMovementMap = movements.map(
  (mov, i) =>
    `Movement ${i}: You ${mov > 0 ? `deposited` : `widthrew`} ${Math.abs(mov)}`
);

console.log(newMovementMap);


// FILTER

const deposits = movements.filter(function (item) {
  return item < 0;
});

// arrow function is actually nice too
const deposits1 = movements.filter(mov => mov > 0);
console.log(deposits1);

const depFor = [];
for (const item of movements) {
  if (item > 0) {
    depFor.push(item);
  }
}

console.log(depFor);

const w = movements.filter(item => item < 0);
console.log(w);




// REDUCE

console.log(movements);

const sum = movements.reduce(
  (accumulator, current) => accumulator + current,
  0
);
console.log(sum);
const max = movements.reduce(
  (accumulator, current) => (accumulator > current ? accumulator : current),
  movements[0]
);
console.log(max);
const max2 = movements.reduce(function (accumulator, current) {
  let x = 0;
  if (accumulator > current) {
    x = accumulator;
  } else if (accumulator < current) {
    x = current;
  }
  return x;
}, movements[0]);

console.log(max2);

const maxNormal = movements.reduce(function (acc, curr) {
  let x = 0;
  if (acc > curr) {
    x = acc;
  } else {
    x = curr;
  }
  return x;
}, movements[0]);
console.log(maxNormal);
*/
/*
///////////////////////////////////////////////////////////////////////////// CODING CHALLENGE #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages �)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK �


const calcAverageHumanAge = function (dogAge) {
  let dogIndex = 0;
  const humanAge =
    dogAge
      .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
      .filter(age => age > 18)
      .reduce(function (acc, curr, i) {
        let x = acc + curr;
        dogIndex = i + 1;
        return x;
      }) / dogIndex;
  console.log(humanAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/

///////////////////////////////////////////////////////////////////////////// CODING CHALLENGE #3

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages �)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK �


const cHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, curr, i, arr) => {
      console.log(arr);
      return acc + curr / arr.length;
    }, 0); // if you won't put the "0" initial value, it will start with the first element in the array and skip it.

const x = cHumanAge([5, 2, 4, 1, 15, 8, 3]);
const x2 = cHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(x, x2);

///////////////////////////////////////////////////////////////////////////// THE FIND METHOD
// find will return the element, while filter return an array
// it will return the first one that suits the conditional
const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);
console.log(accounts);

// retrevies the whole account/object by only using the property of the object to find it.
// find method is like a hound which you give them a condition to sniff to find whatever you wanted to loo for
const account = accounts.find(acc => acc.owner === 'Jessica Davis');

console.log(account);


///////////////////////////////////////////////////////////////////////////// SOME AND EVERY

console.log(movements);
// [200, 450, -400, 3000, -650, -130, 70, 1300]

// EQUALITY
console.log(movements.includes(-130)); // true

// SOME: CONDITION
const someExample = movements.some(function (some) {
  return some > 0;
});
console.log(someExample); // true
console.log(movements.some(mov => mov === -130)); // true
console.log(
  movements.some(function (movement) {
    return movement === 5000;
  })
); // false

// EVERY: CONDITION
const everyExample = account4.movements.every(mov => mov > 0); // true
console.log(everyExample);

console.log(
  movements.every(function (mov) {
    return mov > 0;
  })
); // false

// SEPARATE CALLBACK
const deposit = mov => mov < 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));


///////////////////////////////////////////////////////////////////////////// FLAT AND FLATMAP

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], 4, [5, 6], 7, 8];
console.log(arrDeep.flat()); // has a default of 1
console.log(arrDeep.flat(2)); // goes 1 depth deeper to flat

// flat
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, curr) => acc + curr, 0);

console.log(overallBalance);

// flatMap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce(function (acc, curr) {
    return acc + curr;
  });
console.log(overallBalance2);



///////////////////////////////////////////////////////////////////////////// SORTING ARRAYS

// STRINGS
const owners = ['Dindo', 'France', 'Zack', 'Jam'];
// console.log(owners.sort());
// console.log(owners);
console.log(owners);
function arrSort(arr) {
  const y = [...arr].sort(); // this is how to clone an array without affecting the original reference
  console.log(y);
}
arrSort(owners); // will log out the new array
console.log(owners); // it did not affect the original array

// NUMBERS
console.log(movements);
console.log(movements.sort());

// return > 0 = don't change ; this means 1 (switch order)
// return < 0 = change places this means -1 (keep order)

// ASCENDING
// movements.sort(function (a, b) {
//   if (a > b) {
//     return 1;
//   }
//   if (b > a) {
//     return -1;
//   }
// });
movements.sort(function (a, b) {
  return a - b; // answer will be negative if "a" is lesser than "b", if return with positive it will switch the order of a and b; if not will keep the order
});

console.log(movements);

// DESCENDING
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
// console.log(movements);

movements.sort((a, b) => b - a);
console.log(movements);

// if result will give (<0): it will keep order, if(>0): it will switch order
movements.sort(function (a, b) {
  return a - b;
}); // will sort in ascending manner

movements.sort((a, b) => b - a); // will sort in descending manner



const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// console.log(new Array([...x, ...z])); // creating a new Array

//// EMPTY ARRAYS + FILL METHOD
const x = new Array(7); // will create an array with 7 empty elements
// if you only pass 1 argument
console.log(x);
// console.log(x.map(item => 1)); // does nothing
console.log(x.fill(3, 3, 5)); // (element, start, end)
// [empty × 3, 3, 3, empty × 2]
console.log(x.fill(3)); // will fill array with "3"
// [3, 3, 3, 3, 3, 3, 3]
console.log(arr.fill(96, 2, 6));

//// Array.from
const y = Array.from({ length: 6 }, function () {
  return 1;
});
console.log(y); // will return an array of 1 with the length of 6
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // from({length: n},(throaway, index) => **args to return)

const diceRoll = Array.from({ length: 100 }, (_, i) => i + 1);
console.log(diceRoll); // created an Array with 100 diceroll

const t = arr.map((curr, i, arr) => curr * 2);
console.log(t); // refresher for map

labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent)
  );

  console.log(movementUI.sort((a, b) => a - b));
}); // creating new array from a DOM element

const u = Array.from(arr, function (arr) {
  return arr * 3;
}); // Array.from(element, callback function)
console.log(u); // creating new array from an element



///////////////////////////////////////////////////////////////////////////// EXERCISES /////////////////////////////////////////////////////////////////////////////

// 1.
// get sum of movements property in accounts Object array
// map+flat+filter+reduce arrow function combo
const bankDepositSum = accounts
  .map(acc => acc.movements)
  .flat()
  .filter(num => num > 0)
  .reduce((accu, curr) => accu + curr, 0);

console.log(bankDepositSum);

// same as above
// map+flat+filter+reduce function combo
const bankDS2 = accounts
  .map(function (acc) {
    return acc.movements;
  })
  .flat()
  .filter(num => num > 0)
  .reduce(function (accumulator, current) {
    return accumulator + current;
  }, 0);
console.log(bankDS2);

// same as the former
// flatMap+flat+filter+reduce
const bankDS3 = accounts
  .flatMap(acc => acc.movements)
  .filter(num => num > 0)
  .reduce((acc, curr) => acc + curr, 0);
console.log(bankDS3);

// 2.
const numDeposits1000 = accounts
  .map(acc => acc.movements)
  .flat()
  .filter(mov => mov >= 1000).length;

console.log(numDeposits1000);

// getting the length of elements that are more than 1000
// adding the index as accumulator //somehow it works
const numD1000 = accounts
  .flatMap(acc => movements.reduce)
  .reduce((acc, curr, i) => acc + i, 0);
console.log(numD1000);

// getting the length of elements that are more than 1000
const numD1000a = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, curr) => (curr >= 1000 ? acc + 1 : acc), 0);
console.log(numD1000a);

// prefix ++
let p = 13;
console.log(++p);
console.log(p++); // still the same because it was added after it was printed
console.log(p);

// 3.
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (acc, curr) => {
      curr > 0 ? (acc.deposits += curr) : (acc.widthrawals += curr);
      return acc;
    },
    { deposits: 0, widthrawals: 0 }
  );
console.log(sums);

// Can still do a deconstructuring method to get the variable value of deposits and sum
const { deposits, widthrawals } = sums;
console.log(deposits, widthrawals);

// here we doing it like the former but is using the bracket notation instead of dot notation
// you can add new variable in deconstruction with this
const { deposits2: d2, withrawals2: w2 } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (acc, curr) => {
      acc[curr > 0 ? 'deposits2' : 'withrawals2'] += curr;
      return acc; // NEVER FORGET RETURN IF CURLY BRACE
    },
    { deposits2: 0, withrawals2: 0 }
  );

console.log(d2, w2);

// 4.

function converToTitle(string) {
  return string
    .split(' ')
    .map(str => {
      if (str !== 'a' && str !== 'am') {
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
      } else {
        return str;
      }
    })
    .join(' ');
}

console.log(converToTitle('diNDo leonard'));

let r = 'I am dindo leonard, a programmer CEO';

console.log(converToTitle(r));

// this is another function that does more than the former
const converTitleCase = function (title) {
  // separate function for purely capitalization of word
  const capitalize = word => word[0].toUpperCase() + word.slice(1);
  // adding an exception list for words that should not be capitalized in sentence
  const exceptions = [
    'and',
    'a',
    'an',
    'the',
    'but',
    'or',
    'on',
    'in',
    'with',
    'is',
  ];
  // created a variable for the title cased sentence
  const titleCase = title
    .toLowerCase() // convert all to lowercase
    .split(' ') // split every word with space as seprator to an array
    .map(word => (exceptions.includes(word) ? word : capitalize(word))) // if word is in exception it won't do capitalize function, if it isn't then does capitalize function
    .join(' '); // join all the array of strings into a string with space in between
  return capitalize(titleCase);
};

console.log(converTitleCase('this is a nice title'));
console.log(converTitleCase('this is a LONG title but not too long'));
console.log(converTitleCase('and here is another title with an EXAMPLE'));
*/

/*

///////////////////////////////////////////////////////////////////////////// CODING CHALLENGE #3


Julia and Kate are still studying dogs, and this time they are studying if dogs are
eating too much or too little.
Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10%
above and 10% below the recommended portion (see hint).

Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) �
3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"
5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects �)

Hints:
§ Use many different tools to solve these challenges, you can use the summary
lecture to choose between them �
§ Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion

Test data:

 const dogs = [
 { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
 { weight: 8, curFood: 200, owners: ['Matilda'] },
 { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
 { weight: 32, curFood: 340, owners: ['Michael'] },
 ];

*/
/* 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg) */

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
console.log(dogs);

const getRecommendedFood = function (dogsArr) {
  dogs.forEach(function (owner) {
    owner.recommendedFood = Math.trunc(owner.weight ** 0.75 * 28);
  });
};

getRecommendedFood(dogs);

/*  2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) � */

function dogSarahEat(dogsArr) {
  const dogSarah = dogsArr.find(item => item.owners.includes('Sarah'));
  const eatMuch =
    dogSarah.curFood > dogSarah.recommendedFood * 0.9 &&
    dogSarah.curFood < dogSarah.recommendedFood * 1.1
      ? 'Dog is ok'
      : 'Dog is eating too much';

  console.log(eatMuch);
}
dogSarahEat(dogs);
/*
 3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle'). */

const ownersEatTooMuch = [];
const ownersEatTooLittle = [];

function createArrayOwner(dogsArr) {
  const eatTooMuch = dogsArr
    .map(dog => dog)
    .filter(item => item.curFood > item.recommendedFood)
    .map(item => item.owners)
    .flat();
  ownersEatTooMuch.push(...eatTooMuch);
  const eatTooLittle = dogsArr
    .map(dog => dog)
    .filter(item => item.curFood < item.recommendedFood)
    .map(item => item.owners)
    .flat();
  ownersEatTooLittle.push(...eatTooLittle);
}

createArrayOwner(dogs);
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

/*
4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"
*/
// here is the simple version
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// here is the dynamic version
const logString = function (arr1, arr2) {
  let eatMuchLatter = ``;
  let eatLittleLatter = ``;
  arr1.slice(1).forEach(function (person) {
    eatMuchLatter += ` and ${person}`;
  });
  arr2.slice(1).forEach(function (person) {
    eatLittleLatter += ` and ${person}`;
  });
  const eatMuch = `${arr1[0]}${eatMuchLatter}'s dogs eat too much!`;
  const eatLittle = `${arr2[0]}${eatLittleLatter}'s dogs eat too little!`;
  console.log(eatMuch);
  console.log(eatLittle);
};

logString(ownersEatTooMuch, ownersEatTooLittle);

/*
5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)
*/

function dogEatExact(dogs) {
  return dogs.some(dog => dog.curFood === dog.recommendedFood);
}
console.log(dogEatExact(dogs));

/*
6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)
*/
function dogFindOkey(dog) {
  return (
    dog.curFood < dog.recommendedFood * 1.1 &&
    dog.curFood > dog.recommendedFood * 0.9
  );
}
function dogEatOkey(dogs) {
  return dogs.some(dog => dogFindOkey(dog));
}
console.log(dogEatOkey(dogs));

/*
7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)
*/

function dogsOkeyArr(dogs) {
  return dogs.find(dog => dogFindOkey(dog));
}
const okeyArr = [dogsOkeyArr(dogs)];
console.log(okeyArr);

/*
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects �)
*/

const newDogArr = dogs
  .slice(0)
  .sort((first, second) => first.recommendedFood - second.recommendedFood);

console.log(newDogArr);
