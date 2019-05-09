### 690. Employee Importance

> 给定公司员工的所有信息，根据给的id寻找全部下属的importance之和。

    Input: [[1, 5, [2, 3]], [2, 3, []], [3, 3, []]], 1
    Output: 11
    Explanation:
    Employee 1 has importance value 5, and he has two direct subordinates: employee 2 and employee 3. They both have importance value 3. So the total importance value of employee 1 is 5 + 3 + 3 = 11.

使用dfs。

solution [690. Employee Importance](../../leetcode/tree/690_employee_importance.java)