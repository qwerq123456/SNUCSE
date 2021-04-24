# 데이터베이스 공부 필기 #
chapter 1 Introduction
-----
- Database Applications Examples
    - 기업
        - 판매 : 고객, 상품, 구매내역
        - 회계 : 지불, 영수증, 자산
        - 인사 : 직원 정보, 급여
    
- Purpose of Database Systems
    - 오래전엔, db가 file system의 바로 위에 설계되었고, 이는 다음의 문제를 야기했다.
        - 데이터 중복 및 불일치(Data redundancy and inconsistency)
            - 여러 파일형식으로 저장되어 서로 다른 파일의 정보 중복
        - 데이터 접근의 어려움(Difficulty in accessing data)
            - 새로운 작업을 수행하려면 새로운 프로그램을 작성해야 했다.
        - 데이터 격리(Data isolation)
            - 여러 파일과 형식이 존재했다.
        - 무결성 문제(Integrity problems)
            - 무결성 제약이 명시적으로 언급되지 않고 프로그램 코드에 묻힌다.
            - 새로운 제약을 추가하거나 기존 제약을 수정하기 어렵다.
        - 업데이트의 원자성(Atomicity of updates)
            - 부분적인 업데이트로 인해 DB가 일관성 없게 만들어서 오류가 발생할 수 있다.
        - 여러 사용자의 동시 액세스(Concurrent access by multiple users)
            - 동시 액세스로 인해 데이터간 불일치가 발생할 수 있다
        - 보안문제
    - DB system 은 위의 문제를 해결 할 수 있다

- Instances and Schemas
    - 프로그래밍 언어에서 types와 variables와 유사하다.
    - Logical schema
        - db의 전체 논리적 구조
        - variable의 type과 유사
    - Physical schema
        - db의 전체 물리적 구조
    - Instance
        - 특정 시점에서의 db 실제 내용
        - variable의 value와 유사

- Physical Data Independence
    - logical schema 를 변형하지 않고 physical schema 를 변형시킬 수 있는 능력
        - 프로그램은 logical schema에 영향을 받는다
        - 여러 구성요소 간의 인터페이스는 각자의 변화가 있어도 큰 영향을 끼치지 않도록 잘 정의되어 있어야 한다.

- Data Definition Language(DDL)
    - example : 
        ``` 
        create table instructor (
            ID char(5),
            name varchar(20),  
            dept_name varchar(20), 
            salary numeric(8,2))
        ```
    - A set of table templates stored in data dictionary
    - Data dictionary contains metadata (데이터 정보)
        - Database schema
        - Integrity constraints (Primary key)
        - Authorization (Access auth)

- Data Manipulation Language(DML)
    - 적절한 데이터 모델로 만들어진 데이터에 접근하고 수정하는 언어 (Query)
    - Two classes of language
        - pure : 계산 능력 증명 및 최적화
            - Relational Algebra
            - Tuple relational calculus
            - Domain relational calculus
        - commercial : 상업적 사용? 내생각엔 내부 구현은 pure 외부 접근은 commercial 이라는 느낌인듯 하다.
            - SQL이 가장 유명
    - DML은 두가지 타입이 있다.
        - Procedural DML : 
            - 어떤 데이터가 필요한지, 그리고 어떻게 그 데이터를 얻어야 할지를 특정해야 한다.
        - Declarative DML : 
            - 어떤 데이터가 필요한지만 특정하고, 어떻게 얻어야 할지는 특정하지 않아도 된다.
            - non-procedural DML
            - 더 쉽고 자주 쓰인다.
    - 정보검색과 관련된 DML부분을 query language 라고 한다.

- SQL Query Language
    - non procedural
    - input으로 몇가지 table을 받고 언제나 하나의 table을 리턴함 
        - 보통 인풋도 하나임
    - SQL은 튜링머신과 동등한 언어가 아니다
    - 복잡한 계산을 처리하기 위해 high level language에 포함된다
    - Application은 db 에 접근할때 다음 두가지중 하나 사용
        - SQL을 포함한 language extentions
        - SQL query가 db에 전송 될 수 있게 허용된 interface

- Database Access from Application Program
    - SQL과 같은 non-procedural query language는 universal Turing machine만큼 강하지 않음
    - input, output, network 등등의 기능이 없다. 따라서 다른 host language에서 구현해야 한다.
    - Application programs 은 db와 위와 같은 방식으로 소통하는 프로그램을 뜻한다.

- Database Design
    - DB의 일반적 구조 디자인 과정
        - Logical Design : DB schema 결정. DB design은 좋은 relation schemas를 찾아야 한다.
        - Physical Design : 물리적 layout을 결정

- Database Engine
    - database system 은 전체적 시스템의 각 기능?을 다루는 모듈로 나누어진다.
        - storage manager
            - low level database와 application program간의 interface를 제공하는 module
            - 기능
                - OS file manager와의 상호작용
                - data 저장, 검색, 업데이트
            - 구성
                - Authoriztaion and integrity manager
                - Transaction manager
                - File manager
                - Buffer manager
            - data structure as physical system
                - Data files : store the db itself
                - Data dictionary : store metadata(schema of database)
                - Indices : data에 pointer를 이용하여 빠르게 접근 가능

        - query processor
            - 구성
                - DDL interpreter : DDL 해석, dictionary 에 정의 저장
                - DML complier : query내의 DML을 query evaluation engine이 이해할 수 있게 번역 (최적화도 한다)
                - Query evaluation engine : DML compiler에서 준 instruction을 실행

        - transaction management
            - transaction : 하나의 logical function 을 수행하기위한 계산의 집합
            - 시스템 오류가 생기더라도 DB의 일관성 유지
            - Concurrency-control manager : DB의 일관성 유지를 위해 동시에 발생하는 transaction을 제어한다.

        - Query Processing
            1. Parsing and translation
            2. Optimization
            3. Evaluation

- Database Architecture
    - Centralized database 
        - 소수의 코어가 메모리 공유
    - Client-server
        - 한 서버가 여러 클라이언트 대체
    - Parallel database
        - 다수의 코어가 메모리 공유
        - 디스크 공유
        - 아무것도 공유하지 않음?
    - Distributed database
        - Geographical distribution
        - Schema/data heterogeneity

- Database Applications
    - Two-tier architecture : client에 application이 있음
    - Three-tier architecture : client가 frontend를 하고, DB에 직접적 호출을 하지 않음  ( front에서는 리퀘만 보내고 server에서 리퀘 받아서 처리하는 방식인가? )

- Database Users
    - Naive users - 기존의 프로그램 사용
    - Application programmers - 프로그램 작성
    - Sophisticated users - 프로그램 작성 없이 시스템과 상호작용
    - Specialized users - 기존의 프레임워크와 다른 어플리케이션 작성

- Database Administrator
    - 시스템 컨트롤 가진사람
    - 기능
        - schema definition
        - storage structure and access-method definition
        - schema and physical-organization modification
        - granting of authorization for data access
        - Routine maintenance
        - periiodically backing up the database
        - ensuring that enough free disk space is available for normal operations and upgrading disk space as required
        - monitoring jobs running on the database and ensuring that performance is not degraded by very expensive tasks submitted by sum user
        - 하여튼 뭐든 다가능하다는 소리인듯;;

- History of Database system
    - 내가 이거도 외워야해?