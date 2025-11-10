// basically a bucket can consist of multiple key-value pair
// A Bucket
//  [
/// // key  // value
// ["jamal", "teacher"],
// ["react", "library"]
//  ]

// Note: this.buckets and this.bucket are two seperate things
function hash(key) {
  //the required hashcode
  let hashCode = 0;
  //the max capacity(storge)
  let capacity = 16;
  //to avoid collision
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    //loop through each letter and hash them into and index an to avoid collision further
    //multiply the primeNo with the current hashIndex(hashcode) an add it t the current loop index
    hashCode += primeNumber * hashCode + key.charCodeAt(i);
  }
  //to avoid too big of a value return the modulus
  //to keep the index within the range of the array capacity
  return hashCode % capacity;
}
console.log(hash("jamal"));

//create a hashmap class/factory
class HashMap {
  constructor() {
    // grow the buckets to double their capacity when hash map reaches the loadFactor
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  set = function (key, value) {
    //To get the particular index
    const index = hash(key);
    console.log(index);

    //check if index is out of bound
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    //check if the bucket is empty
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    //loop through the bucket to see if there are existing arrays
    for (let i = 0; i < this.buckets[index].length; i++) {
      //get each current array for each loop in the bucket
      const current = this.buckets[index][i];
      //get the key of the array in the loop of the bucket
      let currentkey = current[0];
      //get the value of the array in the loop of the bucket
      //   let currentValue = current[1];

      //if the currentKey in that loop of the bucket
      //   is equivalent to the key wanting to be stored then override its value
      if (currentkey === key) {
        this.buckets[index][i][1] = value;
        return;
      }
    }
    //else push a new array into the bucket
    this.buckets[index].push([key, value]);

    //after adding a new entry checks if the load factor ahs ben reached to avoid collision
    if (this.length() / this.capacity > this.loadFactor) {
      console.log("Load factor exceeded. Resizing...");
      this.resize();
    }
  };

  //    takes one argument as a key and returns the value that is assigned to this key
  get = function (key) {
    const index = hash(key);

    //check if index is out of bound
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    //check if bucket with index is empty
    if (!this.buckets[index]) {
      return null;
    }
    for (let i = 0; i < this.buckets[index].length; i++) {
      const current = this.buckets[index][i];
      const currentKey = current[0];

      if (currentKey === key) {
        return this.buckets[index][i][1];
      }
      return null;
    }
  };

  //takes a key as an argument and returns true or false based on existence of key in hashmap.
  has = function (key) {
    const index = hash(key);

    //check if index is out of bound
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    //check if bucket with index is empty
    if (!this.buckets[index]) {
      return false;
    }
    for (let i = 0; i < this.buckets[index].length; i++) {
      const current = this.buckets[index][i];
      const currentKey = current[0];

      if (currentKey === key) {
        return true;
      }
      return false;
    }
  };

  //takes a key as an argument. If the given key is in the hash map,
  //it should remove the entry with that key and return true.
  //If the key isn’t in the hash map, it should return false.
  remove = function (key) {
    const index = hash(key);

    //check if index is out of bound
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    //check if bucket with index is empty
    if (!this.buckets[index]) {
      return false;
    }

    for (let i = 0; i < this.buckets[index].length; i++) {
      //this is the current array in the bucket
      const current = this.buckets[index][i];
      const currentKey = current[0];

      if (currentKey === key) {
        this.buckets[index].splice(i, 1);
        return true;
      }
    }
    return false;
  };

  //returns the number of stored keys in the hash map.
  length = function () {
    let count = 0;

    // loop through all buckets
    for (let i = 0; i < this.buckets.length; i++) {
      //get each bucket
      const bucket = this.buckets[i];
      // add how many pairs are inside this bucket
      if (bucket) {
        count += bucket.length;
      }
    }
    return count;
  };

  //removes all entries in the hash map.
  clear = function () {
    // reset all buckets to empty
    this.buckets = new Array(this.capacity);
    console.log("Hash map cleared");
  };

  //    returns an array containing all the keys inside the hash map.
  keys = function () {
    const keysArray = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];
      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          const bucketKey = bucket[j][0];
          keysArray.push(bucketKey);
        }
      }
      //   const bucketKey = bucket[i][0];
    }
    return keysArray;
  };

  //    returns an array containing all the values.
  values = function () {
    const valueArray = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          const bucketValue = bucket[j][1];
          valueArray.push(bucketValue);
        }
      }
    }
    return valueArray;
  };

  // returns an array that contains each key, value pair.
  // Example: [[firstKey, firstValue], [secondKey, secondValue]]
  entries = function () {
    //create an entries array
    const entriesArray = [];

    //iterate though the whole buckets
    for (let i = 0; i < this.buckets.length; i++) {
      //get each bucket
      const bucket = this.buckets[i];

      if (bucket) {
        //iterate through the entries of each bucket
        for (let j = 0; j < bucket.length; j++) {
          //get each entry array that will contain key-value pairs
          const entries = [];
          //push each key-value pair into the entry array
          entries.push(bucket[j][0], bucket[j][1]);
          //push the entry array into the finaly entryArray
          entriesArray.push(entries);
        }
      }
    }
    //return the end result of the entry array that displays all
    // the entries(key-value pairs) in the hashmap
    return entriesArray;
  };

  resize = function () {
    const oldBukcet = this.buckets;
    this.capacity *= 2; // double the capacity
    this.buckets = new Array(this.capacity); //create a new bucket but with double the space/capacity to avoid collisions

    for (let i = 0; i < oldBukcet.length; i++) {
      const bucket = oldBukcet[i];

      if (bucket) {
        for (let j = 0; j < bucket.length; j++) {
          const [key, value] = bucket[j]; //get eahc key and vlaue for an entry from each bucket
          this.set(key, value); // reuse set() to rehash into new buckets
        }
      }
    }
  };
}
const map = new HashMap();
map.set("jamal", "developer");
map.set("react", "library");
map.set("jamal", "teacher"); // updates
// console.log(map.get("james")); //retuns null
// console.log(map.get("jamal")); //returns teacher

// console.log(map.has("james")); //retuns false
// console.log(map.has("jamal")); //returns true

// console.log(map.remove("jamal")); //  true
// console.log(map.remove("vue")); //  false
// map.clear(); empties all buckets and clears the hashmap
console.log(map.buckets);
console.log(map.length()); //returns the no of keys in the hashmap
// console.log(map.keys()); //returns an array of all the keys in the hashmap
// console.log(map.values()); //returns an array of all the values in the hashmap
// console.log(map.entries()); //returns an array of all the entries in the hashmap
console.log(map.length()); //returns the no of keys in the hashmap
