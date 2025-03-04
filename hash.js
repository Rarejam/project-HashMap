// function hashToNumber(string) {
//   let hashCode = 0;
//   for (let i = 0; i < string.length; i++) {
//     hashCode += charCodeAt(i);
//   }
//   return hashCode;
// }

// function hash(name, surname) {
//   // return name.charAt(0) + surname.charAt(0);
//   return hashToNumber(name) + hashToNumber(surname);
// }
// console.log(hash('Jamal', 'Agara'));

// let m = new Map();
// m.set('jamal', 65);
// m.set(65, 77);
// m.set('Agara', 67);
// console.log(m);

let hashMap = new Map();
//sets() the key and value of the map
//get() the key and changes the value
hashMap.set('banana', 'yellow');
hashMap.set('carrot', 'orange');
hashMap.set('apple', 'red');
hashMap.set('dog', 'brown');
hashMap.set('elephant', 'gray');
hashMap.set('frog', 'green');
hashMap.set('grape', 'purple');
hashMap.set('hat', 'black');
hashMap.set('ice cream', 'white');
hashMap.set('jacket', 'blue');
hashMap.set('kite', 'pink');
hashMap.set('lion', 'golden');
console.log(hashMap.get('kite'));
console.log(hashMap.set('hat', 'blue'));
console.log(hashMap.keys());
console.log(hashMap.entries());
