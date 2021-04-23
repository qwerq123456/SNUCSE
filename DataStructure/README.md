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
    - worst : Θ(n<sup>2</sup>)

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


chapter 8 Algorithm Efficiency & Sorting
--------------
- O() : Big-Oh
  - upper-bounded by cf(n)
  - 정의
    - O(f(n)) = { g(n) | ∃c > 0, n0 ≥ 0 s.t.∀n ≥ n0, cf(n) ≥ g(n) }
    - g(n) ∈ O(f(n))이 맞지만 관행적으로 g(n) = O(f(n))이라고 쓴다.

- Ω(f(n))
  - 적어도 f(n)의 비율로 증가하는 함수
  - O(f(n))과 반대 의미

- Θ(f(n))
  - f(n)의 비율로 증가하는 함수
  - O(f(n))과 Ω(f(n))를 동시에 만족 (Θ(f(n)) = O(f(n)) ∩ Ω(f(n)))

- Running-Time Analysis
  - worst case
    - 입력중 가장 느린 케이스

  - average case
    - 모든 입력의 평균 시간
    - 분석하기 어려운 경우가 많음

  - best case
    - 입력중 가장 빠른 케이스
    - 대부분의 경우에 의미 없음...

- Sorting Algorithms
  - Selection sort
    - 최대값을 찾아서 뒤로 옮긴다. 이것을 n회 시행
    - n<sup>2

  - Bubble sort
    - 앞부터 두개씩 비교하여 정렬
    - n<sup>2

  - Insertion Sort
    - 앞의 k개가 정렬 되어있다면, k+1번째의 자리를 찾는것은 쉬운 점을 이용
    - n<sup>2

  - Merge sort
    - 정렬된 두 수열을 합치는것은 쉽다는 점을 이용함
    - 수열을 반씩 쪼개서 크기가 1이 될때까지 쪼갠후 그들을 다시 합쳐나간다
    - 쪼갠 두 수열을 합치는 과정에서 보조 어레이가 필요
    - nlogn
    - ```
      mergeSort(S){
        S1 = first half of S;
        S2 = second half of S;
        mergeSort(S1);
        mergeSort(S2);
        merge(S1,S2);
      }
      merge(S1,S2){
        //S1,S2는 정렬된 수열이므로 둘을 합치는건 어렵지 않다.
      }
      ```

  - Quick sort
    - pivot을 이용하여 앞뒤를 나눔
    - Average-case : nlogn
    - Worst-case : n<sup>2 
       - 이미 정렬된 수열일 경우
       - multi pivot을 이용하여 worst case 제거 가능 ex)자바의 Arrays.sort

    - ```
      QuickSort(S){
          p = pivot of S;
          (L,R) = partition(S,p);
          QuickSort(L);
          QUickSort(R);
          return L+p+R;
      }
      partition(S,p){
        //p보다 작은 값은 L로 p보다 큰값은 R로 분리;
      }
      ```

  - Radix sort
    - 정수의 뒷자리 부터 정렬.
    - Stable sort
    - kn (k는 입력값의 자릿수)
  
    - ```
      radixSort(A[],k){
        for(i=1 to k){
          stableSort(A[],i);
        }
      }
      stableSort(A[],i){
        //i번째 자릿수로 stable sort하기
      }
      ```
  - Heap Sort
    - chapter 10 priority queue에서 정리할 예정
    
  <br/>




   |              |Worst Case|Average Case|
    |--------------|-----------|------------|
    |Selection Sort|n          |n           |
    |Bubble Sort|n<sup>2</sup>|n<sup>2|
    |Insertion Sort|n<sup>2</sup>|n<sup>2|
    |Merge Sort|nlogn|nlogn|
    |Quick Sort|n<sup>2</sup>|nlogn|
    |Radix Sort|n|n|
    |Heap Sort|nlogn|nlogn|



chapter 9 Tree
--------
- 명언 : 사실을 많이 아는 것 보다는 이론적 틀이 중요하고, 기억력 보다는 생각하는 법이 더 중요하다. - 제임스 왓슨

- 정의
  - empty or root+subtrees

