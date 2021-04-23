알고리즘 수업 필기
============
Chapter 1 - 알고리즘이란
--------------

- 1장의 명언 : 생각하는 방법을 터득한 것은 미래의 문제를 미리 해결한 것이다. - 제임스 왓슨

- 알고리즘 공부 목적
    - 특정 문제 해결을 위한 알고리즘 습득
    - 체계적인 사고 훈련
    - 지적 추상화의 레벨 상승 (?? 이건 잘 모르겠는데;;ㅋㅋ)
        - 연구나 개발시에 정신적 여유 유지 가능
    
- 알고리즘을 자료구조의 확장이라 생각하기

Chapter 2 - 알고리즘 설계와 분석의 기초
------------

- 2장의 명언 : 
전혀 새로운 아이디어를 갑자기 착상하는 일이 자주 있다.<br/>
하지만 그것을 착상하기까지 오랫동안 끊임없이 문제를 생각한다.<br/>
오랫동안 생각한 끝에 갑자기 답을 착상하게 되는 것이다.      - 라이너스 폴링

- 알고리즘이란?
    - 문제 해결 절차를 체계적으로 기술한 것
    - 입력으로부터 출력을 만드는 과정을 기술한 것

- 바람직한 알고리즘
    - 명확성
    - 효율성

- 알고리즘의 수행시간
    - 
- 재귀와 귀납적 사고
    - 재귀(recursion)
    - 문제안에 크기만 다른 같은 문제가 포함된것

- 알고리즘 분석의 필요성
    - 무결성 확인
    - 자원의 효율성 확인

- 알고리즘 분석
    - 문제가 작은 경우 효율성이 중요하지 않다
    - 문제의 크기가 커지면 알고리즘의 효율성이 매우 중요해짐
    - 입력의 크기가 충분히 클때에 대한 분석을 점근적 분석이라 한다

- 점근적 분석 (Asymptotic Analysis)
    - 입력이 충분히 큰 경우에 대한 분석

- 점근적 표기법 (Asymptotic Notations)
    - 자료구조 필기 참고
    - O( g(n) )
        - Tight or loose upper bound
    - Ω( g(n) )
        - Tight or loose lower bound
    - Θ( g(n) )
        - Tight bound
    - o( g(n) )
        - Loose upper bound
    - 𝜔(g(n))
        - Loose lower bound

Chapter 3 - 점화식과 알고리즘 복잡도 분석
-----------
- 점화식(recurrence)
    - 어떤 함수를 자신보다 더 작은 변수에 대한 함수와의 관계로 표현한 것

- 점화식의 점근적 분석 방법
    1. 반복 대치
        - 더 작은 문제에 대한 함수로 반복해서 대치해 나가는 방법
        - ex) T(n) = T(n-1)+n, T(1) = 1<br>
            - T(n) <br>
                   = T(n-1) + n<br>
                   = (T(n-2) + n-1) + n<br>
                ...<br>
                   =T(1) + 2 + 3 + ... + n<br>
                   =n(n+1)/2 = Θ(n<sup>2)
    2. 추정 후 증명
        - 말그대로 추정 후 증명
            - ex) T(n) = 2T(n/2) + n
                - 추정: T(n) = O(nlogn), 즉 T(n) ≤ cnlogn
                - 증명: T(n) <br>
                        = 2T(n/2) + n <br>
                        ≤ 2c(n/2)log(n/2) + n <br>
                        = cnlogn − cnlog2 + n <br>
                        = cnlogn + (−clog2 + 1)n <br>
                        ≤ cnlogn
    3. 마스터 정리
        - T(n) = aT(n/b) + f(n)꼴의 점화식은 마스터 정리에 의해 바로 분석 가능하다.
        - 증명: T(n)에 반복 대치하다보면 T(n/b<sup>k)가 나오는데 이는 T(0)이 되므로 1이 됨을 이용하여 증명
        - 솔직히 수식 이거 다 쓰는거 마크다운 개오바임;; 걍 피피티 보자...

