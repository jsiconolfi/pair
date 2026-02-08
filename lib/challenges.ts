// lib/challenges.ts

import { Challenge } from '@/types';

export const challenges: Challenge[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 2,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers that add up to \`target\`.

You may assume that each input has exactly one solution, and you may not use the same element twice.

**Example:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] == 9, so return [0, 1]
\`\`\``,
    learningObjectives: [
      'Understanding hash maps for O(1) lookup',
      'Analyzing time vs. space complexity tradeoffs',
      'Recognizing complement patterns',
    ],
    concepts: [
      { id: 'hash-maps', name: 'Hash Maps', category: 'fundamentals' },
      { id: 'time-complexity', name: 'Time Complexity', category: 'fundamentals' },
    ],
    prerequisites: [],
    starterCode: {
      typescript: `function twoSum(nums: number[], target: number): number[] {
  // Your code here
  
}`,
    },
  },

  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 1,
    description: `Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets are closed by the same type of brackets
2. Open brackets are closed in the correct order

**Example:**
\`\`\`
Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false
\`\`\``,
    learningObjectives: [
      'Understanding stack data structure',
      'Recognizing LIFO patterns',
      'Using objects for character mappings',
    ],
    concepts: [
      { id: 'stacks', name: 'Stacks', category: 'fundamentals' },
      { id: 'data-structures', name: 'Data Structures', category: 'fundamentals' },
    ],
    prerequisites: [],
    starterCode: {
      typescript: `function isValid(s: string): boolean {
  // Your code here
  
}`,
    },
  },

  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 2,
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

**Example:**
\`\`\`
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
\`\`\``,
    learningObjectives: [
      'Understanding pointer manipulation',
      'Iterative vs recursive approaches',
      'Linked list traversal patterns',
    ],
    concepts: [
      { id: 'linked-lists', name: 'Linked Lists', category: 'fundamentals' },
      { id: 'pointers', name: 'Pointers', category: 'fundamentals' },
    ],
    prerequisites: [],
    starterCode: {
      typescript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  // Your code here
  
}`,
    },
  },

  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 2,
    description: `Given a sorted array of integers \`nums\` and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

**Example:**
\`\`\`
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
\`\`\``,
    learningObjectives: [
      'Understanding divide-and-conquer strategy',
      'Recognizing O(log n) complexity',
      'Handling mid-point calculations and edge cases',
    ],
    concepts: [
      { id: 'binary-search', name: 'Binary Search', category: 'algorithms' },
      { id: 'divide-conquer', name: 'Divide & Conquer', category: 'algorithms' },
    ],
    prerequisites: [
      { id: 'arrays', name: 'Arrays', category: 'fundamentals' },
    ],
    starterCode: {
      typescript: `function search(nums: number[], target: number): number {
  // Your code here
  
}`,
    },
  },

  {
    id: 'fizzbuzz',
    title: 'FizzBuzz',
    difficulty: 1,
    description: `Write a program that returns an array of strings from 1 to n where:
- For multiples of 3, use "Fizz" instead of the number
- For multiples of 5, use "Buzz" instead of the number
- For multiples of both 3 and 5, use "FizzBuzz"

**Example:**
\`\`\`
Input: n = 15
Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
\`\`\``,
    learningObjectives: [
      'Understanding modulo operations',
      'Conditional logic ordering',
      'String vs number handling',
    ],
    concepts: [
      { id: 'conditionals', name: 'Conditionals', category: 'fundamentals' },
      { id: 'modulo', name: 'Modulo Operations', category: 'fundamentals' },
    ],
    prerequisites: [],
    starterCode: {
      typescript: `function fizzBuzz(n: number): string[] {
  // Your code here
  
}`,
    },
  },
];

export function getChallengeById(id: string): Challenge | undefined {
  return challenges.find(c => c.id === id);
}