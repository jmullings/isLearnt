# isLearnt
Record every instance a string is used.

# Usage:


```javascript
var isLearnt = require('isLearnt');
```

```
var url = 'mongodb://localhost:27017/isLearnt';
isLearnt(url, 'anyString', (result)=>{
    console.log(result)
});
```

## Overview

All instances of the string are compiled into binary timestamps.
