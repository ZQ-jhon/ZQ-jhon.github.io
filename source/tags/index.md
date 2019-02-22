---
title: Note
date: 2018-08-19 09:01:21
tag: [about]
reward: false
comment: false
share: true
---
<h3>Compare Version</h3>
```javascript
/**
 * view it online : https://codepen.io/zq-jhon/pen/oPXorj
 */
type Vers = {
    // 主版本，副版本，小版本号
    main: number;
    minor: number;
    beta: string;
}

class Version {
    constructor(v1: string, v2: string) {
        const result = this.compareVersion(
            this.flatVersion(v1),
            this.flatVersion(v2)
        )
    }
    public flatVersion(v: string): Vers {
        const verArr = v.split('.'); // eg: ['1','2','3a']
        let vs = {
            main: + verArr[0],
            minor: + verArr[1],
            beta: verArr[2],
        }
        return vs;
    }
    /**
     *  
     * @param v1 compare parama1
     * @param v2 compare parama2
     * 
     * @returns  result = 1 , v1 > v2; 
     *           result = 0 , v1 = v2; 
     *           result = -1 , v1 < v2;
     */
    public compareVersion(v1: Vers, v2: Vers): number {
        if (v1.main === v2.main && v1.minor === v2.minor && v1.beta === v2.beta) { return 0; }


        // 判断首位
        let result = v1.main > v2.main ? 1 :  -1;

        if(v1.main === v2.main) {
            // ...如果首位相等，判断第二位
           result =  v1.minor > v2.minor ? 1 : -1;

           if(v1.minor === v2.minor) {
               // ... ... 如果第二位相等，判断第三位
               result = v1.beta > v2.beta ? 1 : -1; 
           }
        }

        return result;
    }
}

// 实例出一个 Version 对象，填入两个比较的参数，进行比较，控制台看结果。
const v1 = '1.2.4b', v2 = '1.2.3a';
new Version(v1, v2);

```