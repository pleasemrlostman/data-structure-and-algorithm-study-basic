# 동적프로그래밍 - 타뷸레이션

## 정의
상향식 계산 방식으로 계산에 필요하지 않을 수도 있는 값도 미리 계산해 테이블에 저장해둡니다. 그리고 이렇게 계산되어 저장된 값을 필요할 때 빠르게 계산한다.

## 구현

```js
function fibonacci3(n) {
   if(n <= 1) return n; 
   let table =[0, 1];
   for (let i = 2; i <= n; i++){
        table[i] = table[i - 2] + table[i - 1];
   }
   return table[n];
}
```
