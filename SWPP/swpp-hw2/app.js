// TODO: edit this file

// This is a list where your records should be stored. See `parseAndSave`.
let records = [];

// `parseAndSave(text)` is a function called with one argument `text`, the content of the babyname CSV file.
// It is invoked only once at the start of application.
// TODO: parse the csv text and save data records into the global variable `records` properly,
// so that the other functions use them with ease. After calling this function, `records` should
// contain the parsed data of every year like below.
//     e.g. records: [{year: 2001, rank: 1, name: "Jacob", gender: "M", rankChange: null},
//                    {year: 2001, rank: 2, name: "Michael", gender: "M", rankChange: null},
//                    ...]
// Note: a CSV text can end with trailing line-break character '\n'. Whether it exists or not,
// the function should parse `text` correctly. Also, records should be stored in the same order
// in which they appear in a csv text. You can assume that at the first line is always a csv header.
function parseAndSave(text) {
  // TODO: Fill this function. (3 points)
  var entersplit = text.split("\n");
  entersplit.shift();
  var aftersplit = [];
  for (var i in entersplit) {
    let parsedata = {};
    aftersplit = entersplit[i].split(",");
    parsedata.year = aftersplit[0];
    parsedata.rank = aftersplit[1];
    parsedata.name = aftersplit[2];
    parsedata.gender = aftersplit[3];
    if (aftersplit.length == 5) {
      parsedata.rankChange = aftersplit[4];
    } else {
      parsedata.rankChange = null;
    }
    records.push(parsedata);
  }
  return records;
}

// `provideYearData(year)` is a function that receives a year and returns an array of data object corresponding to that year.
// Note that male and female record with the same rank should be joined together to form one object.
// TODO: return all data objects of a specific year, that are joined and organized by rank in an ascending order.
// The example of returned array is as follows.
//     e.g. [{rank: 1, male: "Jacob", maleRankChange: 0, female: "Isabella", femaleRankChange: 0},
//           {rank: 2, male: "Ethan", maleRankChange: 0, female: "Sophia", femaleRankChange: -2},
//           ...,
//           {rank: 1000, male: "Keshawn", maleRankChange: 113, female: "Karley", femaleRankChange: 17}]
function provideYearData(year) {
  // TODO: Fill in this function. (5 points)
  var answer = [];
  for (var i = 1; i < 1001; i++) {
    let yeardata = {};
    for (var j in records) {
      if (records[j].year == year) {
        if (records[j].rank == i) {
          yeardata.rank = i;
          if (records[j].gender == "M") {
            yeardata.male = records[j].name;
            yeardata.maleRankChange = records[j].rankChange;
          } else {
            yeardata.female = records[j].name;
            yeardata.femaleRankChange = records[j].rankChange;
          }
        }
      }
    }
    answer.push(yeardata);
  }
  return answer;

  // This is just a reference for the return value's format. Delete this and fill your own
  // proper code to return the correct data.
}

// provideChartData(name, gender) is a function called when a user wants
// to see the chart showing the year-on-year change of rank of a specific name.
// TODO: return a list of all objects from 2001 to 2018 in the format of `{year: <year>, rank: <rank>}`
// of a specific name specified by the arguments, name and gender.
// If there are no records with the name and gender for some years,
// either you can set the values of the ranks to `undefined` or not return those records at all.
// The example of return data is as follow.
//     e.g. [{year: 2001, rank: undefined},
//           {year: 2002, rank: 613},
//           ...,
//           {year: 2018, rank: 380}]
// You can also return data excluding `undefined` value as below.
//     e.g. [{year: 2002, rank: 613},
//           ...,
//           {year: 2018, rank: 380}]
function provideChartData(name, gender) {
  // TODO: Fill in this function. (2 points)
  var answer = [];
  for (var i in records) {
    let yearrankdata = {};
    if (records[i].name == name && records[i].gender == gender) {
      yearrankdata.year = records[i].year;
      yearrankdata.rank = records[i].rank;
    }
    answer.push(yearrankdata);
  }
  return answer;

  // This is just a reference for the return value's format. Delete this and fill your own
  // proper code to return the correct data.
}

// `handleSignUpFormSubmit(form)` is called when a user submits the sign up form.
// `form` is the target HTML form element (L82~ in index.html).
// TODO: validate the form. (5 points)
function handleSignUpFormSubmit(form) {
  let alertMessage = "";
  // TODO: Fill in the rest of function to get the HTML form element as above.
  let inputs = [];
  for (var i = 0; i < 4; i++) {
    inputs.push(form.getElementsByTagName("input")[i].value);
  }
  var emailre = /^[^\s@]+@[^\s@.]+.[a-z]{2,3}$/;
  var firstnamere = /^[A-Z][a-z]+$/;
  var lastnamere = /^[A-Z][a-z]*$/;
  var birthre = /(^(19\d{2}|20[0-1]\d{1}|2020)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$)/;
  let firstnameresult = { name: "first-name" };
  let lastnameresult = { name: "last-name" };
  let emailresult = { name: "email" };
  let birthresult = { name: "date-of-birth" };
  if (firstnamere.test(inputs[0])) {
    firstnameresult.valid = true;
    firstnameresult.message = null;
  } else {
    firstnameresult.valid = false;
    firstnameresult.message = "Invalid first name";
  }
  if (lastnamere.test(inputs[1])) {
    lastnameresult.valid = true;
    lastnameresult.message = null;
  } else {
    lastnameresult.valid = false;
    lastnameresult.message = "Invalid last name";
  }
  if (emailre.test(inputs[2])) {
    emailresult.valid = true;
    emailresult.message = null;
  } else {
    emailresult.valid = false;
    emailresult.message = "Invalid email";
  }
  if (birthre.test(inputs[3])) {
    birthresult.valid = true;
    birthresult.message = null;
  } else {
    birthresult.valid = false;
    birthresult.message = "Invalid date of birth";
  }
  if (
    !(
      firstnameresult.valid &&
      lastnameresult.valid &&
      emailresult.valid &&
      birthresult.valid
    )
  ) {
    alertMessage = alertMessage + "You must correct:\n";
    if (!firstnameresult.valid) {
      alertMessage = alertMessage + "\nFirst Name";
    }
    if (!lastnameresult.valid) {
      alertMessage = alertMessage + "\nLast Name";
    }
    if (!emailresult.valid) {
      alertMessage = alertMessage + "\nEmail";
    }
    if (!birthresult.valid) {
      alertMessage = alertMessage + "\nDate of Birth";
    }
  } else {
    alertMessage = alertMessage + "Successfully Submitted!";
  }
  // Hint: you can use the `RegExp` class for matching a string.

  // The return data format is as follows. For the given `form` argument, you should
  // correctly process the validation, filling in `alertMessage`, and `validationResults`.
  // When you deal with `validationResults`, the values of `message` should be set to `null`
  // for the valid input fields. (See the example below.)
  // Below is just a reference for the return value's format. Delete this and fill your own
  // proper code to return the correct data.

  // IMPORTANT NOTE: You must use the argument `form` rather than directly using APIs such as `document.getElementId` or `document.querySelector`.
  //                 Plus, please do not call `alert` function here.
  //                 For debugging purpose, you can use `console.log`.
  return {
    alertMessage: alertMessage,
    validationResults: [
      firstnameresult,
      lastnameresult,
      emailresult,
      birthresult,
    ],
  };
}
