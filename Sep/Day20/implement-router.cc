#include <bits/stdc++.h>
using namespace std;

struct Packet {
    int src, dst, ts;
    bool operator==(const Packet& other) const {
        return src == other.src && dst == other.dst && ts == other.ts;
    }
};

struct PacketHash {
    size_t operator()(const Packet& p) const {
        return ((p.src * 31 + p.dst) * 31 + p.ts);
    }
};

// ----------- Simple Version -------------
class RouterSimple {
    deque<Packet> dq;
    unordered_set<Packet, PacketHash> routerHashMap;
    int memoryLimit;

public:
    RouterSimple(int limit) : memoryLimit(limit) {}

    bool addPacket(int source, int destination, int timestamp) {
        Packet packet{source, destination, timestamp};
        if (routerHashMap.count(packet)) return false;

        if ((int)dq.size() == memoryLimit) forwardPacket();

        dq.push_back(packet);
        routerHashMap.insert(packet);
        return true;
    }

    vector<int> forwardPacket() {
        if (!dq.empty()) {
            Packet packet = dq.front();
            dq.pop_front();
            routerHashMap.erase(packet);
            return {packet.src, packet.dst, packet.ts};
        }
        return {};
    }

    int getCount(int destination, int startTime, int endTime) {
        int count = 0;
        for (auto& p : dq) {
            if (p.dst == destination && startTime <= p.ts && p.ts <= endTime)
                count++;
        }
        return count;
    }
};

// ----------- Optimized Version -------------
class RouterOptimized {
    deque<Packet> dq;
    unordered_set<Packet, PacketHash> routerHashMap;
    unordered_map<int, multiset<int>> destinationMap;
    int memoryLimit;

public:
    RouterOptimized(int limit) : memoryLimit(limit) {}

    bool addPacket(int source, int destination, int timestamp) {
        Packet packet{source, destination, timestamp};
        if (routerHashMap.count(packet)) return false;

        if ((int)dq.size() == memoryLimit) forwardPacket();

        dq.push_back(packet);
        routerHashMap.insert(packet);
        destinationMap[destination].insert(timestamp);
        return true;
    }

    vector<int> forwardPacket() {
        if (!dq.empty()) {
            Packet packet = dq.front();
            dq.pop_front();
            routerHashMap.erase(packet);

            destinationMap[packet.dst].erase(destinationMap[packet.dst].find(packet.ts));
            if (destinationMap[packet.dst].empty())
                destinationMap.erase(packet.dst);

            return {packet.src, packet.dst, packet.ts};
        }
        return {};
    }

    int getCount(int destination, int startTime, int endTime) {
        if (!destinationMap.count(destination)) return 0;

        auto& timestamps = destinationMap[destination];
        auto left = timestamps.lower_bound(startTime);
        auto right = timestamps.upper_bound(endTime);
        return distance(left, right);
    }
};
