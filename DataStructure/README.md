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

chapter 4 - Linked List
--------------------

- array로 구현할때
  - 간단하게 구현 가능
  - overflow 처리 불가능
  - insert/delete에서 shift 작업 필요

- 일반적인 Linked List
  - shift overhead 없음
  - no overflow
  - linking에 overhead 발생

- 구현
  - setItem : node에 값 넣기
  - getItem : node에 저장된 값 찾기
  - setNext : next노드 설정
  - getNext : next노드 불러오기

- 삭제 
  - curr, prev라는 두 노드 가정
  - curr는 삭제하려는 노드, prev는 그 앞노드 가리키게 설정
  - prev.setNext(curr.getNext()); 실행하면 curr이 가리키는 node가 리스트에서 사라짐
  - 맨 앞 노드 삭제시엔 head = curr.getNext(); 실행하면 됨

- 삽입
  - curr, prev라는 두 노드 가정
  - prev, curr사이에 삽입
  - newNode.setNext(curr), prev.setNext(newNode)실행
  - 첫노드 앞에 삽입 :  newNode.setNext(curr), head = newNode;
  - 마지막 노드 뒤에 삽입 : 다른 삽입과 똑같이 하지만, curr이 null일때로 따로 처리하면 된다. 

- 다른 Linked List
  - Doubly Linked List
    - 한 노드가 앞뒤의 노드를 가리킴

  - circular Linked List
    - 마지막 노드가 head를 가리킴

chapter 5 - Recursion 2
------------------
- Backtracking
  - 반대순서로 따라가면서 처리하는 방법
  - 예시 : Eight-Queens Problem

- Palinidrome Determination
  - 문자열이 대칭인지 판단
  ```
  isPalindrome(w){
    if(w.length == 0or1) return true;
    else if(first and last is same){
      w=w-first-last;
      return isPalindrome(w);
    }
    else return false;
  }
  

- Infix, Prefix, Postfix

  - Infix
    - 일반적 표기법
    - 계산법 : Postfix로 바꾼뒤 계산
  
  - Postfix 
    - 연산자를 숫자 뒤에 표기
      - 숫자 or postfix+postfix+operator
    - 계산법 : 스텍을 이용하여 계산함
      - 숫자입력시 push 시행
      - 연산자 오면 pop pop cal push 시행
      - 입력이 끝나면 계산 종료
    - Infix to Postfix
      - infix표기에서 괄호를 하나씩 지우면서 연산자를 뒤로 옮김

  - Prefix
    - 연산자를 숫자 앞에 표기
      - 숫자 or operator+prefix+prefix
    - 계산법 : 스텍을 이용하여 계산함
      - 연산자 입력시 push 시행
      - 숫자 입력시 pop pop cal push 시행
      - 입력이 끝나면 계산 종료
    - Infix to Prefix
      - infix표기에서 괄호를 하나씩 지우면서 연산자를 앞으로 옮김

    - Determination of Prefix
      - prefix가 identifier or operator+prefix+prefix임을 이용
      ```
      isPre(A,1,n){                     //return true if String A[1...n] is prefix 
        lastChar = endPre(A,1,n);       
        if(lastChar == n)return true;   //-1 => not prefix, 
                                        //not n => operator + prefix1 + prefix2 + other thing
        else return false;
      }

      endPre(A,first,last){
        if(first>last) return -1;
        if(A[first] == identifier) return first;  // A[first] == identifier case
        else if (A[first] == operator){           // A[first...last] == operator + prefix1 + prefix2 case
          firstEnd = endPre(A,first+1,last);      // prefix1
          if(firstEnd = -1)return -1;
          else return endPre(A,firstEnd+1,last);  // prefix2
        }
        else return -1;
      }

    - Prefix to Postfix
      - (operator)-(prefix)-(prefix) -> (postfix)-(postfix)-(operator)
      ```
      convert(pre){
            first = pre.firstcharacter;
            pre.deletefirst;
            if(first is identifier) return first;
            else{
              post1 = convert(pre);
              post2 = convert(pre);
              return post1+post2+first;
            }
          }


chapter 6 - Stack
----------------
- Stack
  - Removes the most recently added item
  - LIFO (Last-In-First-Out)
  - The only access to the stack is
the most-recently added item
- 구현
  - isEmpty() : 스텍이 비어있으면 true, 아니면 false를 리턴함
  - push(Object newItem) : newItem을 스텍에 넣음
  - pop() : top에 있는 object를 스텍에서 제거하고 그 object를 리턴함
  - peek() : top에 있는 object를 리턴함, stack을 변화시키지 않음
  - isFull() : arraybasedstack에서는 크기에 제한이 있기때문에 그때 사용

- Postfix 계산
  - chapter 5 에서 정리 해놓음

- DFS에서 많이 사용. 
  - chapter 15 graph 알고리즘 부분에서 다룰 예정


chapter 7 - Queue
------------

- Queue
  - Removes the least recently added item
  - FIFO (First-In-First-Out)
  - The only accessible item in the queue is the earliest added item
  - 

- 구현
  - isEmpty() : 큐가 비어있으면 true, 아니면 false 리턴
  - enqueue(Object newItem) : newItem을 큐에 넣음
  - dequeue() : front에 있는 object를 삭제하고 그 object를 리턴함
  - peek() : front에 있는 object리턴, queue를 변화시키지 않음

- Circular queue
  - front가 back을 지나가면 queue가 empty
  - back이 front를 따라잡으면 queue가 full
  - stack과 달리 queue를 array로 구현하면, enqueue,dequeue를 여러번 실행하고 나면 저장공간이 부족해진다. 이런 단점을 해결하기 위한 수단이다. 

- BFS에서 많이 사용
  - chapter 15에서 다룰 예정

- awesomepiece 면접 질문
  - Stack, Queue, Tree 에 대해서 설명 해보세요
  - Stack으로 Queue 만들려면 어케할까요?
    1. 두개의 stack을 이용 한다
    2. enqueue : 1번 stack에 push
    3. dequeue : 1번 stack이 empty될때까지 1번 pop, 2번 push를 반복. 그후 2번 stack에서 pop
    4. ~~이게 면접보고 와서 샤워하다 생각나냐 꼴받네;;~~ 물론 아니면... 말고... 일단 내생각엔 이거 같음


    