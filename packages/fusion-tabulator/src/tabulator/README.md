# Tabulator

## Ajax加载

### 数据响应

1. 接口： `/api/v1/actions/execute`

示例：

```json
{
  "responseMeta": {
    "status": 200,
    "success": true
  },
  "data": {
    "body": [
      {
        "ID": "13",
        "IDCARD": "410802198909128831",
        "RECORD_TIME": "2023-12-20 00:00:00",
        "TZ": "50.0"
      }
    ],
    "isExecutionSuccess": true,
    "total": 1,
    "page": 1,
    "size": 10,
    "messages": [],
    "request": {
      "requestParams": {
        "Query": {
          "value": "SELECT * FROM DAILY_LOG_WEIGHT WHERE ROWNUM < 10",
          "substitutedParams": {}
        }
      }
    },
    "dataTypes": [
      {
        "dataType": "TABLE"
      },
      {
        "dataType": "JSON"
      },
      {
        "dataType": "RAW"
      }
    ],
    "suggestedWidgets": [
      {
        "type": "SELECT_WIDGET",
        "bindingQuery": "data.map( (obj) =>{ return  {'label': obj.ID, 'value': obj.ID } })"
      },
      {
        "type": "CHART_WIDGET",
        "bindingQuery": "data.map( (obj) =>{ return  {'x': obj.ID, 'y': obj.ID } })"
      },
      {
        "type": "TABLE_WIDGET",
        "bindingQuery": "data"
      },
      {
        "type": "TEXT_WIDGET",
        "bindingQuery": "data"
      }
    ],
    "tableComments": {
      "DAILY_LOG_WEIGHT": [
        {
          "name": "ID",
          "comment": "主键"
        },
        {
          "name": "TZ",
          "comment": "体重"
        },
        {
          "name": "IDCARD",
          "comment": "身份证"
        },
        {
          "name": "RECORD_TIME",
          "comment": "记录时间"
        }
      ]
    },
    "selectFieldNames": ["ID", "IDCARD", "RECORD_TIME", "TZ"]
  }
}
```
