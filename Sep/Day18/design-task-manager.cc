#include <bits/stdc++.h>
using namespace std;

class TaskManager {
    unordered_map<int, pair<int,int>> taskMap; // taskId -> (priority, userId)
    priority_queue<pair<pair<int,int>, int>> globalHeap; 
    // stores { {priority, taskId}, taskId } with negative for max-heap effect

public:
    TaskManager(vector<vector<int>>& tasks) {
        for (auto &t : tasks) {
            add(t[0], t[1], t[2]);
        }
    }

    void add(int userId, int taskId, int priority) {
        taskMap[taskId] = {priority, userId};
        globalHeap.push({{priority, taskId}, taskId});
    }

    void edit(int taskId, int newPriority) {
        if (taskMap.find(taskId) != taskMap.end()) {
            int userId = taskMap[taskId].second;
            taskMap[taskId] = {newPriority, userId};
            globalHeap.push({{newPriority, taskId}, taskId});
        }
    }

    void rmv(int taskId) {
        taskMap.erase(taskId);
    }

    int execTop() {
        while (!globalHeap.empty()) {
            auto top = globalHeap.top(); globalHeap.pop();
            int priority = top.first.first;
            int taskId = top.first.second;
            if (taskMap.count(taskId) && taskMap[taskId].first == priority) {
                int userId = taskMap[taskId].second;
                rmv(taskId);
                return userId;
            }
        }
        return -1;
    }
};
