
// 1. Object to JSON
// stringify(obj)
let json = JSON.stringify(true);
console.log(json);
// true

json = JSON.stringify(['apple', 'banana']);
console.log(json);
// ["apple","banana"]

const rabbit = {
    name:'tori',
    color:'white',
    size:null,
    birthDate: new Date(),
    // symbol: Symbol("id"),
    jump: () => {
        console.log(`${name} can jump!`);
    },
};
json = JSON.stringify(rabbit);
console.log(json);
// {"name":"tori","color":"white","size":null,"birthDate":"2022-12-02T04:08:53.148Z"}
// null은 "" 가 아니다.
// birthDate의 경우 Date라는 오브젝트가 string 으로 변환되어서 json으로 만들어짐.
// 심벌도 담기지 않는다. 자바스크립트에 있는 특별한 데이터도 json에 포함되지 않는다.
// 함수는 담기지 않는다. 함수는 오브젝트에 있는 데이터가 아니기 때문.

console.log('---------------option--------------')
// 옵션 전달
json = JSON.stringify(rabbit, ["name"]);
console.log(json);
// {"name":"tori"} 이름만 포함. 배열로 원하는 property만 골라서 만들수도 있음.

// 콜백함수로 통제
json = JSON.stringify(rabbit, (key, value) => {
    console.log(`key: ${key},  value: ${value}`);
    return value;
});
console.log(json);
// 모든 키와 value들이 콜백함수에 전달된다.
// key: ,  value: [object Object]  -> 처음으로 전달되는것은 rabbit오브젝트를 싸고있는 최상위것이 전달
// key: name,  value: tori
// key: color,  value: white
// key: size,  value: null
// key: birthDate,  value: 2022-12-02T04:17:36.602Z
// key: jump,  value: () => {
//         console.log(`${name} can jump!`);
//     }
// {"name":"tori","color":"white","size":null,"birthDate":"2022-12-02T04:17:36.602Z"}


// 2. JSON to Object
// parse(json)
console.clear();
json = JSON.stringify(rabbit);
const obj = JSON.parse(json);
console.log(obj);
// {name: 'tori', color: 'white', size: null, birthDate: '2022-12-02T04:35:13.637Z'}

rabbit.jump();
// obj.jump();
// 변환된 오브젝트의 함수를 다시 사용할수 없음.

console.log(rabbit.birthDate.getDate());
// console.log(obj.birthDate.getDate());
// string이므로 getDate를 사용할 수 없음

// 다시 Date로 변환하고싶다면 콜백함수를 이용.
const obj2 = JSON.parse(json, (key, value) => {
    console.log(`key: ${key},  value: ${value}`);
    return key === 'birthDate' ? new Date(value) : value;
});
console.log(obj2);
console.log(obj2.birthDate.getDate());
