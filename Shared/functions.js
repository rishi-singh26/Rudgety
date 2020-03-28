import { AsyncStorage } from "react-native";

export function findTotal(arr) {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    total = total + Number(arr[i].value);
  }
  return total;
}

export function findTotalExpence(arr) {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].type === "#ff2b2b") {
      total = total + Number(arr[i].value);
    }
  }
  return total;
}

export function findTotalIncome(arr) {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].type === "#28a612") {
      total = total + Number(arr[i].value);
    }
  }
  return total;
}

export const retriveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      var retrivedData = JSON.parse(value);
      console.log(retrivedData, "Data retrived");
      return retrivedData;
    }
  } catch (error) {
    // Error retrieving data
    console.log("Error in retriving saved data");
    return "error";
  }
};

export const saveData = async (key, value) => {
  var dataToBeSaved = JSON.stringify(value);

  try {
    await AsyncStorage.setItem(key, dataToBeSaved);
    console.log("no error in saving data with kay" + key);
  } catch (error) {
    // Error saving data
    console.log("error in saving data");
  }
};