Chapter 4 - 정렬
------
- 대부분 O(n<sup>2</sup>), O(nlogn)이지만 특수한 조건의 input이 들어올땐 O(n)
- Sort
    - Selection Sort
    - Bubble Sort
    - Insertion Sort
    - Merge Sort
    - Quick Sort
    - Heap Sort
    - Radix Sort
        - 이 위의 것들 다 자구에서 정리함
    - Counting Sort
        - 원소의 크기가 -O(n)~O(n)일때 사용가능
         ``` 
         countingSort(A[],n){
            //A[n] ε {1, 2, ..., k} : 입력 배열, n: 입력 데이터 크기
            int[k] count = {0};
            for i=1 to n
                count[A[i]]++;
            for i=1 to k
                print i count[i] times
        }
    - Bucket Sort
        - input이 uniform distribution 일때
        - 
        ```
        bucketSort(A[],n){
            //input : A[n] ε [0,1) -> uniform distribution
            //B[n] // buckets of lists
            for i = 1 to n
                insert A[i] into B[nA[i]]
            for i = 1 to n
                sort B[nA[i]]  //O(1)
            for i = 0 to n-1
                print B[i];
        }
        ```
        - 코드 설명
            - B는 list 로 이루어진 bucket 이다
            - A를 B에 넣는데에 n의 시간이 걸림
            - uniform distribution이기 때문에 각 bucket에는 상수개의 원소만 존재 따라서 이들을 각각 소팅하는데에는 O(1)이 걸림
            - 다 종합하면 O(n)


5장 - 선택 알고리즘
-----
- 5장의 명언 : 일을 시작하기 위해 기분이 내킬때까지 기다리는 따위의 짓을 하지 않으려면 시험 제도는 좋은 훈련이 된다. - 아놀드 토인비
    - ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ

- 선택 알고리즘 : i 번째 수 찾기
    1. O(n<sup>2</sup>) 알고리즘
        - 가장 작은 숫자를 i 번찾음

    2. 평균 선형시간 선택 알고리즘

        - 
        ```
        select(A,p,r,i){
            //A[p~r]에서 i 번째 원소 찾기
            if(p==r) return A[p];
            q = partition(A,p,r);
            k = q-p+1;
            if(i<K) return select(A,p,q-1,i);
            else return select(A,p,r,i-k);
        }
        ```
        - average : O(n)
        - worst case : O(n<sup>2</sup>)
        - worst case를 피하기 위해 적당히 나뉘도록 하자. but 오버헤드 크지 않게 하자

6장 - Search Tree
-------

- Binary Search Trees
    - 모든 node는 자신의 left subtree보단 크고, right subtree 보단 작다.
    - Search
        - 트리에서 root부터 쭉 내려가면서 찾으면 댐

    - Insertion
        - Search와 같은 방법으로 내려가다가 자리가 비어있으면 그곳에 삽입
    
    - Deletion
        - case 1: leaf node 삭제
            - 그냥 삭제하면 됌
        - case 2: child가 1개인 노드 삭제
            - child를 그 자리에 가져다 놓음
        - case 3: child가 2개
            - right child의 가장 작은 child를 가져와서 자리 대체

    - 위의 3가지 시행에 대해서 O(logn)의 시간이 걸린다

- Red-Black Trees
    - 성질
        - 모든 search tree의 node는 red or black의 색을 가진다.
        - Root는 언제나 black
        - 모든 leaf는 언제나 black
        - 어떤 node가 red면 자식들은 black 
        - root부터 leaf까지 가는 모든 path에 대하여 black nodes의 갯수는 언제나 같다.
        - 여기서의 leaf는 모든 NIL포인터가 NIL이라는 leaf nodoe

    - Search
        - BST랑 똑같이 하자
    
    - Insertion
        - p: parent, x: 내가 넣으려는 수, s : 삼촌? 이라 해야되나?, y : x의 형제
        - BST처럼 삽입후 삽인된 노드를 레드로 칠함
            - If p is
                - black : 그냥 밑에 red로 넣으면 no problem
                - red : RB tree의 성질 성립 x
                    - RB tree의 성질에 의해 p<sup>2</sup> 는 black
                    - Case 1 : s is red
                        - p,s를 black으로 바꾸고 p<sup>2</sup>를 red로 바꿈
                        - 이렇게 재귀적으로 처리 하기
                    - Case 2 : s is black
                        - Case 2-1 : x is right child
                            - x를 p 자리로 옮기고 p를 x의 left child로 바꿈 x의 left child는 p의 right child로 이동
                        - Case 2-2 : x is left child
                            - Case 2-1를 처리시 여기로 온다.
                            - p를 p<sup>2</sup>의 자리로 옮기고 p<sup>2</sup>를 p의 right child로 바꿈 p의 right child는 p<sup>2</sup>의 left child로 이동

        - 삽입, 수선이 모두 O(logn)이므로 O(logn)의 시간에 처리가능

    - Deletion
        - insertion과 마찬가지로 찾아서 지운후 수선하는 방향으로 진행한다.
            - 삭제하려는 노드는 하나의 자식만 가지거나 자식이 없다.
                - BST에서 지우기 전에 자리를 바꾸기 때문이다.
            - If x is red
                - 그냥 삭제해도 문제 없음
            - If x is black 
                - If only child is red
                    - red child를 black으로 바꾸면 해결
                - 나머지 경우에 간단히 해결되지 않는다.

        - m : 삭제하려는 노드, x : only child, p: m의 부모, s: m의 형제, l,r : s의 자식들
            - m 삭제후 x로 대체한다. 이때 x to leaf black node 수는 1개 부족해진다.
                - Case 1 : p is red
                    - Case 1-1 : p만 red
                    - Case 1-2 : p,r red
                    - Case 1-3 : p,l red
                    
                - Case 2 : p is black
                    - Case 2-1 all black
                    - Case 2-2 r만 red
                    - Case 2-3 l만 red
                    - Case 2-4 s만 red

                - Case 1-1
                    - p와 s의 색을 바꾸면 해결

                - Case *-2 : 1-2와 2-2가 같은 방법으로 해결가능
                    - p 를 중심으로 왼쪽 회전
                    - p,s 색 바꾸기
                    - r black으로 바꾸기
                
                - Case *-3 : 1-3, 2-3 같은방법으로 처리 가능
                    - s를 중심으로 오른쪽 회전
                    - l,s 색 바꾸기
                    - 이렇게 되면 *-2와 같은 상황이 된다.

                - Case 2-1
                    - s를 red 로 바꿈
                    - p에서 x와 같은 문제가 발생
                        - recursive 하게 해결
                
                - Case 2-4
                    - p를 중심으로 왼쪽 회전
                    - p와 s 색 바꾸기
                    - Case 1 로 바뀜

                - 걸리는 시간
                    - Case 2-1 : O(logn)
                    - 나머지 : O(1)
                    - 따라서 O(logn)이다.



