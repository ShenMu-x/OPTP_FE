export enum CodeLangs { 'Python' = 0, 'C++' = 1, 'Java' = 2 }

export const langs = [
    {
        label: 'Python',
        value: 0,
    },
    {
        label: 'C++',
        value: 1,
    },
    {
        label: 'Java',
        value: 2,
    },
];

export const mapTemplate = new Map([
    [
        'Python',
        'class MyClass:\n\tdef func(self, n):\n\t\t"code used python"'
    ],
    [
        "C++",
        '#include<iostream>\nusing namespace std;\n'
    ],
    [
        "Java",
        'class Solution {\n\tpublic int main() {\n\n\n\t\n}}'
    ],
]);
