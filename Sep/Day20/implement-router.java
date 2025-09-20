import java.util.*;

class Packet {
    int src, dst, ts;
    Packet(int s, int d, int t) { src = s; dst = d; ts = t; }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Packet)) return false;
        Packet p = (Packet) o;
        return src == p.src && dst == p.dst && ts == p.ts;
    }

    @Override
    public int hashCode() {
        return Objects.hash(src, dst, ts);
    }
}

// ----------- Simple Version -------------
class RouterSimple {
    Deque<Packet> dq;
    Set<Packet> routerHashMap;
    int memoryLimit;

    RouterSimple(int limit) {
        dq = new ArrayDeque<>();
        routerHashMap = new HashSet<>();
        memoryLimit = limit;
    }

    boolean addPacket(int source, int destination, int timestamp) {
        Packet packet = new Packet(source, destination, timestamp);
        if (routerHashMap.contains(packet)) return false;

        if (dq.size() == memoryLimit) forwardPacket();

        dq.addLast(packet);
        routerHashMap.add(packet);
        return true;
    }

    List<Integer> forwardPacket() {
        if (!dq.isEmpty()) {
            Packet packet = dq.pollFirst();
            routerHashMap.remove(packet);
            return Arrays.asList(packet.src, packet.dst, packet.ts);
        }
        return new ArrayList<>();
    }

    int getCount(int destination, int startTime, int endTime) {
        int count = 0;
        for (Packet p : dq) {
            if (p.dst == destination && startTime <= p.ts && p.ts <= endTime) count++;
        }
        return count;
    }
}

// ----------- Optimized Version -------------
class RouterOptimized {
    Deque<Packet> dq;
    Set<Packet> routerHashMap;
    Map<Integer, TreeMap<Integer, Integer>> destinationMap; // multiset simulation
    int memoryLimit;

    RouterOptimized(int limit) {
        dq = new ArrayDeque<>();
        routerHashMap = new HashSet<>();
        destinationMap = new HashMap<>();
        memoryLimit = limit;
    }

    boolean addPacket(int source, int destination, int timestamp) {
        Packet packet = new Packet(source, destination, timestamp);
        if (routerHashMap.contains(packet)) return false;

        if (dq.size() == memoryLimit) forwardPacket();

        dq.addLast(packet);
        routerHashMap.add(packet);

        destinationMap.putIfAbsent(destination, new TreeMap<>());
        TreeMap<Integer, Integer> map = destinationMap.get(destination);
        map.put(timestamp, map.getOrDefault(timestamp, 0) + 1);

        return true;
    }

    List<Integer> forwardPacket() {
        if (!dq.isEmpty()) {
            Packet packet = dq.pollFirst();
            routerHashMap.remove(packet);

            TreeMap<Integer, Integer> map = destinationMap.get(packet.dst);
            map.put(packet.ts, map.get(packet.ts) - 1);
            if (map.get(packet.ts) == 0) map.remove(packet.ts);
            if (map.isEmpty()) destinationMap.remove(packet.dst);

            return Arrays.asList(packet.src, packet.dst, packet.ts);
        }
        return new ArrayList<>();
    }

    int getCount(int destination, int startTime, int endTime) {
        if (!destinationMap.containsKey(destination)) return 0;
        TreeMap<Integer, Integer> map = destinationMap.get(destination);
        int count = 0;
        for (var entry : map.subMap(startTime, true, endTime, true).values()) {
            count += entry;
        }
        return count;
    }
}
