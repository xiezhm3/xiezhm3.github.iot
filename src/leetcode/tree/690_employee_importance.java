// 690. Employee Importance
/*
// Employee info
class Employee {
    // It's the unique id of each node;
    // unique id of this employee
    public int id;
    // the importance value of this employee
    public int importance;
    // the id of direct subordinates
    public List<Integer> subordinates;
};
*/
class Solution {
    // HashMap<Integer, Employee> emp;
    public int getImportance(List<Employee> employees, int id) {
        // emp = new HashMap();
        // for(Employee em: employees) {
        // emp.put(em.id, em);
        // }
        // return dfs(id);
        int total = 0;
        HashMap<Integer, Employee> empMap = new HashMap();
        for (Employee employee : employees) {
            empMap.put(employee.id, employee);
        }
        Queue<Employee> queue = new LinkedList<Employee>();
        queue.offer(empMap.get(id));
        while (!queue.isEmpty()) {
            Employee current = queue.poll();
            total += current.importance;
            for (Integer subId : current.subordinates) {
                queue.offer(empMap.get(subId));
            }
        }
        return total;
    }

    // public int dfs(int id) {
    // Employee employee = emp.get(id);
    // int ans = employee.importance;
    // for (Integer subId : employee.subordinates) {
    // ans += dfs(subId); // beautiful!
    // }
    // return ans;
    // }
}