- 다양한 표현
  - 사이클이 없는 연결 그래프
  - 사이클이 없고 단순그래프의 형태를 유지하면서 간선을 추가할경우 사이클이 생긴다
  - 연결 그래프 이고, 어떤 간선을 제거해도 연결그래프가 아니게 된다
  - 연결 그래프 이고, 간선의 수는 정점의 수보다 하나 적다
  - 사이클이 없고, 간선의 수는 정점의 수보다 하나 적다

- Binary Tree
  - empty or root node + two binary trees(left,right)

- Binary Search Tree
  - 각 노드d에 대하여 다음을 만족한다
    - 모든 노드에 해당하는 값은 다르다
    - d의 값은 left tree T<sub>L</sub>의 모든 값보다 크고, right tree T<sub>R</sub>의 모든 값보다 작다
    - T<sub>L</sub>,T<sub>R</sub>은 모두 BST이다.

- Full Binary Tree
  - 모든 leaf node가 같은 레벨에 위치하고 leaf를 제외한 모든 node가 정확히 2개씩의 children을 갖는 tree
  - If T is empty 
    - height가 0 인 full binary tree
  - If T is not empty and height is h
    - 루트의 두 서브트리가 모두 height 가 h-1인 full binary tree일때 T가 full binary tree 이다

- Complete Binary Tree
  - height가 h 인 complete binary tree는 h-1 level까지 가득 차있고, h level은 왼쪽에서 오른쪽으로 차있을때 Complete binary tree 이다.

- Treesort 
  - 모든 값을 bst로 넣고, inorder traversal로 출력한다.
    - Average case : nlogn
    - worst case : n<sup>2</sup>

chapter 10 Priority Queues
---------------
- Priority queue
  - A dynamic data sets that support insertion, deletion, and retrieval of max element
    - array, list, 등등으로 구현해도 다 상관없지만 heap에 비해 성능이 너무 떨어지기에 heap을 사용하는것.
  - Deletion
    - priority가 가장 높은 item만 delete 가능
  - Insertion
    - 잘 하면 됌
  - Key값 중복 허용

- Heap
  - Complete binary tree that is 
    - empty
    - the key of each node is grater than or equal to the keys of both children
  - Complete binary tree이기 때문에 array 로 생각할 수 있다.
  - Deletion
    - root item 지운뒤 마지막 node를 root로 옮긴후 수선(percolate down)
  - Insertion
    - 마지막 node에 삽입 후 수선(percolate up)
  - Heapsort
    - insertion, deletion이 모두 O(logn)이므로 n개의 원소를 insert후 delete하면 sorting이 완료되고, 그것은 O(nlogn)이 된다.


chapter 11 Balanced Search Tree
-------
- search time은 tree의 height에 의해 결정된다. 그러므로 height를 균형있게 잡아줘야 search time이 줄어든다.
- 종류
  - Balanced binary search tree
    - AVL tree, RB tree
  - Balanced k-ary trees
    - 2-3 tree, 2-3-4tree, B-trees

- 2-3 tree
  - B-tree중에 특별한 케이스
  - T is a 2-3 tree of height h if
    - T is empty(height 0)
    - root는 3개의 sub trees를 갖는다 T<sub>L</sub>,T<sub>M</sub>,T<sub>R</sub>. 이 3개의 sub trees는 모두 height가 h-1인 2-3 tree이다.
    - 단, root가 원소가 1개면 T<sub>R</sub>없어도 된다

- 2-3-4 tree
  - 한 노드에 3개까지 가능, 자식은 4개까지 가능
  - binary tree로 변형하면 RB tree가 됌

- RB tree
  - 알고리즘 tree부분에 정리해놓음

- AVL tree (Adelson-Velskii and Landis)
  - left와 right의 높이 차이가 1 이하인 트리

chapter 12 Hash table
-------
 - 알골에서 정리

chapter 13 External Storage, 14 B-tree
-------
  - 모든 데이터를 main memory에 저장할 수 없다.
  - disk access는 시간이 많이든다. 따라서 level이 크면 안된다.
    - 그래서 height가 작고 최악의 경우에도 균형 유지가 되는 B-tree를 사용하게 된다.
  - B tree 삽입 삭제는 피피티 보고 따라가기!

chapter 15 그래프
------
  - 알고리즘에서 정리