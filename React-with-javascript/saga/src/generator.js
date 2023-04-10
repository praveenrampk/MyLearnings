function* gen () {
    const one = yield 10;
    const two = yield one;
    yield put(genSuccess(two));
}
const genSuccess = (num) => {
    console.log(num);
}
const first = gen();
console.log(first.next());
console.log(first.next());
console.log(first.next());
console.log(first.next());