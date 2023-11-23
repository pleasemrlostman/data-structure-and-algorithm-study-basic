function hanoi(count, from, to, temp) {
    if(count == 0) return
    hanoi(count - 1, from, temp, to)   // 재귀적으로 생각하니 원반 3을 C로 옮겨야하므로 2개의 원반을 우선 B로 옮긴다
    console.log(`원반 ${count}을 ${from}에서 ${to}로 이동`)
    hanoi(count - 1, temp, to, from) 
  }
  
  hanoi(3, "A", "C", "B")
  