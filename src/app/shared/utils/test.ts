import { STColumnBadge } from "@delon/abc/st";


export function handleData(fetchList: { code: any; msg: any; data?: never[] | undefined; }) {
    const { code, msg, data = [] } = fetchList;
    Array.isArray(data) && data.map((item) => {
        console.log(item)
    })
}


// 一旦当我们写到超过两个if...else的函数的时候就该想想是否有更好的优化方法。
export function getStatusMap(id: any) {

    // if (id === 0) {
    //   return { text: '关闭', color: 'default' };
    // } else if (id === 1) {
    //   return { text: '成功', color: 'success' };
    // }
    const status: STColumnBadge = {
        0: { text: '关闭', color: 'default' },
        1: { text: '成功', color: 'success' },
        2: { text: '错误', color: 'error' },
        3: { text: '进行中', color: 'processing' },
        4: { text: '默认', color: 'default' },
        5: { text: '警告', color: 'warning' }
    };
    return status[id];
}


// 排除数组中最后一个元素
const initial = (arr: string | any[]) => arr.slice(0, -1);

// B转换到KB,MB,GB并保留两位小数
export function formatFileSize(fileSize: number) {
    let temp;
    if (fileSize < 1024) {
        return `${fileSize  }B`;
    } else if (fileSize < (1024 * 1024)) {
        temp = fileSize / 1024;
        temp = temp.toFixed(2);
        return `${temp  }KB`;
    } else if (fileSize < (1024 * 1024 * 1024)) {
        temp = fileSize / (1024 * 1024);
        temp = temp.toFixed(2);
        return `${temp  }MB`;
    } else {
        temp = fileSize / (1024 * 1024 * 1024);
        temp = temp.toFixed(2);
        return `${temp  }GB`;
    }
}

// 递归生成树形结构
export function getTreeData(data: any[], pid: any, pidName = 'parentId', idName = 'id', childrenName = 'children', key?: any) {
    let arr = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i][pidName] == pid) {
            data[i].key = data[i][idName];
            data[i][childrenName] = getTreeData(data, data[i][idName], pidName, idName, childrenName);
            arr.push(data[i]);
        }
    }

    return arr;

}

// 遍历树节点
export function foreachTree(data: string | any[], childrenName = 'children', callback: (arg: any) => void) {
    for (let i = 0; i < data.length; i++) {
        callback(data[i]);
        if (data[i][childrenName] && data[i][childrenName].length > 0) {
            foreachTree(data[i][childrenName], childrenName, callback);
        }
    }
}


export function leDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
    var oldValue = descriptor.value;

    descriptor.value = function() {
      console.log(`Calling "${propertyKey}" with`, arguments,target);
      let value = oldValue.apply(null, [arguments[1], arguments[0]]);

      console.log(`Function is executed`);
      return `${value  }; This is awesome`;
    };

    return descriptor;
  }

  export function realName(target:any, key: string): any {
    // property value
    var _val = target[key];

    // property getter
    var getter = function () {
      return `Ragularuban(${  _val  })`;
    };

    // property setter
    var setter = function (newVal:any) {
      _val = newVal;
    };

    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter
    });
  }
