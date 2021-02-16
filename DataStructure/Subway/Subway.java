import java.io.File;
import java.io.IOException;
import java.util.*;
import java.io.FileReader;
import java.io.BufferedReader;

class Pair {
    public String name;
    public Long dist;

    public Pair(String name, Long dist){
        this.name = name;
        this.dist = dist;
    }
}

class Vertex {
    public String stationName;
    public String stationNumber;

    public Vector<Edge> edges;

    public Vertex(String station){

        String[] stationnamenum = station.split(" ");

        this.stationNumber = stationnamenum[0];
        this.stationName = stationnamenum[1];

        edges = new Vector<>();

    }

    @Override
    public String toString() {
        return "Vertex{" +
                "stationName='" + stationName + '\'' +
                ", stationNumber='" + stationNumber + '\'' +
                ", edges=" + edges +
                "}\n";
    }
}

class Edge {
    public Long distance;
    public String srcStationName;
    public String dstStationName;

    public Edge(String src, String dst, String dis){
        this.srcStationName = src;
        this.dstStationName = dst;
        this.distance = Long.parseLong(dis);
    }

    @Override
    public String toString() {
        return "Edge{" +
                "distance=" + distance +
                ", srcStationName='" + srcStationName + '\'' +
                ", dstStationName='" + dstStationName + '\'' +
                '}';
    }
}

class Graph {
    Map<String, Vertex> StationMap;
    Map<String, Vector<Vertex> > stationNameToStationList = new HashMap<>();
    public Graph(BufferedReader br) throws IOException {
        String buf;

        StationMap = new HashMap<>();
        while((buf = br.readLine()) != null){
            if(buf.length() == 0)
                break;
            Vertex ver = new Vertex(buf);
            this.StationMap.put(ver.stationNumber, ver);

            if(stationNameToStationList.containsKey(ver.stationName)){
                for(Vertex station : stationNameToStationList.get(ver.stationName)){
                    ver.edges.add(new Edge(ver.stationNumber, station.stationNumber, "5"));
                    station.edges.add(new Edge(station.stationNumber, ver.stationNumber, "5"));
                }
            }
            else{
                stationNameToStationList.put(ver.stationName, new Vector<>());
            }
            stationNameToStationList.get(ver.stationName).add(ver);

        }

        while((buf = br.readLine()) != null){
            String[] makeedge = buf.split(" ");
            Edge edge = new Edge(makeedge[0],makeedge[1],makeedge[2]);
            Vertex ver = StationMap.get(makeedge[0]);
            ver.edges.add(edge);
        }


    }

    public Vertex getVertex(String number){
        return StationMap.get(number);
    }

    @Override
    public String toString() {
        return "Graph{" +
                "StationMap=" + StationMap +
                '}';
    }
}

public class Subway {
    public static void main(String[] args) throws Exception {
        File file = new File(args[0]);
        BufferedReader br = new BufferedReader(new FileReader(file));
        Graph G = new Graph(br);
        Scanner sc = new Scanner(System.in);
        String a;
        while(true){
            a = sc.nextLine();

            if(a.equals("QUIT")){
                break;
            }
            String[] b = a.split(" ");

            dijkstra(G, b[0], b[1]);
        }
    }


    public static void dijkstra(Graph G, String src, String dst){
        Map<String, Long> distanceMap = new HashMap<>();
        Map<String, String> pathMap = new HashMap<>();
        PriorityQueue<Pair> pq = new PriorityQueue<>(new Comparator<Pair>() {
            @Override
            public int compare(Pair o1, Pair o2) {
                return o1.dist.compareTo(o2.dist);
            }
        });

        for(Vertex station : G.stationNameToStationList.get(src)){
            pq.add(new Pair(station.stationNumber, 0L));
            distanceMap.put(station.stationNumber, 0L);
        }

        while(!pq.isEmpty()){
            Pair pair = pq.poll();
            String currentNumber = pair.name;
            Long currentDistance = pair.dist;
            if(!distanceMap.containsKey(currentNumber))
                distanceMap.put(currentNumber, Long.MAX_VALUE);
            if(distanceMap.get(currentNumber) < currentDistance)
                continue;

            Vertex currentStation = G.getVertex(currentNumber);

            for(Edge edge : currentStation.edges){
                Vertex dstStation = G.getVertex(edge.dstStationName);
                if(!distanceMap.containsKey(dstStation.stationNumber))
                    distanceMap.put(dstStation.stationNumber, Long.MAX_VALUE);

                if(distanceMap.get(dstStation.stationNumber) > currentDistance + edge.distance){
                    pathMap.put(dstStation.stationNumber, currentStation.stationNumber);
                    pq.add(new Pair(dstStation.stationNumber, currentDistance + edge.distance));
                    distanceMap.put(dstStation.stationNumber, currentDistance + edge.distance);
                }
            }
        }

        Long minDistance = Long.MAX_VALUE;
        Vertex resultStation = null;
        for(Vertex station : G.stationNameToStationList.get(dst)){
            if(distanceMap.get(station.stationNumber) < minDistance){
                minDistance = distanceMap.get(station.stationNumber);
                resultStation = station;
            }
        }

        assert resultStation != null;
        String curr = resultStation.stationNumber;
        Stack<String> stack = new Stack<>();
        while (true) {
            stack.push(G.getVertex(curr).stationName);
            if(G.getVertex(curr).stationName.equals(src)){
                break;
            }
            curr = pathMap.get(curr);
        }

        List<String> path = new ArrayList<>(stack);

        Collections.reverse(path);

        for(int i=0;i<path.size() - 1;i++){
           if(path.get(i).equals(path.get(i+1))){
               System.out.print("[" + path.get(i) + "] ");
               i++;
           }
           else System.out.print(path.get(i) + " ");
        }
        System.out.println(path.get(path.size() - 1));
        System.out.println(minDistance);
    }

}