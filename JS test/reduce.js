//exploring reduce function
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 22 },
  { name: 'David', age: 35 },
  { name: 'Eva', age: 40 },
  { name: 'Frank', age: 40 },
  { name: 'Grace', age: 33 },
  { name: 'Harry', age: 26 },
  { name: 'Ivy', age: 31 },
  { name: 'Jack', age: 29 }
];

const ageSum = people.reduce((acc, person) => {
    return acc + person.age
}, 0);

//create a object where age will be the key and names of that age will come in list which is the value of that age key
const newObj = people.reduce((acc, person) => {
    if (!acc[person.age]) acc[person.age] = [];
    acc[person.age].push(person.name);
    return acc;
},{})

console.log(newObj);
