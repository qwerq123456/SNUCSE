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
오랫동안 생각한 끝에 갑자기 답을 착상하게 되는 것이다.<br/> - 라이너스 폴링

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

- 점근적 표기번 (Asymptotic Notations)
    - 자료구조 필기 참고
    - O( g(n) )
        - Tightorlooseupperbound
    - Ω( g(n) )
        - Tightorlooselowerbound
    - Θ( g(n) )
        - Tightbound
    - o( g(n) )
        - Looseupperbound
    - 𝜔(g(n))
        - Looselowerbound

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
- 대부분 O(n<sup>2), O(nlogn)이지만 특수한 조건의 input이 들어올땐 O(n)
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
