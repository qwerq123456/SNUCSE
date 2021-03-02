자료구조
=======
chapter2 - recursion
-----------------------
- Recursive algorithm
  - 하위 문제들에 대해 자신을 다시 부르는 알고리즘
  - 하위 문제들은 원래 문제와 같은 문제
  - 복잡한 문제를 간단하게 바꿀 수 있음
  - E.g. search, sorting, traversals...

- Asymptotic Analysis
  - 입력의 크기가 충분히 큰 경우에 대한 분석
  - Ο, Ω, Θ표기법

- Asymptotic Notation
  - O(f(n)): Big-Oh
    - 기껏해야 f(n)
    - g(n) ∈O(f(n) -> g(n) = O(f(n))
    - Upper bound in running time
    - 최대한 tight하게 표기하기!  
  
  - Ω(f(n))
    - 적어도 f(n)
    - O(f(n))의 반대
    - Lower bound in running time
  
  - Θ(f(n))
    - f(n)의 비율로 증가하는 함수
    - Θ(f(n)) = O(f(n)) ∩ Ω(f(n))
  
- Search in an Array
  - Unsorted array
    - O(n)
  - Sorted array
    - Binary search : O(log n) 

- Factorial
  - f(n) = n*f(n-1) (n>0)

- Fibonacci Sequence
  - f(n) = f(n-1) + f(n-2)  (n>2)

- Writing a String Backward
  - 맨뒤 글자 출력 후 다시 자기자신 호출

- 어레이 에서 k번째로 작은 원소 출력하기
  - Θ(kn) 으로 하는 쉬운방법...(초등학생 수준이라 한다...~~열받네;;~~)
  - pivot기준으로 어레이 나누기
    - average : Θ(n)
    - worst : Θ(n<sup>2)

chapter 3 - abstraction
------------

