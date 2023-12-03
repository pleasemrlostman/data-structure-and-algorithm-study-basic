function fibonacci3(n) {
    if(n <= 1) return n; 
    let table =[0, 1];
    for (let i = 2; i <= n; i++){
         table[i] = table[i - 2] + table[i - 1];
    }
    return table[n];
 }

 console.log("fibonacci3", fibonacci3(5))
