export const mockSolutions = {
    "s1": {
        id: "s1",
        problemTitle: "Two Sum",
        problemId: "p1",
        author: {
            name: "classroom:mocks.students.kiet",
            avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=tuankiet",
            initials: "TK",
            level: 15,
            reputation: 1540,
        },
        language: "JavaScript",
        approach: "Hash Map",
        likes: 245,
        forks: 56,
        views: 1200,
        comments: 12,
        description: "solutions:twoSumOptimized.description",
        code: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        tags: ["Array", "Hash Table", "Top Interview 150"],
        postedAt: "solutions:twoSumOptimized.timeLabel"
    }
};
