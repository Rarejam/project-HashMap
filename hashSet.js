class HashSet {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  // Hash function same as HashMap
  hash(key) {
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode += prime * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.capacity;
  }

  // Add a key to the set
  add(key) {
    const index = this.hash(key);

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    // Check if key already exists
    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i] === key) return; // already exists
    }

    // Add the key
    this.buckets[index].push(key);

    // Check load factor and resize if needed
    if (this.size() / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  // Check if a key exists
  has(key) {
    const index = this.hash(key);
    if (!this.buckets[index]) return false;

    for (let k of this.buckets[index]) {
      if (k === key) return true;
    }
    return false;
  }

  // Remove a key
  remove(key) {
    const index = this.hash(key);
    if (!this.buckets[index]) return false;

    const i = this.buckets[index].indexOf(key);
    if (i !== -1) {
      this.buckets[index].splice(i, 1);
      return true;
    }
    return false;
  }

  // Number of stored keys
  size() {
    let count = 0;
    for (let bucket of this.buckets) {
      if (bucket) count += bucket.length;
    }
    return count;
  }

  // Clears the set
  clear() {
    this.buckets = new Array(this.capacity);
  }

  // Get all keys as an array
  keys() {
    const keysArray = [];
    for (let bucket of this.buckets) {
      if (bucket) keysArray.push(...bucket);
    }
    return keysArray;
  }

  // Resize function to expand capacity
  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);

    for (let bucket of oldBuckets) {
      if (bucket) {
        for (let key of bucket) {
          this.add(key); // rehash into new buckets
        }
      }
    }
  }
}

// Usage
const set = new HashSet();
set.add("jamal");
set.add("react");
set.add("jamal"); // won't be added twice
console.log(set.has("jamal")); // true
console.log(set.has("vue")); // false
console.log(set.keys()); // ["jamal", "react"]
console.log(set.size()); // 2
