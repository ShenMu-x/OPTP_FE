export enum CodeLangs { 'python' = 0, 'c++' = 1, 'java' = 2 }
export const langs: Array<{ label: string, value: number }> = [];
const init = () => {
    for (let key in CodeLangs) {
        if (typeof CodeLangs[key] === 'number')
            langs.push({ label: key, value: CodeLangs[key] as unknown as number })
    }
}
init();

export const mapTemplate = new Map([
    [
        'python',
        'print(\"hello world\")'
    ],
    [
        "c++",
        `
#include <iostream>
using namespace std;
    
int main ()
{ 
    cout << "Hello world." << endl;
    return 0;
}
        `
    ],
    [
        "java",
        `// Solution
public class Solution {
public static void main(String args[]) {
}
}
        `
    ],
]);
