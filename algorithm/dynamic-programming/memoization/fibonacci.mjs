function fibonacci2(n, memo) {
    if(n == 0 || n == 1) return n // 기존은 동일하게하고
    // 객체(해시테이블)에 해당 값의 계산 결과가 있는지 검색해본다.
    if(memo[n] == null) {
        memo[n] = fibonacci2(n - 2, memo) + fibonacci2(n - 1, memo);
    }
    return memo[n]
}

let k = {}

console.log("fibonacci2", fibonacci2(5, k))
console.log("k", k)